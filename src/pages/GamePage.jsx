import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Modal from '../components/Modal';
import { useGame } from '../hooks/useGame';
import { useTimer } from '../hooks/useTimer';
import { resetGame, finishGame } from '../store/gameSlice'; // Імпортуємо finishGame

/**
 * Головна сторінка ігрового процесу.
 * Відповідає за відображення ігрового поля, управління таймером, взаємодію з глобальним станом (Redux)
 * та виклик модального вікна при завершенні гри.
 *
 * @component
 * @returns {JSX.Element} Сторінка з ігровим полем, статистикою (таймер, ходи) та логікою гри.
 */
const GamePage = () => {
    const { username, difficulty } = useSelector((state) => state.game);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const settings = { username, difficulty };

    const { 
        cards, flippedCards, matchedCards, handleCardClick, 
        isGameFinished, moves, restartGame, isLoading, error 
    } = useGame(settings);

    const { seconds, startTimer, stopTimer, resetTimer, formatTime } = useTimer();

    useEffect(() => {
        if (!username) {
            navigate('/');
        }
    }, [username, navigate]);

    useEffect(() => {
        if (!isLoading && !error && username) {
            startTimer();
        }
        return () => stopTimer();
    }, [isLoading, error, username]);

    // Коли гра завершилась - зупиняємо таймер і зберігаємо результат
    useEffect(() => {
        if (isGameFinished) {
            stopTimer();
            dispatch(finishGame({ 
                time: seconds, 
                moves: moves 
            }));
        }
    }, [isGameFinished]);

    /**
     * Перезапускає гру та скидає таймер.
     */
    const handleRestart = () => {
        restartGame();
        resetTimer();
    };

    /**
     * Скидає поточний стан гри та повертає користувача на головне меню.
     */
    const handleBackToMenu = () => {
        dispatch(resetGame());
        navigate('/');
    };

    return (
        <div className="page game-page">
            <div className="header">
                <button onClick={handleBackToMenu} className="btn-small">⬅ Меню</button>
                <div className="stats-box">
                    <div>Гравець: <b>{username}</b></div>
                    <div className="stats-row">
                        <span>⏳ {formatTime()}</span>
                        <span>👣 {moves}</span>
                    </div>
                </div>
                <button onClick={handleRestart} className="btn-small">🔄</button>
            </div>

            {isLoading ? (
                <div className="loader">Завантаження персонажів... 🚀</div>
            ) : error ? (
                <div className="error-msg">Помилка: {error}</div>
            ) : (
                <div className={`grid difficulty-${difficulty}`}>
                    {cards.map((card) => (
                        <Card
                            key={card.id}
                            item={card}
                            isFlipped={flippedCards.includes(card.id) || matchedCards.includes(card.id)}
                            isMatched={matchedCards.includes(card.id)}
                            onClick={() => handleCardClick(card.id)}
                        />
                    ))}
                </div>
            )}

            <Modal isOpen={isGameFinished}>
                <h2>🎉 Перемога! 🎉</h2>
                <p>Чудова робота, <b>{username}</b>!</p>
                <div className="results-summary">
                    <p>Час: <b>{formatTime()}</b></p>
                    <p>Ходів: <b>{moves}</b></p>
                </div>
                <div className="modal-buttons">
                    <button onClick={handleRestart} className="btn-primary">Ще раз</button>
                    <button onClick={handleBackToMenu} className="btn-secondary">Вийти</button>
                </div>
            </Modal>
        </div>
    );
};

export default GamePage;
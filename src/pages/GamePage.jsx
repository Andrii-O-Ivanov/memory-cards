import React, { useEffect } from 'react';
import Card from '../components/Card';
import Modal from '../components/Modal';
import { useGame } from '../hooks/useGame';
import { useTimer } from '../hooks/useTimer';

const GamePage = ({ settings, onBack }) => {
    const { 
        cards, flippedCards, matchedCards, handleCardClick, 
        isGameFinished, moves, restartGame, isLoading, error 
    } = useGame(settings);

    const { seconds, startTimer, stopTimer, resetTimer, formatTime } = useTimer();

    useEffect(() => {
        if (!isLoading && !error) {
            startTimer();
        }
        return () => stopTimer();
    }, [isLoading, error]); 

    useEffect(() => {
        if (isGameFinished) stopTimer();
    }, [isGameFinished]);

    const handleRestart = () => {
        restartGame();
        resetTimer();
    };

    return (
        <div className="page game-page">
            <div className="header">
                <button onClick={onBack} className="btn-small">⬅ Меню</button>
                <div className="stats-box">
                    <div>Гравець: <b>{settings.username}</b></div>
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
                <div className={`grid difficulty-${settings.difficulty}`}>
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
                <p>Чудова робота, <b>{settings.username}</b>!</p>
                <div className="results-summary">
                    <p>Час: <b>{formatTime()}</b></p>
                    <p>Ходів: <b>{moves}</b></p>
                </div>
                <div className="modal-buttons">
                    <button onClick={handleRestart} className="btn-primary">Ще раз</button>
                    <button onClick={onBack} className="btn-secondary">Вийти</button>
                </div>
            </Modal>
        </div>
    );
};

export default GamePage;
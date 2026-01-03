import React, { useEffect } from 'react';
import Card from '../components/Card';
import { useGame } from '../hooks/useGame'; 
            <h1>Memory Cards</h1>
const GamePage = ({ onFinish }) => {
    const { 
        cards, 
        flippedCards, 
        matchedCards, 
        handleCardClick, 
        isGameFinished, 
        moves,
        restartGame 
    } = useGame();

    useEffect(() => {
        if (isGameFinished) {
            setTimeout(() => onFinish(moves), 1000);
        }
    }, [isGameFinished, onFinish, moves]);

    return (
        <div className="page">
            <div className="game-info">
                <span>Ходів: {moves}</span>
                <button onClick={restartGame} className="restart-btn">🔄</button>
            </div>
            
            <div className="grid">
                {cards.map((card) => (
                    <Card 
                        key={card.id} 
                        item={card}
                        isFlipped={flippedCards.includes(card.id)}
                        isMatched={matchedCards.includes(card.id)}
                        onClick={() => handleCardClick(card.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default GamePage;
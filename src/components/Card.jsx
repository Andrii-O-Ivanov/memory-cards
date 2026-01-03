import React from 'react';
import '../index.css';

const Card = ({ item, isFlipped, isMatched, onClick }) => {
    
    // Показуємо картинку, якщо картка перевернута АБО вже знайдена
    const showContent = isFlipped || isMatched;

    return (
        <div 
            className={`card ${isFlipped ? 'flipped' : ''} ${isMatched ? 'matched' : ''}`}
            onClick={onClick}
        >
            <div className="card-content">
                {/* Якщо showContent true - показуємо картинку, інакше - знак питання */}
                {showContent ? item.emoji : '?'}
            </div>
        </div>
    );
};

export default Card;
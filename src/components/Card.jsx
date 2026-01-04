import React from 'react';

const Card = ({ item, isFlipped, isMatched, onClick }) => {
    return (
        <div 
            className={`card ${isFlipped ? 'flipped' : ''} ${isMatched ? 'matched' : ''}`}
            onClick={onClick}
        >
            <div className="card-inner">
                <div className="card-front">?</div>
                <div className="card-back">
                    <img src={item.content} alt={item.name} />
                </div>
            </div>
        </div>
    );
};
 
export default Card;
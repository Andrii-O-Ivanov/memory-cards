import React from 'react';

const StartPage = ({ onStart }) => {
    return (
        <div className="page">
            <h1>Memory Cards</h1>
            <p>Знайди всі пари карток!</p>
            <button onClick={onStart}>
                Почати гру
            </button>
        </div>
    );
};

export default StartPage;
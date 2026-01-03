import React from 'react';

const ResultsPage = ({ onRestart }) => {
    return (
        <div className="page">
            <h2>Вітаємо!</h2>
            <p>Ти знайшов усі пари!</p>
            <button onClick={onRestart}>Спробувати ще</button>
        </div>
    );
};

export default ResultsPage;
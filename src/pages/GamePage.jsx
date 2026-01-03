import React from 'react';
import Card from '../components/Card';

const GamePage = ({ onFinish }) => {
    // Просто масив із 12 цифр, щоб намалювати сітку карток (заглушка)
    const cards = Array.from({ length: 12 }, (_, i) => i);

    return (
        <div className="page">
            <div className="grid">
                {cards.map((item) => (
                    <Card key={item} />
                ))}
            </div>
            <button onClick={onFinish} style={{ marginTop: '20px' }}>
                Завершити гру (Тест)
            </button>
        </div>
    );
};

export default GamePage;
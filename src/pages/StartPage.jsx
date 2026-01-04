import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setGameSettings } from '../store/gameSlice';

const StartPage = () => {
    const [username, setUsername] = useState('');
    const [difficulty, setDifficulty] = useState('12');
    const [error, setError] = useState('');
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!username.trim()) {
            setError("Введіть ім'я, будь ласка!");
            return;
        }

        if (username.length < 3) {
            setError("Ім'я має бути не менше 3 літер");
            return;
        }

        dispatch(setGameSettings({ username, difficulty }));
        navigate('/game');
    };

    return (
        <div className="page">
            <h1>🧠 Memory Game</h1>
            <p className="subtitle">Тренуй свою пам'ять!</p>

            <form onSubmit={handleSubmit} className="settings-form">
                <div className="form-group">
                    <label>Ім'я гравця:</label>
                    <input 
                        type="text" 
                        placeholder="Ваше ім'я..." 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    {error && <span className="error">{error}</span>}
                </div>

                <div className="form-group">
                    <label>Рівень складності:</label>
                    <select 
                        value={difficulty} 
                        onChange={(e) => setDifficulty(e.target.value)}
                    >
                        <option value="6">Новачок (12 карток)</option>
                        <option value="8">Аматор (16 карток)</option>
                        <option value="12">Профі (24 картки)</option>
                    </select>
                </div>

                <button type="submit" className="btn-primary">Почати гру 🚀</button>
                
                {/* Кнопка переходу на рекорди */}
                <button 
                    type="button" 
                    className="btn-secondary" 
                    style={{ marginTop: '10px' }}
                    onClick={() => navigate('/leaderboard')}
                >
                    🏆 Таблиця Рекордів
                </button>
            </form>
        </div>
    );
};

export default StartPage;
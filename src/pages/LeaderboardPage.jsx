import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearLeaderboard } from '../store/gameSlice';

const LeaderboardPage = () => {
    const leaderboard = useSelector((state) => state.game.leaderboard);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getDifficultyLabel = (diff) => {
        const val = String(diff);
        
        switch (val) {
            case '6': return 'Новачок (6 пар)';
            case '8': return 'Аматор (8 пар)';
            case '12': return 'Профі (12 пар)';
            default: return `${val} пар`;
        }
    };

    const handleClear = () => {
        if (window.confirm('Ви впевнені, що хочете видалити всю історію?')) {
            dispatch(clearLeaderboard());
        }
    };

    return (
        <div className="page">
            <h1>🏆 Зала Слави</h1>
            <p className="subtitle">Топ-10 найкращих ігор</p>

            {leaderboard.length === 0 ? (
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <p>Список порожній.</p>
                </div>
            ) : (
                <>
                    <table className="leaderboard-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Гравець</th>
                                <th>Складність</th> 
                                <th>Час</th>
                                <th>Ходи</th>
                                <th>Дата</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaderboard.map((record, index) => (
                                <tr key={record.id}>
                                    <td>{index + 1}</td>
                                    <td><b>{record.username}</b></td>
                                    
                                    <td>{getDifficultyLabel(record.difficulty)}</td>
                                    
                                    <td>{record.time} сек</td>
                                    <td>{record.moves}</td>
                                    <td>{record.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    <button 
                        onClick={handleClear} 
                        className="btn-small"
                        style={{ 
                            marginTop: '20px', 
                            background: '#ff5252', 
                            color: 'white' 
                        }}
                    >
                        🗑️ Очистити історію
                    </button>
                </>
            )}

            <button 
                onClick={() => navigate('/')} 
                className="btn-primary" 
                style={{ marginTop: '20px', maxWidth: '200px' }}
            >
                ⬅ На Головну
            </button>
        </div>
    );
};

export default LeaderboardPage;
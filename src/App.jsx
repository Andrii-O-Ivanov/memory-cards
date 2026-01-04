import React from 'react';
import { Routes, Route } from 'react-router-dom';
import StartPage from './pages/StartPage';
import GamePage from './pages/GamePage';
import LeaderboardPage from './pages/LeaderboardPage'; // Імпорт

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} /> {/* Маршрут */}
      </Routes>
    </div>
  );
}

export default App;
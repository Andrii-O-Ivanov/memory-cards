import { useState } from 'react';
import StartPage from './pages/StartPage';
import GamePage from './pages/GamePage';
import ResultsPage from './pages/ResultsPage';
import './index.css';

function App() {
  // Стан, який знає, яку сторінку показувати: 'start', 'game', або 'results'
  const [page, setPage] = useState('start');

  return (
    <div className="app">
      {page === 'start' && (
        <StartPage onStart={() => setPage('game')} />
      )}

      {page === 'game' && (
        <GamePage onFinish={() => setPage('results')} />
      )}

      {page === 'results' && (
        <ResultsPage onRestart={() => setPage('start')} />
      )}
    </div>
  );
}

export default App;
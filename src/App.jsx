import { useState } from 'react';
import StartPage from './pages/StartPage';
import GamePage from './pages/GamePage';
import './index.css';

function App() {
  const [gameSettings, setGameSettings] = useState(null);

  return (
    <div className="app">
      {!gameSettings ? (
        <StartPage onStart={(data) => setGameSettings(data)} />
      ) : (
        <GamePage 
            settings={gameSettings} 
            onBack={() => setGameSettings(null)} 
        />
      )}
    </div>
  );
}

export default App;
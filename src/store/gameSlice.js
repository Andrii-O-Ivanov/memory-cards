import { createSlice } from '@reduxjs/toolkit';

// Завантаження історії рекордів із пам'яті браузера
const loadLeaderboard = () => {
    try {
        const saved = localStorage.getItem('memory-game-leaderboard');
        return saved ? JSON.parse(saved) : [];
    } catch (e) {
        console.error("Помилка завантаження рекордів:", e);
        return [];
    }
};

const initialState = {
  username: '',
  difficulty: '12',
  gameStatus: 'idle',
  score: {
    time: 0,
    moves: 0
  },
  leaderboard: loadLeaderboard()
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGameSettings: (state, action) => {
      state.username = action.payload.username;
      state.difficulty = action.payload.difficulty;
      state.gameStatus = 'playing';
    },
    
    finishGame: (state, action) => {
      state.gameStatus = 'finished';
      state.score = action.payload;

      const newRecord = {
        id: Date.now(),
        username: state.username,
        difficulty: state.difficulty,
        time: action.payload.time,
        moves: action.payload.moves,
        date: new Date().toLocaleDateString()
      };

      state.leaderboard.push(newRecord);

      // Сортування: Складність (за спаданням) -> Час (за зростанням) -> Ходи
      state.leaderboard.sort((a, b) => {
          const diffA = Number(a.difficulty);
          const diffB = Number(b.difficulty);
          
          if (diffA !== diffB) return diffB - diffA;
          if (a.time !== b.time) return a.time - b.time;
          return a.moves - b.moves;
      });

      // Зберігаємо лише топ-10 результатів
      if (state.leaderboard.length > 10) {
          state.leaderboard = state.leaderboard.slice(0, 10);
      }

      localStorage.setItem('memory-game-leaderboard', JSON.stringify(state.leaderboard));
    },

    resetGame: (state) => {
      state.gameStatus = 'idle';
      state.score = { time: 0, moves: 0 };
    },

    clearLeaderboard: (state) => {
      state.leaderboard = [];
      localStorage.removeItem('memory-game-leaderboard');
    }
  }
});

export const { setGameSettings, finishGame, resetGame, clearLeaderboard } = gameSlice.actions;
export default gameSlice.reducer;
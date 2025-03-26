import { configureStore } from '@reduxjs/toolkit';
import playerReducer from './playerSlice';
import gameReducer from './gameSlice';
import questReducer from './questSlice';

export const store = configureStore({
  reducer: {
    player: playerReducer,
    game: gameReducer,
    quests: questReducer,
  },
}); 
import { createSlice } from '@reduxjs/toolkit';

// Generate random price fluctuations
const generatePrices = () => {
  return {
    manhattan: {
      weed: Math.floor(Math.random() * 30) + 50,
      cocaine: Math.floor(Math.random() * 100) + 200,
      heroin: Math.floor(Math.random() * 150) + 300,
      meth: Math.floor(Math.random() * 80) + 120,
      ecstasy: Math.floor(Math.random() * 50) + 80
    },
    brooklyn: {
      weed: Math.floor(Math.random() * 30) + 40,
      cocaine: Math.floor(Math.random() * 100) + 180,
      heroin: Math.floor(Math.random() * 150) + 250,
      meth: Math.floor(Math.random() * 80) + 100,
      ecstasy: Math.floor(Math.random() * 50) + 70
    },
    queens: {
      weed: Math.floor(Math.random() * 30) + 45,
      cocaine: Math.floor(Math.random() * 100) + 190,
      heroin: Math.floor(Math.random() * 150) + 270,
      meth: Math.floor(Math.random() * 80) + 110,
      ecstasy: Math.floor(Math.random() * 50) + 75
    },
    bronx: {
      weed: Math.floor(Math.random() * 30) + 35,
      cocaine: Math.floor(Math.random() * 100) + 170,
      heroin: Math.floor(Math.random() * 150) + 240,
      meth: Math.floor(Math.random() * 80) + 90,
      ecstasy: Math.floor(Math.random() * 50) + 65
    },
    statenIsland: {
      weed: Math.floor(Math.random() * 30) + 55,
      cocaine: Math.floor(Math.random() * 100) + 210,
      heroin: Math.floor(Math.random() * 150) + 320,
      meth: Math.floor(Math.random() * 80) + 130,
      ecstasy: Math.floor(Math.random() * 50) + 85
    }
  };
};

const initialState = {
  day: 1,
  prices: generatePrices(),
  lastMessage: '',
  messageHistory: [],
  locations: [
    'manhattan',
    'brooklyn',
    'queens',
    'bronx',
    'statenIsland'
  ],
  gameStarted: false,
  gameOver: false
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    nextDay: (state) => {
      state.day += 1;
      state.prices = generatePrices();
    },
    addMessage: (state, action) => {
      state.lastMessage = action.payload;
      state.messageHistory.push({
        day: state.day,
        message: action.payload
      });
      
      // Keep only the last 20 messages
      if (state.messageHistory.length > 20) {
        state.messageHistory.shift();
      }
    },
    startGame: (state) => {
      state.gameStarted = true;
    },
    endGame: (state) => {
      state.gameOver = true;
    },
    resetGame: (state) => {
      // Only reset the gameStarted flag, don't reset the entire state
      state.gameStarted = false;
    },
    resetFullGame: () => initialState,
    loadGameState: (state, action) => {
      return { ...action.payload };
    }
  }
});

export const { 
  nextDay, 
  addMessage, 
  startGame, 
  endGame, 
  resetGame,
  resetFullGame,
  loadGameState
} = gameSlice.actions;

export default gameSlice.reducer; 
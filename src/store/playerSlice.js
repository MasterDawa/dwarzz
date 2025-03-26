import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  money: 1000,
  health: 100,
  inventory: {
    weed: 0,
    cocaine: 0,
    heroin: 0,
    meth: 0,
    ecstasy: 0
  },
  level: 0,
  reputation: 0,
  currentLocation: 'manhattan',
  passiveIncome: 0,
  btc: 0,
  assets: {
    weedFarm: false,
    cocaineLab: false,
    nightclub: false,
    bitcoinMine: false
  },
  combat: {
    attack: 10,
    defense: 5,
    weapons: []
  }
};

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    updateMoney: (state, action) => {
      state.money += action.payload;
    },
    updateHealth: (state, action) => {
      state.health = Math.max(0, Math.min(100, state.health + action.payload));
    },
    updateInventory: (state, action) => {
      const { drug, amount } = action.payload;
      state.inventory[drug] += amount;
    },
    updateLocation: (state, action) => {
      state.currentLocation = action.payload;
    },
    levelUp: (state) => {
      state.level += 1;
      state.combat.attack += 2;
      state.combat.defense += 1;
    },
    updateReputation: (state, action) => {
      state.reputation += action.payload;
    },
    updatePassiveIncome: (state, action) => {
      state.passiveIncome += action.payload;
    },
    updateBTC: (state, action) => {
      state.btc += action.payload;
    },
    addAsset: (state, action) => {
      state.assets[action.payload] = true;
    },
    addWeapon: (state, action) => {
      state.combat.weapons.push(action.payload);
    },
    resetPlayer: () => initialState,
    loadPlayerState: (state, action) => {
      return { ...action.payload };
    }
  }
});

export const { 
  updateMoney, 
  updateHealth, 
  updateInventory, 
  updateLocation, 
  levelUp, 
  updateReputation,
  updatePassiveIncome,
  updateBTC,
  addAsset,
  addWeapon,
  resetPlayer,
  loadPlayerState
} = playerSlice.actions;

export default playerSlice.reducer; 
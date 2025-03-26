// Save game state to localStorage
export const saveGameState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('drugWarsGameState', serializedState);
    console.log('Game saved successfully');
    return true;
  } catch (error) {
    console.error('Failed to save game:', error);
    return false;
  }
};

// Load game state from localStorage
export const loadGameState = () => {
  try {
    const serializedState = localStorage.getItem('drugWarsGameState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error('Failed to load saved game:', error);
    return undefined;
  }
};

// Auto-save function that can be called after important actions
export const autoSaveGame = (state) => {
  return saveGameState(state);
};

// Clear saved game from localStorage
export const clearSavedGame = () => {
  try {
    localStorage.removeItem('drugWarsGameState');
    console.log('Saved game cleared');
    return true;
  } catch (error) {
    console.error('Failed to clear saved game:', error);
    return false;
  }
}; 
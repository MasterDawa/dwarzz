import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

// Components
import GameContainer from './components/GameContainer';
import StartScreen from './components/StartScreen';
import AdBanner from './components/AdBanner';

// Utils
import { loadGameState } from './utils/localStorage';
import { loadPlayerState, resetPlayer } from './store/playerSlice';
import { loadGameState as loadGameStateAction, startGame, resetFullGame } from './store/gameSlice';
import { loadQuestState, resetQuests } from './store/questSlice';

const AppContainer = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 0.8rem;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const GameTitle = styled.h1`
  color: var(--color-primary);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  margin-bottom: 1rem;
  display: ${props => props.visible ? 'block' : 'none'};
  font-size: 2.5rem;
`;

const App = () => {
  const dispatch = useDispatch();
  const gameStarted = useSelector(state => state.game.gameStarted);
  const gameOver = useSelector(state => state.game.gameOver);

  // Check if there's a saved game
  const hasSavedGame = loadGameState() !== undefined;

  // Load saved game on startup
  useEffect(() => {
    const savedState = loadGameState();
    if (savedState) {
      dispatch(loadPlayerState(savedState.player));
      dispatch(loadGameStateAction(savedState.game));
      dispatch(loadQuestState(savedState.quests));
    }
  }, [dispatch]);

  const handleStartGame = (continueGame = false) => {
    if (!continueGame) {
      // Reset the game state completely for a new game
      dispatch(resetFullGame());
      dispatch(resetPlayer());
      dispatch(resetQuests());
    }
    dispatch(startGame());
  };

  return (
    <AppContainer>
      <AdBanner position="left" />
      
      <MainContent>
        <GameTitle visible={!gameStarted}>Hustle City</GameTitle>
        
        {!gameStarted && !gameOver && (
          <StartScreen 
            onStartGame={() => handleStartGame(false)} 
            onContinueGame={() => handleStartGame(true)}
            hasSavedGame={hasSavedGame}
          />
        )}
        
        {gameStarted && !gameOver && (
          <GameContainer />
        )}
        
        {gameOver && (
          <div className="card">
            <h2>Game Over</h2>
            <p>Your drug empire has come to an end.</p>
            <button onClick={() => window.location.reload()}>Play Again</button>
          </div>
        )}
      </MainContent>
      
      <AdBanner position="right" />
    </AppContainer>
  );
};

export default App; 
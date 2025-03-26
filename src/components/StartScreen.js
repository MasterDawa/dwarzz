import React from 'react';
import styled from 'styled-components';
import backgroundImage from '../img/background.png';
import { clearSavedGame } from '../utils/localStorage';

const StartScreenBackground = styled.div`
  position: relative;
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${backgroundImage});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    opacity: 0.25; /* 75% transparency */
    z-index: -1;
  }
`;

const StartScreenContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const GameTitle = styled.h1`
  font-size: 4rem;
  margin-bottom: 2rem;
  color: var(--color-primary);
  text-shadow: 0 0 10px rgba(255, 77, 0, 0.5);
`;

const GameIntro = styled.div`
  background: rgba(20, 20, 20, 0.75);
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
`;

const StartButton = styled.button`
  background-color: var(--color-primary);
  font-size: 1.2rem;
  padding: 0.8rem 2rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(255, 77, 0, 0.5);
  }
`;

const ContinueButton = styled(StartButton)`
  background-color: var(--color-secondary);
  
  &:hover {
    box-shadow: 0 4px 12px rgba(65, 105, 225, 0.5);
  }
`;

const StartScreen = ({ onStartGame, onContinueGame, hasSavedGame }) => {
  
  const handleStartGame = () => {
    clearSavedGame();
    onStartGame();
  };
  
  return (
    <StartScreenBackground>
      <StartScreenContainer>
        <GameTitle>Hustle City</GameTitle>
        
        <GameIntro>
          <h2>Welcome to the streets</h2>
          <p>
            You're a small-time dealer in New York City, looking to make it big in the underground drug trade.
            Buy low, sell high, and expand your territory while avoiding the cops and rival dealers.
          </p>
          <p>
            Complete quests, make strategic decisions, and build your empire from nothing.
            But be careful - one wrong move could cost you everything.
          </p>
          
          <ButtonGroup>
            <StartButton onClick={handleStartGame}>New Game</StartButton>
            {hasSavedGame && (
              <ContinueButton onClick={onContinueGame}>Continue Game</ContinueButton>
            )}
          </ButtonGroup>
        </GameIntro>
        
        <div className="disclaimer">
          <p>
            <small>
              This game is a work of fiction and does not promote or endorse illegal activities.
              It's a strategy game based on resource management and risk assessment.
            </small>
          </p>
        </div>
      </StartScreenContainer>
    </StartScreenBackground>
  );
};

export default StartScreen; 
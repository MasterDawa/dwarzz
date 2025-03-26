import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import gameBackgroundImage from '../img/gamebackground.png';

// Components
import PlayerStats from './PlayerStats';
import LocationMap from './LocationMap';
import DrugMarket from './DrugMarket';
import QuestLog from './QuestLog';
import GameLog from './GameLog';

// Utils
import { autoSaveGame } from '../utils/localStorage';
import { resetGame } from '../store/gameSlice';

const GameBackground = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${gameBackgroundImage});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    opacity: 0.25; /* 75% transparency */
    z-index: -1;
  }
`;

const GameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  overflow: hidden;
`;

const GameGrid = styled.div`
  display: grid;
  grid-template-columns: 320px 1fr;
  grid-template-rows: 1fr auto;
  gap: 1rem;
  flex: 1;
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
`;

const LeftColumn = styled.div`
  grid-column: 1;
  grid-row: 1 / span 2;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  max-height: 100%;
  overflow: hidden;
`;

const MainContent = styled.div`
  grid-column: 2;
  grid-row: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`;

const MapSection = styled.div`
  flex-shrink: 0;
  margin-bottom: 0.8rem;
`;

const MarketSection = styled.div`
  flex: 1;
  overflow: hidden;
  min-height: 0;
  display: flex;
  flex-direction: column;
`;

const BottomRow = styled.div`
  grid-column: 2;
  grid-row: 2;
  height: 160px;
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.2rem;
  padding: 0 0.5rem;
`;

const GameTitle = styled.h2`
  color: var(--color-primary);
  margin: 0;
  font-size: 1.8rem;
`;

const BackButton = styled.button`
  background-color: var(--color-secondary);
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const GameContainer = () => {
  const dispatch = useDispatch();
  const gameState = useSelector(state => state);
  
  // Auto-save on any state change
  useEffect(() => {
    const saveTimer = setTimeout(() => {
      autoSaveGame(gameState);
    }, 1000);
    
    return () => clearTimeout(saveTimer);
  }, [gameState]);
  
  const handleBackToMain = () => {
    // Auto-save before going back to ensure game state is saved
    autoSaveGame(gameState);
    dispatch(resetGame());
  };
  
  return (
    <GameBackground>
      <GameWrapper>
        <HeaderRow>
          <GameTitle>Hustle City</GameTitle>
          <BackButton onClick={handleBackToMain}>
            ← Back to Main Menu
          </BackButton>
        </HeaderRow>
        
        <GameGrid>
          <LeftColumn>
            <PlayerStats />
            <QuestLog />
          </LeftColumn>
          
          <MainContent>
            <MapSection>
              <LocationMap />
            </MapSection>
            <MarketSection>
              <DrugMarket />
            </MarketSection>
          </MainContent>
          
          <BottomRow>
            <GameLog />
          </BottomRow>
        </GameGrid>
      </GameWrapper>
    </GameBackground>
  );
};

export default GameContainer; 
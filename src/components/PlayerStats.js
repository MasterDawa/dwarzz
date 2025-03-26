import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const StatsContainer = styled.div`
  background: rgba(20, 20, 20, 0.75);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.15);
  height: 380px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

const StatTitle = styled.h3`
  color: var(--color-primary);
  margin-bottom: 0.5rem;
  border-bottom: 1px solid rgba(255, 77, 0, 0.3);
  padding-bottom: 0.5rem;
  font-size: 1.1rem;
`;

const StatRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  padding: 0.2rem 0;
`;

const StatLabel = styled.span`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.95rem;
`;

const StatValue = styled.span`
  font-weight: bold;
  color: ${props => props.color || 'white'};
  font-size: 0.95rem;
`;

const HealthBar = styled.div`
  width: 100%;
  height: 10px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  margin-top: 5px;
  overflow: hidden;
`;

const HealthFill = styled.div`
  height: 100%;
  width: ${props => props.health}%;
  background: ${props => {
    if (props.health > 70) return 'var(--color-success)';
    if (props.health > 30) return 'var(--color-warning)';
    return 'var(--color-danger)';
  }};
  transition: width 0.3s ease;
`;

const InventoryList = styled.div`
  margin-top: 1rem;
`;

const InventoryItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.2rem 0;
  border-bottom: 1px dotted rgba(255, 255, 255, 0.1);
  
  &:last-child {
    border-bottom: none;
  }
`;

const AssetList = styled.div`
  margin-top: 1rem;
`;

const AssetItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.2rem 0;
  border-bottom: 1px dotted rgba(255, 255, 255, 0.1);
  
  &:last-child {
    border-bottom: none;
  }
`;

const AssetIcon = styled.span`
  color: ${props => props.active ? 'var(--color-success)' : 'rgba(255, 255, 255, 0.3)'};
`;

const PlayerStats = () => {
  const { 
    money = 0, 
    health = 100, 
    inventory = {}, 
    level = 0, 
    reputation = 0, 
    currentLocation = 'manhattan',
    passiveIncome = 0,
    btc = 0,
    assets = {},
    combat = { attack: 10, defense: 5, weapons: [] }
  } = useSelector(state => state.player);
  const { day = 1 } = useSelector(state => state.game);
  
  // Format location name for display
  const formatLocation = (location) => {
    return location.charAt(0).toUpperCase() + location.slice(1).replace(/([A-Z])/g, ' $1');
  };
  
  // Format BTC amount
  const formatBTC = (amount) => {
    return (amount || 0).toFixed(8);
  };
  
  return (
    <StatsContainer>
      <StatTitle>Player Stats</StatTitle>
      
      <StatRow>
        <StatLabel>Level:</StatLabel>
        <StatValue>{level}</StatValue>
      </StatRow>
      
      <StatRow>
        <StatLabel>Money:</StatLabel>
        <StatValue color="#00cc66">${(money || 0).toLocaleString()}</StatValue>
      </StatRow>
      
      <StatRow>
        <StatLabel>Passive Income:</StatLabel>
        <StatValue color="#00cc66">${(passiveIncome || 0).toLocaleString()}/day</StatValue>
      </StatRow>
      
      <StatRow>
        <StatLabel>Bitcoin:</StatLabel>
        <StatValue color="#ff9900">{formatBTC(btc)} BTC</StatValue>
      </StatRow>
      
      <StatRow>
        <StatLabel>Health:</StatLabel>
        <StatValue color={health > 70 ? '#00cc66' : health > 30 ? '#ffcc00' : '#ff4444'}>
          {health}%
        </StatValue>
      </StatRow>
      
      <HealthBar>
        <HealthFill health={health} />
      </HealthBar>
      
      <StatRow>
        <StatLabel>Reputation:</StatLabel>
        <StatValue>{reputation}</StatValue>
      </StatRow>
      
      <StatRow>
        <StatLabel>Location:</StatLabel>
        <StatValue>{formatLocation(currentLocation)}</StatValue>
      </StatRow>
      
      <StatRow>
        <StatLabel>Day:</StatLabel>
        <StatValue>{day}</StatValue>
      </StatRow>
      
      <StatRow>
        <StatLabel>Attack:</StatLabel>
        <StatValue>{combat.attack}</StatValue>
      </StatRow>
      
      <StatRow>
        <StatLabel>Defense:</StatLabel>
        <StatValue>{combat.defense}</StatValue>
      </StatRow>
      
      <StatTitle>Inventory</StatTitle>
      <InventoryList>
        {Object.entries(inventory).map(([item, amount]) => (
          <InventoryItem key={item}>
            <StatLabel>{item.charAt(0).toUpperCase() + item.slice(1)}:</StatLabel>
            <StatValue>{amount}</StatValue>
          </InventoryItem>
        ))}
      </InventoryList>
      
      <StatTitle>Assets</StatTitle>
      <AssetList>
        {Object.entries(assets).map(([asset, active]) => (
          <AssetItem key={asset}>
            <AssetIcon active={active}>●</AssetIcon>
            <StatLabel>{asset.replace(/([A-Z])/g, ' $1').trim()}</StatLabel>
          </AssetItem>
        ))}
      </AssetList>
      
      {combat.weapons.length > 0 && (
        <>
          <StatTitle>Weapons</StatTitle>
          <InventoryList>
            {combat.weapons.map((weapon, index) => (
              <InventoryItem key={index}>
                <StatLabel>{weapon.name}</StatLabel>
                <StatValue>+{weapon.damage}</StatValue>
              </InventoryItem>
            ))}
          </InventoryList>
        </>
      )}
    </StatsContainer>
  );
};

export default PlayerStats; 
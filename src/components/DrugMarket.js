import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { updateMoney, updateInventory, updateBTC } from '../store/playerSlice';
import { addMessage } from '../store/gameSlice';
import { updateQuestProgress } from '../store/questSlice';

const MarketContainer = styled.div`
  background: rgba(20, 20, 20, 0.75);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.15);
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

const MarketTitle = styled.h3`
  color: var(--color-primary);
  margin-bottom: 0.8rem;
  border-bottom: 1px solid rgba(255, 77, 0, 0.3);
  padding-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.1rem;
`;

const TabContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const Tab = styled.button`
  padding: 0.5rem 1rem;
  background: ${props => props.active ? 'var(--color-primary)' : 'rgba(30, 30, 30, 0.75)'};
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: ${props => props.active ? 'white' : 'rgba(255, 255, 255, 0.7)'};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.active ? 'var(--color-primary)' : 'rgba(40, 40, 40, 0.75)'};
  }
`;

const DrugGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  gap: 1rem;
  overflow-y: auto;
  flex: 1;
  padding-right: 5px;
  min-height: 0;
`;

const ToolGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  overflow-y: auto;
  flex: 1;
  padding-right: 5px;
  min-height: 0;
`;

const ToolCard = styled.div`
  background: rgba(30, 30, 30, 0.75);
  border-radius: 6px;
  padding: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }
`;

const ToolName = styled.div`
  font-weight: bold;
  font-size: 1rem;
  margin-bottom: 0.4rem;
  color: white;
`;

const ToolDescription = styled.div`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 0.8rem;
`;

const ToolPrice = styled.div`
  font-size: 1.1rem;
  margin-bottom: 0.8rem;
  color: var(--color-success);
`;

const ToolButton = styled.button`
  width: 100%;
  background-color: var(--color-primary);
  padding: 0.5rem;
  font-size: 0.9rem;
  
  &:disabled {
    background-color: rgba(50, 50, 50, 0.5);
  }
`;

const DrugCard = styled.div`
  background: rgba(30, 30, 30, 0.75);
  border-radius: 6px;
  padding: 0.8rem;
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }
`;

const DrugName = styled.div`
  font-weight: bold;
  font-size: 1rem;
  margin-bottom: 0.4rem;
  color: white;
`;

const DrugPrice = styled.div`
  font-size: 1.1rem;
  margin-bottom: 0.4rem;
  color: ${props => props.color || 'white'};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const ActionButton = styled.button`
  flex: 1;
  background-color: ${props => props.action === 'buy' ? 'var(--color-success)' : 'var(--color-danger)'};
  padding: 0.5rem;
  font-size: 0.9rem;
  
  &:disabled {
    background-color: rgba(50, 50, 50, 0.5);
  }
`;

const AmountControl = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
`;

const AmountButton = styled.button`
  width: 30px;
  height: 30px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(50, 50, 50, 0.8);
`;

const AmountInput = styled.input`
  width: 50px;
  padding: 0.3rem;
  text-align: center;
  background-color: rgba(30, 30, 30, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  margin: 0 0.3rem;
`;

const DrugMarket = () => {
  const dispatch = useDispatch();
  const { money = 0, inventory = {}, currentLocation = 'manhattan' } = useSelector(state => state.player);
  const { prices = {} } = useSelector(state => state.game);
  const { quests = {}, activeQuestIds = [] } = useSelector(state => state.quests);
  
  const [activeTab, setActiveTab] = useState('drugs');
  const [amounts, setAmounts] = useState({
    weed: 1,
    cocaine: 1,
    heroin: 1,
    meth: 1,
    ecstasy: 1
  });
  
  // Format drug name for display
  const formatDrugName = (drug) => {
    return drug.charAt(0).toUpperCase() + drug.slice(1);
  };
  
  // Location prices with fallback
  const locationPrices = prices[currentLocation] || {
    weed: 50,
    cocaine: 200,
    heroin: 300,
    meth: 120,
    ecstasy: 80
  };
  
  // Change amount for drug
  const changeAmount = (drug, value) => {
    setAmounts(prev => ({
      ...prev,
      [drug]: Math.max(1, value)
    }));
  };
  
  // Buy drugs
  const buyDrug = (drug, amount) => {
    const price = locationPrices[drug];
    if (!price) {
      dispatch(addMessage(`Error: No price available for ${drug}.`));
      return;
    }
    
    const cost = price * amount;
    
    if (money < cost) {
      dispatch(addMessage(`You don't have enough money to buy ${amount} ${drug}.`));
      return;
    }
    
    // Update money and inventory
    dispatch(updateMoney(-cost));
    dispatch(updateInventory({ drug, amount }));
    dispatch(addMessage(`Bought ${amount} ${drug} for $${cost.toLocaleString()}.`));
    
    // Check for active quests related to buying this drug
    activeQuestIds.forEach(questId => {
      const quest = quests[questId];
      if (!quest) return;
      
      if (
        quest.requirement.type === 'purchase' && 
        (quest.requirement.drug === drug || quest.requirement.drug === 'any') &&
        (quest.requirement.location === currentLocation || quest.requirement.location === 'any')
      ) {
        // Update quest progress
        const newProgress = quest.progress + amount;
        dispatch(updateQuestProgress({ 
          questId, 
          progress: newProgress 
        }));
        
        // Check if completed
        if (newProgress >= quest.requirement.amount && !quest.completed) {
          // Apply rewards
          if (quest.reward.money) {
            dispatch(updateMoney(quest.reward.money));
          }
          if (quest.reward.reputation) {
            dispatch({ type: 'player/updateReputation', payload: quest.reward.reputation });
          }
          if (quest.reward.levelUp) {
            dispatch({ type: 'player/levelUp' });
          }
          
          dispatch(addMessage(
            `Quest Completed: ${quest.title}! You earned $${quest.reward.money} and leveled up.`
          ));
        }
      }
    });
  };
  
  // Sell drugs
  const sellDrug = (drug, amount) => {
    if (!inventory[drug] || inventory[drug] < amount) {
      dispatch(addMessage(`You don't have enough ${drug} to sell.`));
      return;
    }
    
    const price = locationPrices[drug];
    if (!price) {
      dispatch(addMessage(`Error: No price available for ${drug}.`));
      return;
    }
    
    const profit = price * amount;
    
    // Update money and inventory
    dispatch(updateMoney(profit));
    dispatch(updateInventory({ drug, amount: -amount }));
    dispatch(addMessage(`Sold ${amount} ${drug} for $${profit.toLocaleString()}.`));
    
    // Check for active quests related to selling this drug
    activeQuestIds.forEach(questId => {
      const quest = quests[questId];
      if (!quest) return;
      
      if (
        quest.requirement.type === 'sell' && 
        (quest.requirement.drug === drug || quest.requirement.drug === 'any') &&
        (quest.requirement.location === currentLocation || quest.requirement.location === 'any')
      ) {
        // Update quest progress
        const newProgress = quest.progress + amount;
        dispatch(updateQuestProgress({ 
          questId, 
          progress: newProgress 
        }));
        
        // Check if completed
        if (newProgress >= quest.requirement.amount && !quest.completed) {
          // Apply rewards
          if (quest.reward.money) {
            dispatch(updateMoney(quest.reward.money));
          }
          if (quest.reward.reputation) {
            dispatch({ type: 'player/updateReputation', payload: quest.reward.reputation });
          }
          if (quest.reward.levelUp) {
            dispatch({ type: 'player/levelUp' });
          }
          
          dispatch(addMessage(
            `Quest Completed: ${quest.title}! You earned $${quest.reward.money} and leveled up.`
          ));
        }
      }
    });
  };
  
  // Tool functions
  const tools = [
    {
      id: 'miningRig',
      name: 'Basic Mining Rig',
      description: 'Set up a basic Bitcoin mining operation',
      price: 5000,
      btcPerDay: 0.01,
      action: () => {
        if (money < 5000) {
          dispatch(addMessage("You don't have enough money to buy a mining rig."));
          return;
        }
        dispatch(updateMoney(-5000));
        dispatch(updateBTC(0.01));
        dispatch(addMessage("You've set up a basic mining rig. Generating 0.01 BTC per day."));
      }
    },
    {
      id: 'advancedRig',
      name: 'Advanced Mining Rig',
      description: 'Upgrade to a more powerful mining setup',
      price: 15000,
      btcPerDay: 0.05,
      action: () => {
        if (money < 15000) {
          dispatch(addMessage("You don't have enough money to buy an advanced mining rig."));
          return;
        }
        dispatch(updateMoney(-15000));
        dispatch(updateBTC(0.05));
        dispatch(addMessage("You've upgraded to an advanced mining rig. Generating 0.05 BTC per day."));
      }
    },
    {
      id: 'cryptoWallet',
      name: 'Secure Crypto Wallet',
      description: 'Store your Bitcoin safely',
      price: 1000,
      action: () => {
        if (money < 1000) {
          dispatch(addMessage("You don't have enough money to buy a secure wallet."));
          return;
        }
        dispatch(updateMoney(-1000));
        dispatch(addMessage("You've purchased a secure crypto wallet."));
      }
    }
  ];

  return (
    <MarketContainer>
      <MarketTitle>
        {activeTab === 'drugs' ? 'Drug Market' : 'Tools'}
        <span>Cash: ${money.toLocaleString()}</span>
      </MarketTitle>
      
      <TabContainer>
        <Tab 
          active={activeTab === 'drugs'} 
          onClick={() => setActiveTab('drugs')}
        >
          Drugs
        </Tab>
        <Tab 
          active={activeTab === 'tools'} 
          onClick={() => setActiveTab('tools')}
        >
          Tools
        </Tab>
      </TabContainer>
      
      {activeTab === 'drugs' ? (
        <DrugGrid>
          {Object.entries(locationPrices).map(([drug, price]) => (
            <DrugCard key={drug}>
              <DrugName>{formatDrugName(drug)}</DrugName>
              <DrugPrice color="var(--color-success)">${price.toLocaleString()}</DrugPrice>
              <div>In stock: {inventory[drug] || 0}</div>
              
              <AmountControl>
                <AmountButton onClick={() => changeAmount(drug, amounts[drug] - 1)}>-</AmountButton>
                <AmountInput 
                  type="number" 
                  min="1" 
                  value={amounts[drug]} 
                  onChange={(e) => changeAmount(drug, parseInt(e.target.value) || 1)}
                />
                <AmountButton onClick={() => changeAmount(drug, amounts[drug] + 1)}>+</AmountButton>
              </AmountControl>
              
              <ButtonGroup>
                <ActionButton 
                  action="buy"
                  onClick={() => buyDrug(drug, amounts[drug])}
                  disabled={money < price * amounts[drug]}
                >
                  Buy
                </ActionButton>
                <ActionButton 
                  action="sell"
                  onClick={() => sellDrug(drug, amounts[drug])}
                  disabled={!inventory[drug] || inventory[drug] < amounts[drug]}
                >
                  Sell
                </ActionButton>
              </ButtonGroup>
            </DrugCard>
          ))}
        </DrugGrid>
      ) : (
        <ToolGrid>
          {tools.map(tool => (
            <ToolCard key={tool.id}>
              <ToolName>{tool.name}</ToolName>
              <ToolDescription>{tool.description}</ToolDescription>
              <ToolPrice>${tool.price.toLocaleString()}</ToolPrice>
              <ToolButton
                onClick={tool.action}
                disabled={money < tool.price}
              >
                Purchase
              </ToolButton>
            </ToolCard>
          ))}
        </ToolGrid>
      )}
    </MarketContainer>
  );
};

export default DrugMarket; 
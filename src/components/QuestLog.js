import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const QuestContainer = styled.div`
  background: rgba(20, 20, 20, 0.75);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.15);
  flex: 1;
  overflow-y: auto;
  min-height: 0;
  max-height: calc(100% - 400px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

const QuestTitle = styled.h3`
  color: var(--color-primary);
  margin-bottom: 0.5rem;
  border-bottom: 1px solid rgba(255, 77, 0, 0.3);
  padding-bottom: 0.5rem;
  font-size: 1.1rem;
`;

const QuestItem = styled.div`
  margin-bottom: 1rem;
  padding: 0.5rem;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  border-left: 3px solid var(--color-secondary);
`;

const QuestHeader = styled.div`
  font-weight: bold;
  font-size: 1.1rem;
  margin-bottom: 0.3rem;
  color: var(--color-secondary);
`;

const QuestDescription = styled.div`
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  color: rgba(255, 255, 255, 0.8);
`;

const QuestProgress = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ProgressBar = styled.div`
  flex: 1;
  height: 6px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 3px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  width: ${props => (props.progress / props.max) * 100}%;
  background: var(--color-secondary);
`;

const ProgressText = styled.span`
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
`;

const NoQuestsMessage = styled.div`
  text-align: center;
  padding: 1rem;
  color: rgba(255, 255, 255, 0.5);
  font-style: italic;
`;

const QuestLog = () => {
  const { quests, activeQuestIds } = useSelector(state => state.quests);
  
  // Get active quests from IDs
  const activeQuests = activeQuestIds.map(id => quests[id]).filter(Boolean);
  
  return (
    <QuestContainer>
      <QuestTitle>Active Quests</QuestTitle>
      
      {activeQuests.length === 0 ? (
        <NoQuestsMessage>No active quests available.</NoQuestsMessage>
      ) : (
        activeQuests.map(quest => (
          <QuestItem key={quest.id}>
            <QuestHeader>{quest.title}</QuestHeader>
            <QuestDescription>{quest.description}</QuestDescription>
            <QuestProgress>
              <ProgressBar>
                <ProgressFill 
                  progress={quest.progress} 
                  max={quest.requirement.amount} 
                />
              </ProgressBar>
              <ProgressText>
                {quest.progress}/{quest.requirement.amount}
              </ProgressText>
            </QuestProgress>
          </QuestItem>
        ))
      )}
    </QuestContainer>
  );
};

export default QuestLog; 
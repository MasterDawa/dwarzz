import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const LogContainer = styled.div`
  background: rgba(20, 20, 20, 0.75);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.15);
  height: 100%;
  overflow-y: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

const LogTitle = styled.h3`
  color: var(--color-primary);
  margin-bottom: 0.5rem;
  border-bottom: 1px solid rgba(255, 77, 0, 0.3);
  padding-bottom: 0.5rem;
  font-size: 1.1rem;
`;

const LogMessages = styled.div`
  font-size: 0.95rem;
`;

const LogEntry = styled.div`
  padding: 0.3rem 0;
  border-bottom: 1px dotted rgba(255, 255, 255, 0.1);
  
  &:last-child {
    border-bottom: none;
  }
`;

const LogDay = styled.span`
  color: var(--color-secondary);
  font-weight: bold;
  margin-right: 0.5rem;
`;

const LogText = styled.span`
  color: rgba(255, 255, 255, 0.8);
`;

const GameLog = () => {
  const { messageHistory } = useSelector(state => state.game);
  const logEndRef = useRef(null);
  
  // Auto-scroll to the bottom when new messages are added
  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messageHistory]);
  
  return (
    <LogContainer>
      <LogTitle>Game Log</LogTitle>
      
      <LogMessages>
        {messageHistory.length === 0 ? (
          <LogEntry>
            <LogText>Welcome to Drug Wars. Your journey begins now.</LogText>
          </LogEntry>
        ) : (
          messageHistory.map((entry, index) => (
            <LogEntry key={index}>
              <LogDay>Day {entry.day}:</LogDay>
              <LogText>{entry.message}</LogText>
            </LogEntry>
          ))
        )}
        <div ref={logEndRef} />
      </LogMessages>
    </LogContainer>
  );
};

export default GameLog; 
import React from 'react';
import styled from 'styled-components';

const AdContainer = styled.div`
  width: 150px;
  height: 100%;
  background-color: rgba(20, 20, 20, 0.75);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  border-${props => props.position === 'left' ? 'right' : 'left'}: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: ${props => props.position === 'left' ? '4px 0 8px' : '-4px 0 8px'} rgba(0, 0, 0, 0.3);
  overflow-y: auto;
`;

const AdPlaceholder = styled.div`
  width: 100%;
  height: 600px;
  flex-shrink: 0;
  background-color: rgba(40, 40, 40, 0.6);
  border: 1px dashed rgba(255, 255, 255, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const AdBanner = ({ position }) => {
  return (
    <AdContainer position={position}>
      <AdPlaceholder>
        <span>AD SPACE</span>
        <span>150 x 600</span>
      </AdPlaceholder>
      
      <AdPlaceholder>
        <span>AD SPACE</span>
        <span>150 x 600</span>
      </AdPlaceholder>
    </AdContainer>
  );
};

export default AdBanner; 
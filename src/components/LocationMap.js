import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { updateLocation } from '../store/playerSlice';
import { addMessage, nextDay } from '../store/gameSlice';

const MapContainer = styled.div`
  background: rgba(20, 20, 20, 0.75);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.15);
  height: 220px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

const MapTitle = styled.h3`
  color: var(--color-primary);
  margin-bottom: 0.8rem;
  border-bottom: 1px solid rgba(255, 77, 0, 0.3);
  padding-bottom: 0.5rem;
  font-size: 1.1rem;
`;

const LocationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1rem;
`;

const LocationButton = styled.button`
  background-color: ${props => props.active ? 'var(--color-primary)' : 'rgba(30, 30, 30, 0.8)'};
  color: ${props => props.active ? 'white' : 'rgba(255, 255, 255, 0.7)'};
  border: 1px solid ${props => props.active ? 'var(--color-primary)' : 'rgba(255, 255, 255, 0.2)'};
  padding: 0.75rem;
  border-radius: 6px;
  transition: all 0.3s ease;
  height: 75px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  
  &:hover:not(:disabled) {
    border-color: var(--color-primary);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const LocationName = styled.div`
  font-weight: bold;
  margin-bottom: 0.3rem;
  font-size: 1rem;
`;

const LocationInfo = styled.div`
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
`;

const TravelActions = styled.div`
  margin-top: 0.8rem;
  display: flex;
  justify-content: flex-end;
`;

const LocationMap = () => {
  const dispatch = useDispatch();
  const { currentLocation } = useSelector(state => state.player);
  const { locations } = useSelector(state => state.game);
  
  // Format location name for display
  const formatLocation = (location) => {
    return location.charAt(0).toUpperCase() + location.slice(1).replace(/([A-Z])/g, ' $1');
  };
  
  // Location descriptions
  const locationInfo = {
    manhattan: "High prices, low risk",
    brooklyn: "Medium prices, medium risk",
    queens: "Medium prices, medium risk",
    bronx: "Low prices, high risk",
    statenIsland: "High prices, low risk"
  };
  
  // Handle travel to new location
  const handleTravel = (location) => {
    if (location === currentLocation) return;
    
    dispatch(updateLocation(location));
    dispatch(nextDay());
    dispatch(addMessage(`You traveled to ${formatLocation(location)}. A new day begins.`));
  };
  
  return (
    <MapContainer>
      <MapTitle>New York City Map</MapTitle>
      
      <LocationsGrid>
        {locations.map(location => (
          <LocationButton
            key={location}
            active={location === currentLocation}
            onClick={() => handleTravel(location)}
            disabled={location === currentLocation}
          >
            <LocationName>{formatLocation(location)}</LocationName>
            <LocationInfo>{locationInfo[location]}</LocationInfo>
          </LocationButton>
        ))}
      </LocationsGrid>
      
      <TravelActions>
        <div>
          <small>Travel takes 1 day and prices will change.</small>
        </div>
      </TravelActions>
    </MapContainer>
  );
};

export default LocationMap; 
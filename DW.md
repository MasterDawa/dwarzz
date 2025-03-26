# Drug Wars Game Design Document

## Overview
Drug Wars is a text-based strategy game where players build a criminal empire through drug trading, asset management, and strategic decision-making. The game features multiple paths to success, including drug dealing, nightclub ownership, and cryptocurrency mining.

## Core Gameplay Features

### 1. Multiple Career Paths
- **Drug Dealer Path**
  - Start with small-time drug dealing
  - Progress to becoming a drug kingpin
  - Specialize in specific drugs (weed, cocaine, etc.)
  - Build drug farms and labs

- **Nightclub Owner Path**
  - Invest in nightclubs as fronts
  - Host exclusive events
  - Launder money through legitimate businesses
  - Build a nightlife empire

- **Bitcoin Miner Path**
  - Set up illegal mining operations
  - Invest in hardware and infrastructure
  - Manage power consumption
  - Build a crypto empire

### 2. Quest System
- **Branching Quests**
  - Start with "Small Time Dealer" quest
  - Unlock four paths: Drug Dealer, Nightclub Owner, Bitcoin Miner
  - Each path has unique quests and rewards
  - Quests can have multiple objectives and requirements

- **Quest Types**
  - Purchase: Buy specific drugs
  - Sell: Sell drugs in specific locations
  - Invest: Purchase assets or upgrades
  - Fight: Combat encounters
  - Accumulate: Gather resources

- **Quest Rewards**
  - Money and reputation
  - Passive income
  - Asset unlocks
  - Combat improvements
  - Risk reduction

### 3. Combat System
- **Health Management**
  - Start with 100 health
  - Take damage from risky operations
  - Combat encounters with rivals
  - Need to manage health carefully

- **Combat Stats**
  - Attack: Determines damage dealt
  - Defense: Reduces incoming damage
  - Weapons: Special items that boost combat
  - Level up increases combat stats

### 4. Asset Management
- **Business Assets**
  - Weed Farms: Generate passive weed
  - Cocaine Labs: Generate passive cocaine
  - Nightclubs: Generate passive income
  - Bitcoin Mines: Generate passive BTC

- **Asset Benefits**
  - Passive income generation
  - Risk reduction
  - Market control
  - Reputation boost

### 5. Location System
- **City Areas**
  - Manhattan: High prices, low risk
  - Brooklyn: Medium prices, medium risk
  - Queens: Medium prices, medium risk
  - Bronx: Low prices, high risk
  - Staten Island: High prices, low risk

- **Travel Mechanics**
  - Travel takes time
  - Prices change between locations
  - Risk levels vary
  - Quest requirements may be location-specific

### 6. Risk and Reward
- **Risk Factors**
  - Police encounters
  - Rival attacks
  - Failed deals
  - Asset damage

- **Risk Management**
  - Reputation affects risk levels
  - Assets can reduce risks
  - Combat stats help in fights
  - Strategic planning required

## User Interface

### 1. Main Components
- **PlayerStats**
  - Health, money, inventory
  - Combat stats and weapons
  - Passive income and assets
  - Reputation and level

- **LocationMap**
  - Interactive city map
  - Location information
  - Travel options
  - Risk indicators

- **DrugMarket**
  - Buy and sell drugs
  - Price information
  - Inventory management
  - Quest progress tracking

- **QuestLog**
  - Active quests
  - Quest requirements
  - Progress tracking
  - Rewards preview

- **GameLog**
  - Event history
  - Quest updates
  - Combat results
  - Important messages

### 2. Visual Design
- Dark theme with neon accents
- Clear information hierarchy
- Responsive layout
- Interactive elements
- Status indicators

## Technical Implementation

### 1. State Management
- Redux for game state
- Local storage for saves
- Auto-save functionality
- State persistence

### 2. Game Logic
- Turn-based progression
- Random event generation
- Combat calculations
- Asset management
- Quest tracking

### 3. UI Components
- Styled-components for styling
- React for component structure
- Responsive design
- Interactive elements

## Future Enhancements
1. Additional career paths
2. More complex combat system
3. Multiplayer features
4. Advanced asset management
5. Dynamic market system
6. More quest variations
7. Achievement system
8. Leaderboards
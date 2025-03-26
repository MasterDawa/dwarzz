import { createSlice } from '@reduxjs/toolkit';

// Initial quests data with 100 new quests
const questData = {
  // Existing Quests
  smallTimeDealer: {
    id: 'smallTimeDealer',
    title: 'Small Time Dealer',
    description: 'Buy 5 units of weed to start your journey.',
    requirement: {
      type: 'purchase',
      drug: 'weed',
      amount: 5,
      location: 'any'
    },
    reward: {
      money: 100,
      levelUp: true,
      reputation: 5
    },
    progress: 0,
    completed: false,
    unlocked: true,
    nextQuests: ['expandingTerritory', 'weedWholesaler', 'cocaineConnection', 'nightclubNovice', 'bitcoinBeginner']
  },
  expandingTerritory: {
    id: 'expandingTerritory',
    title: 'Expanding Territory',
    description: 'Sell 10 units of weed in Brooklyn.',
    requirement: {
      type: 'sell',
      drug: 'weed',
      amount: 10,
      location: 'brooklyn'
    },
    reward: {
      money: 250,
      levelUp: true,
      reputation: 10
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['bigPlayer']
  },
  bigPlayer: {
    id: 'bigPlayer',
    title: 'Big Player',
    description: 'Sell 20 units of cocaine in Manhattan.',
    requirement: {
      type: 'sell',
      drug: 'cocaine',
      amount: 20,
      location: 'manhattan'
    },
    reward: {
      money: 1000,
      levelUp: true,
      reputation: 25
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['drugOverlord']
  },
  drugOverlord: {
    id: 'drugOverlord',
    title: 'Drug Overlord',
    description: 'Accumulate $10,000 in cash.',
    requirement: {
      type: 'accumulate',
      resource: 'money',
      amount: 10000
    },
    reward: {
      money: 5000,
      levelUp: true,
      reputation: 50
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: []
  },

  // Weed Path (25 Quests)
  weedWholesaler: {
    id: 'weedWholesaler',
    title: 'Weed Wholesaler',
    description: 'Sell 50 units of weed across any cities.',
    requirement: {
      type: 'sell',
      drug: 'weed',
      amount: 50,
      location: 'any'
    },
    reward: {
      money: 500,
      reputation: 10
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['supplierSearch']
  },
  supplierSearch: {
    id: 'supplierSearch',
    title: 'Supplier Search',
    description: 'Buy 10 units of weed in Denver to find a reliable supplier.',
    requirement: {
      type: 'purchase',
      drug: 'weed',
      amount: 10,
      location: 'denver'
    },
    reward: {
      money: 200,
      discount: { drug: 'weed', location: 'denver', percent: 10 }
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['qualityControl']
  },
  qualityControl: {
    id: 'qualityControl',
    title: 'Quality Control',
    description: 'Accumulate 5 units of high-quality weed (assumes testing mechanic).',
    requirement: {
      type: 'accumulate',
      drug: 'weed',
      amount: 5
    },
    reward: {
      money: 300,
      reputation: 15
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['expandMarkets']
  },
  expandMarkets: {
    id: 'expandMarkets',
    title: 'Expand to New Markets',
    description: 'Sell 20 units of weed in Seattle.',
    requirement: {
      type: 'sell',
      drug: 'weed',
      amount: 20,
      location: 'seattle'
    },
    reward: {
      money: 800,
      reputation: 20
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['avoidFuzz']
  },
  avoidFuzz: {
    id: 'avoidFuzz',
    title: 'Avoid the Fuzz',
    description: 'Sell 25 weed in any city without a police encounter.',
    requirement: {
      type: 'sell',
      drug: 'weed',
      amount: 25,
      location: 'any'
    },
    reward: {
      money: 1000,
      reputation: 25
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['weedKingpin']
  },
  weedKingpin: {
    id: 'weedKingpin',
    title: 'Weed Kingpin',
    description: 'Sell 100 weed to dominate a city’s market.',
    requirement: {
      type: 'sell',
      drug: 'weed',
      amount: 100,
      location: 'any'
    },
    reward: {
      money: 2000,
      reputation: 30
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['cultivation']
  },
  cultivation: {
    id: 'cultivation',
    title: 'Cultivation',
    description: 'Invest $5000 to start a weed farm.',
    requirement: {
      type: 'invest', // Custom: Deduct $5000, add farm
      amount: 5000,
      target: 'weedFarm'
    },
    reward: {
      passiveWeed: 5 // 5 weed per turn
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['strainDevelopment']
  },
  strainDevelopment: {
    id: 'strainDevelopment',
    title: 'Strain Development',
    description: 'Accumulate 50 weed to develop a new strain.',
    requirement: {
      type: 'accumulate',
      drug: 'weed',
      amount: 50
    },
    reward: {
      money: 1500,
      reputation: 20,
      newStrain: true // Higher sale price
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['weedFestival']
  },
  weedFestival: {
    id: 'weedFestival',
    title: 'Weed Festival',
    description: 'Invest $3000 to host a weed festival.',
    requirement: {
      type: 'invest',
      amount: 3000,
      target: 'festival'
    },
    reward: {
      money: 5000,
      reputation: 35
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['legalizationLobby']
  },
  legalizationLobby: {
    id: 'legalizationLobby',
    title: 'Legalization Lobby',
    description: 'Spend $10,000 to lobby for weed legalization.',
    requirement: {
      type: 'invest',
      amount: 10000,
      target: 'lobby'
    },
    reward: {
      reputation: 50,
      riskReduction: true // Lower police risk
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['greenThumb']
  },
  greenThumb: {
    id: 'greenThumb',
    title: 'Green Thumb',
    description: 'Sell 150 weed from your farm.',
    requirement: {
      type: 'sell',
      drug: 'weed',
      amount: 150,
      location: 'any'
    },
    reward: {
      money: 3000,
      reputation: 40
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['marketDominance']
  },
  marketDominance: {
    id: 'marketDominance',
    title: 'Market Dominance',
    description: 'Sell 200 weed to control 75% of a city’s market.',
    requirement: {
      type: 'sell',
      drug: 'weed',
      amount: 200,
      location: 'any'
    },
    reward: {
      money: 4000,
      reputation: 50
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['undergroundNetwork']
  },
  undergroundNetwork: {
    id: 'undergroundNetwork',
    title: 'Underground Network',
    description: 'Invest $8000 in a secret distribution network.',
    requirement: {
      type: 'invest',
      amount: 8000,
      target: 'network'
    },
    reward: {
      passiveIncome: 200
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['policeBribe']
  },
  policeBribe: {
    id: 'policeBribe',
    title: 'Police Bribe',
    description: 'Pay $5000 to bribe police.',
    requirement: {
      type: 'invest',
      amount: 5000,
      target: 'bribe'
    },
    reward: {
      riskReduction: true
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['celebEndorsementWeed']
  },
  celebEndorsementWeed: {
    id: 'celebEndorsementWeed',
    title: 'Celebrity Endorsement',
    description: 'Sell 250 weed with a celebrity’s backing.',
    requirement: {
      type: 'sell',
      drug: 'weed',
      amount: 250,
      location: 'any'
    },
    reward: {
      money: 6000,
      reputation: 60
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['weedBrand']
  },
  weedBrand: {
    id: 'weedBrand',
    title: 'Weed Brand',
    description: 'Invest $10,000 to create a branded weed product.',
    requirement: {
      type: 'invest',
      amount: 10000,
      target: 'brand'
    },
    reward: {
      money: 8000,
      reputation: 70
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['internationalExportWeed']
  },
  internationalExportWeed: {
    id: 'internationalExportWeed',
    title: 'International Export',
    description: 'Sell 300 weed internationally.',
    requirement: {
      type: 'sell',
      drug: 'weed',
      amount: 300,
      location: 'international'
    },
    reward: {
      money: 10000,
      reputation: 80
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['weedMonopoly']
  },
  weedMonopoly: {
    id: 'weedMonopoly',
    title: 'Weed Monopoly',
    description: 'Sell 400 weed to control 90% of the market.',
    requirement: {
      type: 'sell',
      drug: 'weed',
      amount: 400,
      location: 'any'
    },
    reward: {
      money: 12000,
      reputation: 90
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['politicalInfluenceWeed']
  },
  politicalInfluenceWeed: {
    id: 'politicalInfluenceWeed',
    title: 'Political Influence',
    description: 'Invest $15,000 in political campaigns.',
    requirement: {
      type: 'invest',
      amount: 15000,
      target: 'politics'
    },
    reward: {
      reputation: 100,
      riskReduction: true
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['weedEmpire']
  },
  weedEmpire: {
    id: 'weedEmpire',
    title: 'Weed Empire',
    description: 'Accumulate $50,000 from weed sales.',
    requirement: {
      type: 'accumulate',
      resource: 'money',
      amount: 50000
    },
    reward: {
      money: 20000,
      reputation: 110
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['researchBreakthrough']
  },
  researchBreakthrough: {
    id: 'researchBreakthrough',
    title: 'Research Breakthrough',
    description: 'Sell 500 weed with a superior strain.',
    requirement: {
      type: 'sell',
      drug: 'weed',
      amount: 500,
      location: 'any'
    },
    reward: {
      money: 25000,
      reputation: 120
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['globalDistributionWeed']
  },
  globalDistributionWeed: {
    id: 'globalDistributionWeed',
    title: 'Global Distribution',
    description: 'Invest $20,000 in a global network.',
    requirement: {
      type: 'invest',
      amount: 20000,
      target: 'globalNetwork'
    },
    reward: {
      passiveIncome: 500
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['weedTycoon']
  },
  weedTycoon: {
    id: 'weedTycoon',
    title: 'Weed Tycoon',
    description: 'Accumulate $100,000 from weed.',
    requirement: {
      type: 'accumulate',
      resource: 'money',
      amount: 100000
    },
    reward: {
      money: 30000,
      reputation: 150
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['weedLegacy']
  },
  weedLegacy: {
    id: 'weedLegacy',
    title: 'Legacy',
    description: 'Sell 1000 weed to secure your empire.',
    requirement: {
      type: 'sell',
      drug: 'weed',
      amount: 1000,
      location: 'any'
    },
    reward: {
      money: 50000,
      reputation: 200
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['weedLegend']
  },
  weedLegend: {
    id: 'weedLegend',
    title: 'Weed Legend',
    description: 'Become the ultimate weed magnate.',
    requirement: {
      type: 'accumulate',
      resource: 'reputation',
      amount: 500
    },
    reward: {
      money: 100000,
      title: 'Weed Legend'
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: []
  },

  // Cocaine Path (25 Quests)
  cocaineConnection: {
    id: 'cocaineConnection',
    title: 'Cocaine Connection',
    description: 'Buy 10 units of cocaine in Miami.',
    requirement: {
      type: 'purchase',
      drug: 'cocaine',
      amount: 10,
      location: 'miami'
    },
    reward: {
      money: 200,
      reputation: 5
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['smugglingOperation']
  },
  smugglingOperation: {
    id: 'smugglingOperation',
    title: 'Smuggling Operation',
    description: 'Sell 15 cocaine smuggled through customs.',
    requirement: {
      type: 'sell',
      drug: 'cocaine',
      amount: 15,
      location: 'any'
    },
    reward: {
      money: 1500,
      reputation: 20,
      risk: { damage: 20 } // 20% chance of 20 damage
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['cartelAlliance']
  },
  cartelAlliance: {
    id: 'cartelAlliance',
    title: 'Cartel Alliance',
    description: 'Buy 20 cocaine from a cartel in Miami.',
    requirement: {
      type: 'purchase',
      drug: 'cocaine',
      amount: 20,
      location: 'miami'
    },
    reward: {
      discount: { drug: 'cocaine', percent: 15 }
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['highStakesDeal']
  },
  highStakesDeal: {
    id: 'highStakesDeal',
    title: 'High Stakes Deal',
    description: 'Sell 50 cocaine in one transaction.',
    requirement: {
      type: 'sell',
      drug: 'cocaine',
      amount: 50,
      location: 'any'
    },
    reward: {
      money: 5000,
      reputation: 30
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['avoidDEA']
  },
  avoidDEA: {
    id: 'avoidDEA',
    title: 'Avoid the DEA',
    description: 'Sell 30 cocaine without DEA detection.',
    requirement: {
      type: 'sell',
      drug: 'cocaine',
      amount: 30,
      location: 'any'
    },
    reward: {
      money: 2000,
      reputation: 15,
      risk: { damage: 30 } // 30% chance of 30 damage
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['cocaineEmpire']
  },
  cocaineEmpire: {
    id: 'cocaineEmpire',
    title: 'Cocaine Empire',
    description: 'Sell 100 cocaine across multiple cities.',
    requirement: {
      type: 'sell',
      drug: 'cocaine',
      amount: 100,
      location: 'any'
    },
    reward: {
      money: 3000,
      reputation: 40
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['purityTest']
  },
  purityTest: {
    id: 'purityTest',
    title: 'Purity Test',
    description: 'Accumulate 50 pure cocaine units.',
    requirement: {
      type: 'accumulate',
      drug: 'cocaine',
      amount: 50
    },
    reward: {
      money: 2500,
      reputation: 25
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['rivalTakeover']
  },
  rivalTakeover: {
    id: 'rivalTakeover',
    title: 'Rival Takeover',
    description: 'Defeat a rival cocaine dealer.',
    requirement: {
      type: 'fight', // Custom: Combat mechanic
      target: 'rivalDealer',
      win: true
    },
    reward: {
      money: 3000,
      reputation: 35,
      risk: { damage: 25 }
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['internationalExpansionCocaine']
  },
  internationalExpansionCocaine: {
    id: 'internationalExpansionCocaine',
    title: 'International Expansion',
    description: 'Sell 150 cocaine internationally.',
    requirement: {
      type: 'sell',
      drug: 'cocaine',
      amount: 150,
      location: 'international'
    },
    reward: {
      money: 6000,
      reputation: 50
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['cocaineKing']
  },
  cocaineKing: {
    id: 'cocaineKing',
    title: 'Become the Cocaine King',
    description: 'Sell 200 cocaine to dominate the trade.',
    requirement: {
      type: 'sell',
      drug: 'cocaine',
      amount: 200,
      location: 'any'
    },
    reward: {
      money: 8000,
      reputation: 60
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['labSetup']
  },
  labSetup: {
    id: 'labSetup',
    title: 'Lab Setup',
    description: 'Invest $10,000 in a cocaine lab.',
    requirement: {
      type: 'invest',
      amount: 10000,
      target: 'cocaineLab'
    },
    reward: {
      passiveCocaine: 10 // 10 cocaine per turn
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['supplyChain']
  },
  supplyChain: {
    id: 'supplyChain',
    title: 'Supply Chain',
    description: 'Buy 100 cocaine from suppliers.',
    requirement: {
      type: 'purchase',
      drug: 'cocaine',
      amount: 100,
      location: 'any'
    },
    reward: {
      money: 4000,
      reputation: 45
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['moneyLaundering']
  },
  moneyLaundering: {
    id: 'moneyLaundering',
    title: 'Money Laundering',
    description: 'Invest $15,000 in Thump.Pump to launder money.',
    requirement: {
      type: 'invest',
      amount: 15000,
      target: 'thumpPump'
    },
    reward: {
      cleanMoney: 12000
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['briberyNetwork']
  },
  briberyNetwork: {
    id: 'briberyNetwork',
    title: 'Bribery Network',
    description: 'Pay $8000 to bribe officials.',
    requirement: {
      type: 'invest',
      amount: 8000,
      target: 'bribe'
    },
    reward: {
      riskReduction: true
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['luxuryLifestyle']
  },
  luxuryLifestyle: {
    id: 'luxuryLifestyle',
    title: 'Luxury Lifestyle',
    description: 'Spend $20,000 on luxury items.',
    requirement: {
      type: 'invest',
      amount: 20000,
      target: 'luxury'
    },
    reward: {
      reputation: 70
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['cartelWar']
  },
  cartelWar: {
    id: 'cartelWar',
    title: 'Cartel War',
    description: 'Defeat a rival cartel.',
    requirement: {
      type: 'fight',
      target: 'cartel',
      win: true
    },
    reward: {
      money: 10000,
      reputation: 80,
      risk: { damage: 30 }
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['globalCartel']
  },
  globalCartel: {
    id: 'globalCartel',
    title: 'Global Cartel',
    description: 'Sell 300 cocaine globally.',
    requirement: {
      type: 'sell',
      drug: 'cocaine',
      amount: 300,
      location: 'international'
    },
    reward: {
      money: 12000,
      reputation: 90
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['cocaineMonopoly']
  },
  cocaineMonopoly: {
    id: 'cocaineMonopoly',
    title: 'Cocaine Monopoly',
    description: 'Sell 400 cocaine to control the market.',
    requirement: {
      type: 'sell',
      drug: 'cocaine',
      amount: 400,
      location: 'any'
    },
    reward: {
      money: 15000,
      reputation: 100
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['politicalPowerCocaine']
  },
  politicalPowerCocaine: {
    id: 'politicalPowerCocaine',
    title: 'Political Power',
    description: 'Invest $25,000 in political influence.',
    requirement: {
      type: 'invest',
      amount: 25000,
      target: 'politics'
    },
    reward: {
      reputation: 110,
      riskReduction: true
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['cocaineDynasty']
  },
  cocaineDynasty: {
    id: 'cocaineDynasty',
    title: 'Cocaine Dynasty',
    description: 'Accumulate $100,000 from cocaine.',
    requirement: {
      type: 'accumulate',
      resource: 'money',
      amount: 100000
    },
    reward: {
      money: 20000,
      reputation: 120
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['cocaineInnovation']
  },
  cocaineInnovation: {
    id: 'cocaineInnovation',
    title: 'Innovation',
    description: 'Sell 500 cocaine with new methods.',
    requirement: {
      type: 'sell',
      drug: 'cocaine',
      amount: 500,
      location: 'any'
    },
    reward: {
      money: 25000,
      reputation: 130
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['marketControlCocaine']
  },
  marketControlCocaine: {
    id: 'marketControlCocaine',
    title: 'Market Control',
    description: 'Invest $30,000 to manipulate prices.',
    requirement: {
      type: 'invest',
      amount: 30000,
      target: 'marketControl'
    },
    reward: {
      money: 30000,
      reputation: 140
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['cocaineMagnate']
  },
  cocaineMagnate: {
    id: 'cocaineMagnate',
    title: 'Cocaine Magnate',
    description: 'Accumulate $200,000 from cocaine.',
    requirement: {
      type: 'accumulate',
      resource: 'money',
      amount: 200000
    },
    reward: {
      money: 40000,
      reputation: 150
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['cocaineLegacy']
  },
  cocaineLegacy: {
    id: 'cocaineLegacy',
    title: 'Legacy',
    description: 'Sell 1000 cocaine to secure your empire.',
    requirement: {
      type: 'sell',
      drug: 'cocaine',
      amount: 1000,
      location: 'any'
    },
    reward: {
      money: 50000,
      reputation: 200
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['cocaineLegend']
  },
  cocaineLegend: {
    id: 'cocaineLegend',
    title: 'Cocaine Legend',
    description: 'Become the ultimate cocaine lord.',
    requirement: {
      type: 'accumulate',
      resource: 'reputation',
      amount: 500
    },
    reward: {
      money: 100000,
      title: 'Cocaine Legend'
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: []
  },

  // Nightclub Path (25 Quests)
  nightclubNovice: {
    id: 'nightclubNovice',
    title: 'Nightclub Novice',
    description: 'Invest $2000 to buy a small nightclub.',
    requirement: {
      type: 'invest',
      amount: 2000,
      target: 'nightclub'
    },
    reward: {
      passiveIncome: 100
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['upgradeClub']
  },
  upgradeClub: {
    id: 'upgradeClub',
    title: 'Upgrade Club',
    description: 'Invest $5000 to improve your nightclub.',
    requirement: {
      type: 'invest',
      amount: 5000,
      target: 'nightclubUpgrade'
    },
    reward: {
      passiveIncome: 200
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['hireSecurity']
  },
  hireSecurity: {
    id: 'hireSecurity',
    title: 'Hire Security',
    description: 'Pay $3000 for security personnel.',
    requirement: {
      type: 'invest',
      amount: 3000,
      target: 'security'
    },
    reward: {
      riskReduction: true
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['exclusiveEvents']
  },
  exclusiveEvents: {
    id: 'exclusiveEvents',
    title: 'Exclusive Events',
    description: 'Invest $4000 in special events.',
    requirement: {
      type: 'invest',
      amount: 4000,
      target: 'events'
    },
    reward: {
      money: 6000,
      reputation: 30
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['undergroundDeals']
  },
  undergroundDeals: {
    id: 'undergroundDeals',
    title: 'Underground Deals',
    description: 'Sell 20 drugs through your club.',
    requirement: {
      type: 'sell',
      drug: 'any',
      amount: 20,
      location: 'nightclub'
    },
    reward: {
      money: 2000,
      reputation: 20
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['expandFranchise']
  },
  expandFranchise: {
    id: 'expandFranchise',
    title: 'Expand Franchise',
    description: 'Invest $10,000 in a second nightclub.',
    requirement: {
      type: 'invest',
      amount: 10000,
      target: 'nightclub'
    },
    reward: {
      passiveIncome: 300
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['celebEndorsementClub']
  },
  celebEndorsementClub: {
    id: 'celebEndorsementClub',
    title: 'Celebrity Endorsement',
    description: 'Pay $8000 for a celebrity to promote your club.',
    requirement: {
      type: 'invest',
      amount: 8000,
      target: 'celebrity'
    },
    reward: {
      money: 10000,
      reputation: 40
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['vipSection']
  },
  vipSection: {
    id: 'vipSection',
    title: 'VIP Section',
    description: 'Invest $6000 in a VIP area.',
    requirement: {
      type: 'invest',
      amount: 6000,
      target: 'vip'
    },
    reward: {
      passiveIncome: 400
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['musicFestival']
  },
  musicFestival: {
    id: 'musicFestival',
    title: 'Music Festival',
    description: 'Invest $15,000 in a festival.',
    requirement: {
      type: 'invest',
      amount: 15000,
      target: 'festival'
    },
    reward: {
      money: 20000,
      reputation: 50
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['nightclubMogul']
  },
  nightclubMogul: {
    id: 'nightclubMogul',
    title: 'Nightclub Mogul',
    description: 'Accumulate $50,000 from club income.',
    requirement: {
      type: 'accumulate',
      resource: 'money',
      amount: 50000
    },
    reward: {
      money: 15000,
      reputation: 60
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['themedNights']
  },
  themedNights: {
    id: 'themedNights',
    title: 'Themed Nights',
    description: 'Invest $7000 in themed events.',
    requirement: {
      type: 'invest',
      amount: 7000,
      target: 'themes'
    },
    reward: {
      passiveIncome: 500
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['marketingCampaign']
  },
  marketingCampaign: {
    id: 'marketingCampaign',
    title: 'Marketing Campaign',
    description: 'Spend $10,000 on marketing.',
    requirement: {
      type: 'invest',
      amount: 10000,
      target: 'marketing'
    },
    reward: {
      money: 15000,
      reputation: 70
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['staffTraining']
  },
  staffTraining: {
    id: 'staffTraining',
    title: 'Staff Training',
    description: 'Invest $5000 in staff training.',
    requirement: {
      type: 'invest',
      amount: 5000,
      target: 'training'
    },
    reward: {
      passiveIncome: 600
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['exclusiveMembership']
  },
  exclusiveMembership: {
    id: 'exclusiveMembership',
    title: 'Exclusive Membership',
    description: 'Sell 50 memberships via your club.',
    requirement: {
      type: 'sell',
      drug: 'membership',
      amount: 50,
      location: 'nightclub'
    },
    reward: {
      money: 12000,
      reputation: 80
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['clubNetwork']
  },
  clubNetwork: {
    id: 'clubNetwork',
    title: 'Club Network',
    description: 'Invest $20,000 in a club network.',
    requirement: {
      type: 'invest',
      amount: 20000,
      target: 'network'
    },
    reward: {
      passiveIncome: 800
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['brandPartnerships']
  },
  brandPartnerships: {
    id: 'brandPartnerships',
    title: 'Brand Partnerships',
    description: 'Spend $15,000 on partnerships.',
    requirement: {
      type: 'invest',
      amount: 15000,
      target: 'partnerships'
    },
    reward: {
      money: 20000,
      reputation: 90
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['globalBrand']
  },
  globalBrand: {
    id: 'globalBrand',
    title: 'Global Brand',
    description: 'Invest $25,000 to go global.',
    requirement: {
      type: 'invest',
      amount: 25000,
      target: 'globalBrand'
    },
    reward: {
      passiveIncome: 1000
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['entertainmentEmpire']
  },
  entertainmentEmpire: {
    id: 'entertainmentEmpire',
    title: 'Entertainment Empire',
    description: 'Accumulate $100,000 from clubs.',
    requirement: {
      type: 'accumulate',
      resource: 'money',
      amount: 100000
    },
    reward: {
      money: 30000,
      reputation: 100
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['luxuryExperience']
  },
  luxuryExperience: {
    id: 'luxuryExperience',
    title: 'Luxury Experience',
    description: 'Invest $30,000 in luxury services.',
    requirement: {
      type: 'invest',
      amount: 30000,
      target: 'luxury'
    },
    reward: {
      passiveIncome: 1200
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['nightclubInnovator']
  },
  nightclubInnovator: {
    id: 'nightclubInnovator',
    title: 'Nightclub Innovator',
    description: 'Spend $20,000 on new concepts.',
    requirement: {
      type: 'invest',
      amount: 20000,
      target: 'innovation'
    },
    reward: {
      money: 35000,
      reputation: 110
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['culturalIcon']
  },
  culturalIcon: {
    id: 'culturalIcon',
    title: 'Cultural Icon',
    description: 'Invest $40,000 to become a landmark.',
    requirement: {
      type: 'invest',
      amount: 40000,
      target: 'icon'
    },
    reward: {
      passiveIncome: 1500
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['clubPhilanthropy']
  },
  clubPhilanthropy: {
    id: 'clubPhilanthropy',
    title: 'Philanthropy',
    description: 'Donate $50,000 to charity.',
    requirement: {
      type: 'invest',
      amount: 50000,
      target: 'charity'
    },
    reward: {
      reputation: 120
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['politicalConnectionsClub']
  },
  politicalConnectionsClub: {
    id: 'politicalConnectionsClub',
    title: 'Political Connections',
    description: 'Invest $60,000 in politics.',
    requirement: {
      type: 'invest',
      amount: 60000,
      target: 'politics'
    },
    reward: {
      money: 40000,
      reputation: 130
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['nightclubDynasty']
  },
  nightclubDynasty: {
    id: 'nightclubDynasty',
    title: 'Nightclub Dynasty',
    description: 'Accumulate $200,000 from clubs.',
    requirement: {
      type: 'accumulate',
      resource: 'money',
      amount: 200000
    },
    reward: {
      money: 50000,
      reputation: 150
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['nightclubLegend']
  },
  nightclubLegend: {
    id: 'nightclubLegend',
    title: 'Nightclub Legend',
    description: 'Become the ultimate club owner.',
    requirement: {
      type: 'accumulate',
      resource: 'reputation',
      amount: 500
    },
    reward: {
      money: 100000,
      title: 'Nightclub Legend'
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: []
  },

  // Mining Path (25 Quests)
  bitcoinBeginner: {
    id: 'bitcoinBeginner',
    title: 'Bitcoin Beginner',
    description: 'Invest $1000 to set up an illegal Bitcoin mine.',
    requirement: {
      type: 'invest',
      amount: 1000,
      target: 'bitcoinMine'
    },
    reward: {
      passiveBTC: 0.01 // 0.01 BTC per turn
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['powerManagement']
  },
  powerManagement: {
    id: 'powerManagement',
    title: 'Power Management',
    description: 'Invest $2000 in efficient hardware.',
    requirement: {
      type: 'invest',
      amount: 2000,
      target: 'power'
    },
    reward: {
      riskReduction: true
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['expandMining']
  },
  expandMining: {
    id: 'expandMining',
    title: 'Expand Operation',
    description: 'Invest $3000 in more mining rigs.',
    requirement: {
      type: 'invest',
      amount: 3000,
      target: 'rigs'
    },
    reward: {
      passiveBTC: 0.02
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['coolingSolutions']
  },
  coolingSolutions: {
    id: 'coolingSolutions',
    title: 'Cooling Solutions',
    description: 'Invest $2500 in cooling systems.',
    requirement: {
      type: 'invest',
      amount: 2500,
      target: 'cooling'
    },
    reward: {
      passiveBTC: 0.03
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['hackersBeware']
  },
  hackersBeware: {
    id: 'hackersBeware',
    title: 'Hackers Beware',
    description: 'Invest $4000 in cybersecurity.',
    requirement: {
      type: 'invest',
      amount: 4000,
      target: 'security'
    },
    reward: {
      riskReduction: true
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['miningPool']
  },
  miningPool: {
    id: 'miningPool',
    title: 'Mining Pool',
    description: 'Join a mining pool for better rewards.',
    requirement: {
      type: 'invest',
      amount: 5000,
      target: 'pool'
    },
    reward: {
      passiveBTC: 0.05
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['renewableEnergy']
  },
  renewableEnergy: {
    id: 'renewableEnergy',
    title: 'Renewable Energy',
    description: 'Invest $6000 in solar power.',
    requirement: {
      type: 'invest',
      amount: 6000,
      target: 'renewable'
    },
    reward: {
      passiveBTC: 0.06
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['overclocking']
  },
  overclocking: {
    id: 'overclocking',
    title: 'Overclocking',
    description: 'Overclock rigs for a boost.',
    requirement: {
      type: 'invest',
      amount: 3000,
      target: 'overclock'
    },
    reward: {
      passiveBTC: 0.08,
      risk: { damage: 20 } // Risk of failure
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['asicUpgrade']
  },
  asicUpgrade: {
    id: 'asicUpgrade',
    title: 'ASIC Upgrade',
    description: 'Invest $10,000 in ASIC miners.',
    requirement: {
      type: 'invest',
      amount: 10000,
      target: 'asic'
    },
    reward: {
      passiveBTC: 0.1
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['cryptoTycoon']
  },
  cryptoTycoon: {
    id: 'cryptoTycoon',
    title: 'Crypto Tycoon',
    description: 'Accumulate 5 BTC.',
    requirement: {
      type: 'accumulate',
      resource: 'btc',
      amount: 5
    },
    reward: {
      money: 20000,
      reputation: 60
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['advancedCooling']
  },
  advancedCooling: {
    id: 'advancedCooling',
    title: 'Advanced Cooling',
    description: 'Invest $12,000 in advanced cooling.',
    requirement: {
      type: 'invest',
      amount: 12000,
      target: 'cooling'
    },
    reward: {
      passiveBTC: 0.12
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['miningFarm']
  },
  miningFarm: {
    id: 'miningFarm',
    title: 'Mining Farm',
    description: 'Invest $15,000 in a large farm.',
    requirement: {
      type: 'invest',
      amount: 15000,
      target: 'farm'
    },
    reward: {
      passiveBTC: 0.15
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['energyEfficiency']
  },
  energyEfficiency: {
    id: 'energyEfficiency',
    title: 'Energy Efficiency',
    description: 'Invest $10,000 in efficiency upgrades.',
    requirement: {
      type: 'invest',
      amount: 10000,
      target: 'efficiency'
    },
    reward: {
      passiveBTC: 0.18
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['securityUpgrade']
  },
  securityUpgrade: {
    id: 'securityUpgrade',
    title: 'Security Upgrade',
    description: 'Invest $8000 in enhanced security.',
    requirement: {
      type: 'invest',
      amount: 8000,
      target: 'security'
    },
    reward: {
      riskReduction: true
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['blockchainExpert']
  },
  blockchainExpert: {
    id: 'blockchainExpert',
    title: 'Blockchain Expert',
    description: 'Accumulate 10 BTC.',
    requirement: {
      type: 'accumulate',
      resource: 'btc',
      amount: 10
    },
    reward: {
      money: 30000,
      reputation: 80
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['cryptoExchange']
  },
  cryptoExchange: {
    id: 'cryptoExchange',
    title: 'Crypto Exchange',
    description: 'Invest $20,000 in your own exchange.',
    requirement: {
      type: 'invest',
      amount: 20000,
      target: 'exchange'
    },
    reward: {
      passiveBTC: 0.2
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['miningSoftware']
  },
  miningSoftware: {
    id: 'miningSoftware',
    title: 'Mining Software',
    description: 'Invest $15,000 in custom software.',
    requirement: {
      type: 'invest',
      amount: 15000,
      target: 'software'
    },
    reward: {
      passiveBTC: 0.25
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['globalMiningNetwork']
  },
  globalMiningNetwork: {
    id: 'globalMiningNetwork',
    title: 'Global Mining Network',
    description: 'Invest $25,000 globally.',
    requirement: {
      type: 'invest',
      amount: 25000,
      target: 'globalNetwork'
    },
    reward: {
      passiveBTC: 0.3
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['cryptoInfluencer']
  },
  cryptoInfluencer: {
    id: 'cryptoInfluencer',
    title: 'Crypto Influencer',
    description: 'Accumulate 20 BTC.',
    requirement: {
      type: 'accumulate',
      resource: 'btc',
      amount: 20
    },
    reward: {
      money: 40000,
      reputation: 100
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['miningInnovator']
  },
  miningInnovator: {
    id: 'miningInnovator',
    title: 'Mining Innovator',
    description: 'Invest $30,000 in new tech.',
    requirement: {
      type: 'invest',
      amount: 30000,
      target: 'innovation'
    },
    reward: {
      passiveBTC: 0.4
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['cryptoWealth']
  },
  cryptoWealth: {
    id: 'cryptoWealth',
    title: 'Crypto Wealth',
    description: 'Accumulate 50 BTC.',
    requirement: {
      type: 'accumulate',
      resource: 'btc',
      amount: 50
    },
    reward: {
      money: 50000,
      reputation: 120
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['miningPhilanthropy']
  },
  miningPhilanthropy: {
    id: 'miningPhilanthropy',
    title: 'Philanthropy',
    description: 'Donate $50,000 to charity.',
    requirement: {
      type: 'invest',
      amount: 50000,
      target: 'charity'
    },
    reward: {
      reputation: 130
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['miningLobbying']
  },
  miningLobbying: {
    id: 'miningLobbying',
    title: 'Political Lobbying',
    description: 'Invest $60,000 in crypto laws.',
    requirement: {
      type: 'invest',
      amount: 60000,
      target: 'lobbying'
    },
    reward: {
      money: 60000,
      reputation: 140
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['miningLegacy']
  },
  miningLegacy: {
    id: 'miningLegacy',
    title: 'Mining Legacy',
    description: 'Accumulate 100 BTC.',
    requirement: {
      type: 'accumulate',
      resource: 'btc',
      amount: 100
    },
    reward: {
      money: 80000,
      reputation: 150
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: ['miningLegend']
  },
  miningLegend: {
    id: 'miningLegend',
    title: 'Mining Legend',
    description: 'Become the ultimate crypto miner.',
    requirement: {
      type: 'accumulate',
      resource: 'reputation',
      amount: 500
    },
    reward: {
      money: 100000,
      title: 'Mining Legend'
    },
    progress: 0,
    completed: false,
    unlocked: false,
    nextQuests: []
  }
};

const initialState = {
  quests: questData,
  activeQuestIds: ['smallTimeDealer'],
  completedQuestIds: []
};

export const questSlice = createSlice({
  name: 'quests',
  initialState,
  reducers: {
    updateQuestProgress: (state, action) => {
      const { questId, progress } = action.payload;
      
      if (state.quests[questId]) {
        state.quests[questId].progress = progress;
        
        if (progress >= state.quests[questId].requirement.amount && !state.quests[questId].completed) {
          state.quests[questId].completed = true;
          state.completedQuestIds.push(questId);
          
          state.activeQuestIds = state.activeQuestIds.filter(id => id !== questId);
          
          state.quests[questId].nextQuests.forEach(nextQuestId => {
            if (state.quests[nextQuestId]) {
              state.quests[nextQuestId].unlocked = true;
              state.activeQuestIds.push(nextQuestId);
            }
          });
        }
      }
    },
    resetQuests: () => initialState,
    loadQuestState: (state, action) => {
      return { ...action.payload };
    }
  }
});

export const { 
  updateQuestProgress, 
  resetQuests,
  loadQuestState
} = questSlice.actions;

export default questSlice.reducer;
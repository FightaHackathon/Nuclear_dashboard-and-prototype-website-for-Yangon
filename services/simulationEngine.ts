
// Core simulation engine for the nuclear power plant dashboard

// Types definitions for different metrics
export interface ReactorMetrics {
  coreTemperature: number; // in Celsius
  primaryLoopPressure: number; // in MPa
  coolantFlowRate: number; // in m³/h
  fuelBurnup: number; // percentage
  controlRodPositions: number[]; // percentage inserted (0-100)
  containmentPressure: number; // in kPa
  radiationLevel: number; // in mSv/h
  scramStatus: boolean;
  timeLastUpdated: Date;
}

export interface EnergyMixData {
  nuclear: number; // in MW
  fossil: number; // in MW
  hydro: number; // in MW
  demand: number; // in MW
  co2Avoided: number; // in tons
  timeLastUpdated: Date;
}

export interface ThermalEfficiencyData {
  heatRate: number; // in BTU/kWh
  turbineEfficiency: number; // percentage
  condenserVacuum: number; // in kPa
  feedwaterTemperature: number; // in Celsius
  ambientTemperature: number; // in Celsius
  coolingTowerEfficiency: number; // percentage
  timeLastUpdated: Date;
}

export interface WasteManagementData {
  fuelUsagePercentage: number; // percentage
  spentFuelPoolCapacity: number; // percentage
  spentFuelTemperature: number; // in Celsius
  dryCaskOccupancy: number; // number of casks filled
  wasteRadiationLevel: number; // in mSv/h
  timeLastUpdated: Date;
}

// Default starting values
const defaultReactorMetrics: ReactorMetrics = {
  coreTemperature: 320,
  primaryLoopPressure: 15.5,
  coolantFlowRate: 55000,
  fuelBurnup: 34,
  controlRodPositions: [60, 60, 60, 60, 60, 60], // Start at nominal
  containmentPressure: 101.3,
  radiationLevel: 0.12,
  scramStatus: false,
  timeLastUpdated: new Date(),
};

const defaultEnergyMix: EnergyMixData = {
  nuclear: 1000,
  fossil: 300,
  hydro: 400,
  demand: 1700,
  co2Avoided: 1450,
  timeLastUpdated: new Date(),
};

const defaultThermalEfficiency: ThermalEfficiencyData = {
  heatRate: 10200,
  turbineEfficiency: 92,
  condenserVacuum: 5.1,
  feedwaterTemperature: 220,
  ambientTemperature: 25,
  coolingTowerEfficiency: 85,
  timeLastUpdated: new Date(),
};

const defaultWasteManagement: WasteManagementData = {
  fuelUsagePercentage: 34,
  spentFuelPoolCapacity: 45,
  spentFuelTemperature: 38,
  dryCaskOccupancy: 12,
  wasteRadiationLevel: 2.3,
  timeLastUpdated: new Date(),
};

// Alert thresholds
export const alertThresholds = {
  highCoreTemperature: 340, // Celsius
  highPrimaryPressure: 16.0, // MPa
  lowCoolantFlow: 50000, // m³/h
  highRadiation: 0.5, // mSv/h
  highContainmentPressure: 110, // kPa
};

// State variables
let currentReactorMetrics: ReactorMetrics = { ...defaultReactorMetrics };
let currentEnergyMix: EnergyMixData = { ...defaultEnergyMix };
let currentThermalEfficiency: ThermalEfficiencyData = { ...defaultThermalEfficiency };
let currentWasteManagement: WasteManagementData = { ...defaultWasteManagement };
let simulationMode: "live" | "training" = "live";
let emergencyScenarioActive = false;
let emergencyScenarioType: string | null = null;
let simulationTimeMultiplier = 1; // For accelerated simulation
let lastRodInterventionTime = 0; // Track when user last moved rods to pause random logic

// Helper function for controlled random changes
function controlledRandomChange(current: number, min: number, max: number, volatility: number): number {
  const change = ((Math.random() * 2) - 1) * volatility;
  let newValue = current + change;
  if (newValue < min) newValue = min;
  if (newValue > max) newValue = max;
  return parseFloat(newValue.toFixed(2));
}

// Helper to calculate physics based on rod position
function calculatePhysicsFromRods(currentMetrics: ReactorMetrics) {
  // Calculate average rod insertion (0-100)
  const totalInsertion = currentMetrics.controlRodPositions.reduce((sum, pos) => sum + pos, 0);
  const avgInsertion = totalInsertion / currentMetrics.controlRodPositions.length;

  // PHYSICS MODEL:
  // Nominal insertion is 60%.
  // Lower insertion (<60%) = Higher Reactivity = Higher Temp/Pressure
  // Higher insertion (>60%) = Lower Reactivity = Lower Temp/Pressure
  
  // Target Temperature based on rods:
  // 0% insertion (dangerous) -> Target 360°C
  // 60% insertion (nominal) -> Target 320°C
  // 100% insertion (shut down) -> Target 280°C
  const targetTemp = 360 - (avgInsertion * 0.8); 

  // Move current temp towards target temp (Thermal Inertia)
  const tempDifference = targetTemp - currentMetrics.coreTemperature;
  // INCREASED RESPONSIVENESS: 20% move per tick (was 5%) for better presentation
  const tempChange = tempDifference * 0.2; 

  let newTemp = currentMetrics.coreTemperature + tempChange;

  // Pressure follows Temperature (PV = nRT roughly)
  // Target Pressure maps to Temp: 320c -> 15.5MPa
  const targetPressure = 15.5 + (newTemp - 320) * 0.1;
  const pressureDifference = targetPressure - currentMetrics.primaryLoopPressure;
  // INCREASED RESPONSIVENESS: 20% move per tick (was 10%)
  const pressureChange = pressureDifference * 0.2;

  let newPressure = currentMetrics.primaryLoopPressure + pressureChange;

  return { newTemp, newPressure, avgInsertion };
}

// Simulation update function for reactor metrics
export function updateReactorMetrics(): ReactorMetrics {
  // Skip updates if in training mode
  if (simulationMode === "training") return currentReactorMetrics;

  const baseVolatility = emergencyScenarioActive ? 2.0 : 0.1; 
  
  // 1. Calculate Physics driven by Control Rods
  const physics = calculatePhysicsFromRods(currentReactorMetrics);
  
  // Add small stochastic noise to the physics-calculated values
  let newCoreTemp = controlledRandomChange(physics.newTemp, 200, 400, baseVolatility);
  let newPressure = controlledRandomChange(physics.newPressure, 10, 20, baseVolatility * 0.1);

  // 3. Coolant Flow (Drifts around 55000)
  let coolantFlow = controlledRandomChange(
    currentReactorMetrics.coolantFlowRate, 
    emergencyScenarioActive && emergencyScenarioType === 'LOCA' ? 40000 : 54000, 
    56000, 
    baseVolatility * 100
  );
  
  // 4. Fuel Burnup (Slowly increases)
  let burnup = currentReactorMetrics.fuelBurnup;
  if (Math.random() > 0.95) { 
    burnup += simulationTimeMultiplier * 0.01;
    if (burnup > 100) burnup = 100;
  }
  
  // 5. Rod Drift (Random movement ONLY if user hasn't touched them recently)
  const now = Date.now();
  const newRodPositions = [...currentReactorMetrics.controlRodPositions];
  if (now - lastRodInterventionTime > 15000 && Math.random() > 0.98) {
     // Auto-regulation: If temp is too high, insert rods slightly. If too low, pull out.
     const avgPos = physics.avgInsertion;
     const driftDirection = newCoreTemp > 325 ? 1 : (newCoreTemp < 315 ? -1 : 0);
     
     if (driftDirection !== 0) {
        // Adjust a random rod to stabilize
        const rodIndex = Math.floor(Math.random() * newRodPositions.length);
        newRodPositions[rodIndex] += driftDirection;
        // Clamp
        if (newRodPositions[rodIndex] > 100) newRodPositions[rodIndex] = 100;
        if (newRodPositions[rodIndex] < 0) newRodPositions[rodIndex] = 0;
     }
  }
  
  // 6. Radiation & Containment
  // Radiation increases if Temp/Pressure is high (stressed core)
  let radTarget = 0.12;
  if (newCoreTemp > 330) radTarget = 0.3;
  if (newCoreTemp > 350) radTarget = 0.8;
  
  let radiationLevel = currentReactorMetrics.radiationLevel + (radTarget - currentReactorMetrics.radiationLevel) * 0.1; // Faster radiation update too
  radiationLevel = controlledRandomChange(radiationLevel, 0.1, 5.0, 0.005);

  let containmentPressure = controlledRandomChange(currentReactorMetrics.containmentPressure, 101, 102, 0.1);

  // 7. Emergency Override (Only if explicitly triggered)
  if (emergencyScenarioActive) {
      if (emergencyScenarioType === 'LOCA') {
          // Loss of Coolant: Pressure drops, Temp spikes
          newPressure = controlledRandomChange(newPressure, 10, 14, 0.5);
          newCoreTemp = controlledRandomChange(newCoreTemp, 340, 360, 1.0);
          containmentPressure = controlledRandomChange(containmentPressure, 105, 120, 1.0);
          radiationLevel = controlledRandomChange(radiationLevel, 0.4, 0.8, 0.05);
      }
  }
  
  // 8. SCRAM Logic
  const scramNeeded = 
    newCoreTemp > alertThresholds.highCoreTemperature ||
    newPressure > alertThresholds.highPrimaryPressure ||
    coolantFlow < alertThresholds.lowCoolantFlow ||
    radiationLevel > alertThresholds.highRadiation ||
    containmentPressure > alertThresholds.highContainmentPressure;
  
  // Update the current state
  currentReactorMetrics = {
    coreTemperature: parseFloat(newCoreTemp.toFixed(2)),
    primaryLoopPressure: parseFloat(newPressure.toFixed(2)),
    coolantFlowRate: coolantFlow,
    fuelBurnup: burnup,
    controlRodPositions: newRodPositions,
    containmentPressure: containmentPressure,
    radiationLevel: parseFloat(radiationLevel.toFixed(3)),
    scramStatus: scramNeeded,
    timeLastUpdated: new Date()
  };
  
  return { ...currentReactorMetrics };
}

// Simulation update function for energy mix
export function updateEnergyMix(userDemand: number): EnergyMixData {
  if (simulationMode === "training") return currentEnergyMix;

  // STRICT Validation: Ensure userDemand is treated as a number
  const numericDemand = Number(userDemand);
  const safeDemand = (!isNaN(numericDemand) && numericDemand > 0) ? numericDemand : 1700;

  // Add some noise to the user setting to simulate real grid fluctuations
  const demandNoise = (Math.random() - 0.5) * 30; // +/- 15 MW fluctuation
  let demand = safeDemand + demandNoise;

  // Base generation (steady)
  let hydro = controlledRandomChange(currentEnergyMix.hydro, 380, 420, 2);
  
  // Nuclear output - NOW LINKED TO REACTOR PHYSICS
  // Nominal 320C = ~1000MW.
  // 280C (Shutdown) = 0MW
  // 360C (Danger) = ~1200MW (but likely SCRAMs)
  
  let nuclearTarget = 0;
  
  if (!currentReactorMetrics.scramStatus) {
      // Map Temp 280-340 range to 0-1100 MW
      const tempDelta = currentReactorMetrics.coreTemperature - 280;
      // If temp < 280, power is 0.
      const mwPerDegree = 1000 / 40; // 40 degrees difference (320-280) gives 1000MW
      nuclearTarget = tempDelta * mwPerDegree;
      
      // Clamp logic
      if (nuclearTarget < 0) nuclearTarget = 0;
      if (nuclearTarget > 1200) nuclearTarget = 1200;
  } else {
    nuclearTarget = 0; // SCRAM means control rods drop, power dies
  }
  
  // Smooth transition to target
  let nuclear = currentEnergyMix.nuclear + (nuclearTarget - currentEnergyMix.nuclear) * 0.2; // Faster transition
  // Add small operational noise
  nuclear = controlledRandomChange(nuclear, nuclearTarget - 10, nuclearTarget + 10, 2);

  // Fossil fuel fills the gap
  // If Nuclear drops (due to control rods), Fossil MUST increase to keep lights on
  const renewableTotal = nuclear + hydro;
  let fossil = demand - renewableTotal;
  
  // Sanitize numbers to avoid NaN/Infinity
  const safe = (v: number, def = 0) => (Number.isFinite(v) ? v : def);
  demand = safe(demand, 1700);
  nuclear = safe(nuclear, 1000);
  hydro = safe(hydro, 400);
  fossil = safe(fossil, 0);
  
  // Ensure fossil is never negative and is a valid number
  if (isNaN(fossil) || fossil < 0) fossil = 0;
  
  // Calculate CO2 avoided
  const carbonFreeGen = nuclear + hydro;
  const gasGen = fossil;
  const co2Avoided = parseFloat(((carbonFreeGen * 1.0) + (gasGen * 0.5)).toFixed(0));
  
  currentEnergyMix = {
    nuclear: Math.max(0, parseFloat(nuclear.toFixed(0))),
    fossil: Math.max(0, parseFloat(fossil.toFixed(0))),
    hydro: Math.max(0, parseFloat(hydro.toFixed(0))),
    demand: Math.max(0, parseFloat(demand.toFixed(0))),
    co2Avoided,
    timeLastUpdated: new Date()
  };
  
  return { ...currentEnergyMix };
}

// Control functions for the simulation
export function setSimulationMode(mode: "live" | "training"): void {
  simulationMode = mode;
}

export function getSimulationMode(): "live" | "training" {
  return simulationMode;
}

export function activateEmergencyScenario(scenario: string): void {
  emergencyScenarioActive = true;
  emergencyScenarioType = scenario;
}

export function deactivateEmergencyScenario(): void {
  emergencyScenarioActive = false;
  emergencyScenarioType = null;
}

export function getEmergencyScenarioStatus(): { active: boolean, type: string | null } {
  return {
    active: emergencyScenarioActive,
    type: emergencyScenarioType
  };
}

export function setSimulationTimeMultiplier(multiplier: number): void {
  simulationTimeMultiplier = multiplier;
}

export function resetToDefaults(): void {
  currentReactorMetrics = { ...defaultReactorMetrics };
  currentEnergyMix = { ...defaultEnergyMix };
  currentThermalEfficiency = { ...defaultThermalEfficiency };
  currentWasteManagement = { ...defaultWasteManagement };
  deactivateEmergencyScenario();
}

export function setManualControlRodPosition(index: number, position: number): void {
  if (index >= 0 && index < currentReactorMetrics.controlRodPositions.length) {
    const newPositions = [...currentReactorMetrics.controlRodPositions];
    newPositions[index] = position;
    currentReactorMetrics.controlRodPositions = newPositions;
    lastRodInterventionTime = Date.now(); // Reset manual override timer
  }
}

// Initial data getters
export function getInitialReactorMetrics(): ReactorMetrics {
  return { ...currentReactorMetrics };
}

export function getInitialEnergyMix(): EnergyMixData {
  return { ...currentEnergyMix };
}

export function getInitialThermalEfficiency(): ThermalEfficiencyData {
  return { ...currentThermalEfficiency };
}

export function getInitialWasteManagement(): WasteManagementData {
  return { ...currentWasteManagement };
}

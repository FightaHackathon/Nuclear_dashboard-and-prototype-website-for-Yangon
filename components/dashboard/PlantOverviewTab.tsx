import React, { useState, useEffect } from "react";
import MetricCard from "./MetricCard";
import Gauge from "./Gauge";
import ControlRods from "./ControlRods";
import { Thermometer, Gauge as GaugeIcon, Droplet, BarChart3, Radiation, AlertTriangle } from "lucide-react";
import { ReactorMetrics, alertThresholds, updateReactorMetrics, getInitialReactorMetrics } from "../../services/simulationEngine";
import { DashboardContent } from "../../types";

interface PlantOverviewTabProps {
  content: DashboardContent['overview'];
}

export default function PlantOverviewTab({ content }: PlantOverviewTabProps) {
  const [reactorData, setReactorData] = useState<ReactorMetrics>(getInitialReactorMetrics());
  
  useEffect(() => {
    // Increased update frequency to 1s for better responsiveness during manual override
    const interval = setInterval(() => {
      const updatedData = updateReactorMetrics();
      setReactorData(updatedData);
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Helper function to determine status based on thresholds
  const getStatus = (value: number, warningThreshold: number, dangerThreshold: number) => {
    if (value >= dangerThreshold) return "danger";
    if (value >= warningThreshold) return "warning";
    return "normal";
  };
  
  const coreTemperatureStatus = getStatus(
    reactorData.coreTemperature, 
    alertThresholds.highCoreTemperature - 10, 
    alertThresholds.highCoreTemperature
  );
  
  const pressureStatus = getStatus(
    reactorData.primaryLoopPressure, 
    alertThresholds.highPrimaryPressure - 0.3, 
    alertThresholds.highPrimaryPressure
  );
  
  const coolantStatus = reactorData.coolantFlowRate < alertThresholds.lowCoolantFlow + 2000 
    ? reactorData.coolantFlowRate < alertThresholds.lowCoolantFlow 
      ? "danger" 
      : "warning"
    : "normal";
  
  const radiationStatus = getStatus(
    reactorData.radiationLevel, 
    alertThresholds.highRadiation / 2, 
    alertThresholds.highRadiation
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
        <div>
          <h2 className="text-xl font-bold text-white">{content.title}</h2>
          <p className="text-sm text-gray-400">{content.subtitle}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className={`px-3 py-1.5 rounded-full border flex items-center gap-2 ${reactorData.scramStatus ? 'bg-red-900/20 border-red-500/50 text-red-400' : 'bg-green-900/20 border-green-500/50 text-green-400'}`}>
            {reactorData.scramStatus && <AlertTriangle className="h-4 w-4" />}
            <span className="text-sm font-bold tracking-wider">{reactorData.scramStatus ? content.scramActive : content.systemNominal}</span>
          </div>
        </div>
      </div>
      
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard 
          title={content.metrics.coreTemp}
          value={reactorData.coreTemperature.toFixed(1)}
          unit="°C"
          icon={<Thermometer className="h-4 w-4" />}
          status={coreTemperatureStatus}
          lastUpdated={reactorData.timeLastUpdated}
          tooltipContent={
            <div className="space-y-1">
              <p className="font-bold text-white">{content.metrics.coreTemp}</p>
              <p className="text-xs">Normal: 315°C - 330°C</p>
              <p className="text-xs text-yellow-400">Warning: &gt;{alertThresholds.highCoreTemperature - 10}°C</p>
              <p className="text-xs text-red-400">Critical: &gt;{alertThresholds.highCoreTemperature}°C</p>
            </div>
          }
        />
        
        <MetricCard 
          title={content.metrics.pressure}
          value={reactorData.primaryLoopPressure.toFixed(2)}
          unit="MPa"
          icon={<GaugeIcon className="h-4 w-4" />}
          status={pressureStatus}
          lastUpdated={reactorData.timeLastUpdated}
          tooltipContent={
            <div className="space-y-1">
              <p className="font-bold text-white">{content.metrics.pressure}</p>
              <p className="text-xs">Normal: 15.0 - 15.7 MPa</p>
              <p className="text-xs text-yellow-400">Warning: &gt;{alertThresholds.highPrimaryPressure - 0.3} MPa</p>
              <p className="text-xs text-red-400">Critical: &gt;{alertThresholds.highPrimaryPressure} MPa</p>
            </div>
          }
        />
        
        <MetricCard 
          title={content.metrics.flowRate}
          value={Math.round(reactorData.coolantFlowRate).toLocaleString()}
          unit="m³/h"
          icon={<Droplet className="h-4 w-4" />}
          status={coolantStatus}
          lastUpdated={reactorData.timeLastUpdated}
          tooltipContent={
            <div className="space-y-1">
              <p className="font-bold text-white">{content.metrics.flowRate}</p>
              <p className="text-xs">Normal: &gt;52,000 m³/h</p>
              <p className="text-xs text-yellow-400">Warning: &lt;{alertThresholds.lowCoolantFlow + 2000} m³/h</p>
              <p className="text-xs text-red-400">Critical: &lt;{alertThresholds.lowCoolantFlow} m³/h</p>
            </div>
          }
        />
        
        <MetricCard 
          title={content.metrics.containment}
          value={reactorData.containmentPressure.toFixed(1)}
          unit="kPa"
          icon={<GaugeIcon className="h-4 w-4" />}
          status={getStatus(
            reactorData.containmentPressure, 
            alertThresholds.highContainmentPressure - 5, 
            alertThresholds.highContainmentPressure
          )}
          lastUpdated={reactorData.timeLastUpdated}
          tooltipContent={
            <div className="space-y-1">
              <p className="font-bold text-white">{content.metrics.containment}</p>
              <p className="text-xs">Normal: 100 - 105 kPa</p>
              <p className="text-xs text-yellow-400">Warning: &gt;{alertThresholds.highContainmentPressure - 5} kPa</p>
              <p className="text-xs text-red-400">Critical: &gt;{alertThresholds.highContainmentPressure} kPa</p>
            </div>
          }
        />
      </div>
      
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4">
        <div className="space-y-4">
          <Gauge 
            title={content.metrics.burnup}
            value={reactorData.fuelBurnup}
            min={0}
            max={100}
            units="%"
            warning={80}
            danger={95}
            icon={<BarChart3 className="h-4 w-4" />}
            lastUpdated={reactorData.timeLastUpdated}
          />
          
          <MetricCard 
            title={content.metrics.radiation}
            value={reactorData.radiationLevel.toFixed(3)}
            unit="mSv/h"
            icon={<Radiation className="h-4 w-4" />}
            status={radiationStatus}
            lastUpdated={reactorData.timeLastUpdated}
            tooltipContent={
              <div className="space-y-1">
                <p className="font-bold text-white">{content.metrics.radiation}</p>
                <p className="text-xs">Normal: 0.1 - 0.25 mSv/h</p>
                <p className="text-xs text-yellow-400">Warning: &gt;{alertThresholds.highRadiation / 2} mSv/h</p>
                <p className="text-xs text-red-400">Critical: &gt;{alertThresholds.highRadiation} mSv/h</p>
              </div>
            }
          />
        </div>
        
        <div className="md:col-span-2">
           <div className="rounded-xl border border-white/10 bg-slate-900/50 backdrop-blur-sm h-full">
            <div className="p-6 pb-2">
                <h3 className="text-lg font-medium text-white flex items-center justify-between">
                <span>{content.controlRods.title}</span>
                <span className="text-xs text-gray-400 font-normal border border-white/10 px-2 py-1 rounded">{content.controlRods.subtitle}</span>
                </h3>
            </div>
            <div className="p-6">
                 <ControlRods positions={reactorData.controlRodPositions} />
                 <p className="text-xs text-gray-500 mt-6 text-center">
                    {content.controlRods.instruction}
                 </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
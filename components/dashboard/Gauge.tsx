
import React, { useState, useEffect } from "react";

interface GaugeProps {
  title: string;
  value: number;
  min: number;
  max: number;
  units?: string;
  danger?: number;
  warning?: number;
  success?: number;
  icon?: React.ReactNode;
  className?: string;
  lastUpdated?: Date;
}

export default function Gauge({
  title,
  value,
  min,
  max,
  units,
  danger,
  warning,
  success,
  icon,
  className = "",
  lastUpdated,
}: GaugeProps) {
  const [isUpdated, setIsUpdated] = useState(false);

  // Normalize value to percentage
  const percentage = Math.min(Math.max(((value - min) / (max - min)) * 100, 0), 100);

  // Determine color based on value and thresholds
  const getColor = () => {
    if (danger !== undefined && value >= danger) return "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]";
    if (warning !== undefined && value >= warning) return "bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]";
    if (success !== undefined && value >= success) return "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]";
    return "bg-atom-500 shadow-[0_0_10px_rgba(20,184,166,0.5)]";
  };

  const valueColor = () => {
    if (danger !== undefined && value >= danger) return "text-red-400";
    if (warning !== undefined && value >= warning) return "text-yellow-400";
    if (success !== undefined && value >= success) return "text-green-400";
    return "text-white";
  };

  // Animation effect when value updates
  useEffect(() => {
    setIsUpdated(true);
    const timer = setTimeout(() => setIsUpdated(false), 1500);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div className={`rounded-xl border border-white/10 bg-slate-900/50 backdrop-blur-sm ${className} ${isUpdated ? "animate-data-update" : ""}`}>
      <div className="p-6 pb-2">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium text-gray-400">{title}</h3>
          {icon && <div className="text-gray-500">{icon}</div>}
        </div>
      </div>
      <div className="p-6 pt-0">
        <div className={`text-2xl font-bold mb-2 font-tech ${valueColor()}`}>
          {value.toLocaleString()}
          {units && <span className="text-sm font-normal text-gray-500 ml-1 font-sans">{units}</span>}
        </div>
        
        <div className="w-full bg-slate-800 rounded-full h-2.5 mb-1 overflow-hidden">
          <div 
            className={`h-2.5 rounded-full transition-all duration-500 ease-out ${getColor()}`} 
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between text-xs text-gray-500 font-mono">
          <span>{min}{units}</span>
          <span>{max}{units}</span>
        </div>

        {lastUpdated && (
          <div className="text-xs text-gray-600 mt-3">
            Updated: {lastUpdated.toLocaleTimeString()}
          </div>
        )}
      </div>
    </div>
  );
}
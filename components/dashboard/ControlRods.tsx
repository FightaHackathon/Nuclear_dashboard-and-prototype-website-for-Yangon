import React, { useState, useEffect } from "react";
import { setManualControlRodPosition } from "../../services/simulationEngine";

interface ControlRodsProps {
  positions: number[];
  onPositionChange?: (index: number, position: number) => void;
}

export default function ControlRods({ positions, onPositionChange }: ControlRodsProps) {
  const [localPositions, setLocalPositions] = useState<number[]>(positions);

  // Update local positions when the parent component updates them
  useEffect(() => {
    setLocalPositions(positions);
  }, [positions]);

  const handlePositionChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const newPosition = parseInt(e.target.value);
    const newPositions = [...localPositions];
    newPositions[index] = newPosition;
    setLocalPositions(newPositions);
    
    // Update the simulation engine
    setManualControlRodPosition(index, newPosition);
    
    // Notify parent component if callback is provided
    if (onPositionChange) {
      onPositionChange(index, newPosition);
    }
  };

  // React to insertion level with different colors
  const getRodColor = (position: number) => {
    if (position > 80) return "bg-gradient-to-t from-red-600 to-red-400 shadow-[0_0_15px_rgba(239,68,68,0.6)]";
    if (position > 50) return "bg-gradient-to-t from-yellow-500 to-yellow-300 shadow-[0_0_15px_rgba(234,179,8,0.6)]";
    return "bg-gradient-to-t from-atom-600 to-atom-400 shadow-[0_0_15px_rgba(20,184,166,0.6)]";
  };

  return (
    <div className="rounded-xl border border-white/10 bg-slate-900/50 backdrop-blur-sm h-full">
      <div className="p-6 pb-2">
        <h3 className="text-lg font-medium text-white flex items-center justify-between">
          <span>Control Rod Matrix</span>
          <span className="text-xs text-gray-400 font-normal border border-white/10 px-2 py-1 rounded">Manual Override Active</span>
        </h3>
      </div>
      <div className="p-6">
        <div className="flex flex-wrap gap-6 justify-center">
          {localPositions.map((position, index) => (
            <div key={index} className="flex flex-col items-center space-y-3 group">
              {/* Rod Visual - Using CSS class from index.html style block */}
              <div className="control-rod-container">
                <div
                  className={`control-rod ${getRodColor(position)}`}
                  style={{ height: `${position}%` }}
                />
              </div>
              
              <div className="text-xs text-center font-medium text-gray-400">Rod {index + 1}</div>
              
              <div className="w-16">
                 <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={position} 
                    onChange={(e) => handlePositionChange(index, e)}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer hover:bg-slate-600 transition-colors"
                  />
              </div>
              
              <div className="text-xs font-mono text-atom-300">{position}%</div>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-6 text-center">
          Adjust insertion to regulate core reactivity. Higher insertion = Lower Power.
        </p>
      </div>
    </div>
  );
}
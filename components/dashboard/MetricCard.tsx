
import React, { useState, useEffect } from "react";
import { Info } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: number | string;
  unit?: string;
  icon?: React.ReactNode;
  description?: string;
  status?: "normal" | "warning" | "danger" | "success";
  lastUpdated?: Date;
  className?: string;
  tooltipContent?: React.ReactNode;
  withTooltip?: boolean;
}

export default function MetricCard({
  title,
  value,
  unit,
  icon,
  description,
  status = "normal",
  lastUpdated,
  className = "",
  tooltipContent,
  withTooltip = true,
}: MetricCardProps) {
  const [isUpdated, setIsUpdated] = useState(false);

  // Style based on status
  let statusColor = "";
  switch (status) {
    case "warning":
      statusColor = "bg-yellow-500/20 text-yellow-400 border-yellow-500/50";
      break;
    case "danger":
      statusColor = "bg-red-500/20 text-red-400 border-red-500/50";
      break;
    case "success":
      statusColor = "bg-green-500/20 text-green-400 border-green-500/50";
      break;
    default:
      statusColor = "bg-slate-800 text-gray-300 border-white/10";
  }

  // Animation effect when value updates
  useEffect(() => {
    setIsUpdated(true);
    const timer = setTimeout(() => setIsUpdated(false), 1500);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div className={`overflow-hidden rounded-xl border bg-slate-900/50 backdrop-blur-sm transition-all duration-300 ${status === 'normal' ? 'border-white/10' : ''} ${className} ${isUpdated ? "animate-data-update" : ""}`}>
      <div className="p-6 pb-2">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium flex items-center gap-1 text-gray-400">
            {title}
            {withTooltip && tooltipContent && (
              <div className="group relative">
                  <Info className="h-3.5 w-3.5 text-gray-500 cursor-help" />
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-48 p-2 bg-slate-900 border border-white/20 rounded-md text-xs text-gray-300 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                      {tooltipContent}
                  </div>
              </div>
            )}
          </h3>
          {icon && <div className="text-gray-500">{icon}</div>}
        </div>
      </div>
      <div className="p-6 pt-0">
        <div className="flex items-baseline justify-between">
          <div className={`text-2xl font-bold font-tech ${status === 'danger' ? 'text-red-400' : status === 'warning' ? 'text-yellow-400' : 'text-white'}`}>
            {value}
            {unit && <span className="text-sm font-normal text-gray-500 ml-1 font-sans">{unit}</span>}
          </div>
          {status !== "normal" && (
            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border ${statusColor}`}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          )}
        </div>
        {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}
        {lastUpdated && (
          <div className="text-xs text-gray-600 mt-2">
            Updated: {lastUpdated.toLocaleTimeString()}
          </div>
        )}
      </div>
    </div>
  );
}
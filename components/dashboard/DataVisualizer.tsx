
import React, { useLayoutEffect, useState } from "react";
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, 
  ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, 
  Legend, Cell
} from "recharts";

interface DataPoint {
  name: string;
  [key: string]: number | string;
}

interface DataVisualizerProps {
  title: string;
  description?: string;
  type: "line" | "bar" | "pie";
  data: DataPoint[];
  dataKeys: string[];
  colors?: string[];
  className?: string;
  XAxisLabel?: string;
  YAxisLabel?: string;
  height?: number;
  bare?: boolean;
}

export default function DataVisualizer({
  title,
  description,
  type,
  data,
  dataKeys,
  colors = ["#14b8a6", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6"],
  className = "",
  XAxisLabel,
  YAxisLabel,
  height = 300,
  bare = false,
}: DataVisualizerProps) {
  
  // Use explicit height if provided to avoid 0-height collapses in grid layouts
  const chartHeight = height;

  // Force a reflow after mount so ResponsiveContainer measures correctly in tabs/grids
  const [mountedKey, setMountedKey] = useState(0);
  useLayoutEffect(() => {
    const t = setTimeout(() => setMountedKey((k) => k + 1), 0);
    return () => clearTimeout(t);
  }, []);

  const safeData = Array.isArray(data)
    ? data.filter(d => {
        try {
          return dataKeys.every(k => typeof (d as any)[k] === 'number' && isFinite((d as any)[k] as number));
        } catch {
          return false;
        }
      })
    : [];
  const placeholder = [{ name: 't0', [dataKeys[0]]: 0 }, { name: 't1', [dataKeys[0]]: 1 }];
  const displayData = safeData.length ? safeData : placeholder as any;

  const renderChart = () => {
    switch (type) {
      case "line":
        return (
          <ResponsiveContainer width="100%" height={chartHeight}>
            <LineChart data={displayData} margin={{ top: 5, right: 5, left: 5, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} stroke="#fff" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12, fill: '#9ca3af' }}
                tickLine={false}
                axisLine={false}
                height={40}
                label={XAxisLabel ? { value: XAxisLabel, position: 'insideBottom', offset: -10, fill: '#6b7280' } : undefined}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: '#9ca3af' }}
                tickLine={false}
                axisLine={false}
                width={40}
                label={YAxisLabel ? { value: YAxisLabel, angle: -90, position: 'insideLeft', fill: '#6b7280' } : undefined}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(15, 23, 42, 0.95)', 
                  borderColor: 'rgba(255,255,255,0.1)',
                  borderRadius: '0.75rem',
                  fontSize: '12px',
                  color: '#fff',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)'
                }}
                itemStyle={{ color: '#fff' }}
                labelStyle={{ color: '#9ca3af' }}
              />
              <Legend verticalAlign="top" height={36} iconType="circle" />
              {dataKeys.map((key, index) => (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={safeData.length ? key : dataKeys[0]}
                  stroke={colors[index % colors.length]}
                  strokeWidth={2}
                  dot={{ r: 3, fill: colors[index % colors.length] }}
                  activeDot={{ r: 5, fill: '#fff' }}
                  isAnimationActive={false}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        );

      case "bar":
        return (
          <ResponsiveContainer width="100%" height={chartHeight}>
            <BarChart data={displayData} margin={{ top: 5, right: 5, left: 5, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} stroke="#fff" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12, fill: '#9ca3af' }}
                tickLine={false}
                axisLine={false}
                height={40}
                label={XAxisLabel ? { value: XAxisLabel, position: 'insideBottom', offset: -10, fill: '#6b7280' } : undefined}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: '#9ca3af' }}
                tickLine={false}
                axisLine={false}
                width={40}
                label={YAxisLabel ? { value: YAxisLabel, angle: -90, position: 'insideLeft', fill: '#6b7280' } : undefined}
              />
              <Tooltip
                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                contentStyle={{ 
                  backgroundColor: 'rgba(15, 23, 42, 0.95)', 
                  borderColor: 'rgba(255,255,255,0.1)',
                  borderRadius: '0.75rem',
                  fontSize: '12px',
                  color: '#fff',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)'
                }}
                itemStyle={{ color: '#fff' }}
                labelStyle={{ color: '#9ca3af' }}
              />
              <Legend verticalAlign="top" height={36} iconType="circle" />
              {dataKeys.map((key, index) => (
                <Bar
                  key={key}
                  dataKey={safeData.length ? key : dataKeys[0]}
                  fill={colors[index % colors.length]}
                  radius={[4, 4, 0, 0]}
                  isAnimationActive={false}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        );

      case "pie":
        return (
          <ResponsiveContainer width="100%" height={chartHeight}>
            <PieChart margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <Pie
                data={displayData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey={dataKeys[0]}
                nameKey="name"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                stroke="rgba(0,0,0,0)"
                isAnimationActive={false}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ 
                  backgroundColor: 'rgba(15, 23, 42, 0.95)', 
                  borderColor: 'rgba(255,255,255,0.1)',
                  borderRadius: '0.75rem',
                  fontSize: '12px',
                  color: '#fff',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)'
                }}
                itemStyle={{ color: '#fff' }}
              />
              <Legend iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        );

      default:
        return <div>Chart type not supported</div>;
    }
  };

  if (bare) {
     return (
       <div key={mountedKey} className={`w-full relative ${className}`} style={{ height: height, minHeight: height, minWidth: 0 }}>
         {renderChart()}
       </div>
     );
  }

  return (
    <div key={mountedKey} className={`rounded-xl border border-white/10 bg-slate-900/50 backdrop-blur-sm ${className}`} style={{ minHeight: (height || 300) + 60, minWidth: 0 }}>
      {(title || description) && (
        <div className="p-6 pb-2">
            {title && <h3 className="text-lg font-medium text-white">{title}</h3>}
            {description && <p className="text-sm text-gray-500">{description}</p>}
        </div>
      )}
      <div className="p-6 pt-0" style={{ height: height, minWidth: 0 }}>{renderChart()}</div>
    </div>
  );
}

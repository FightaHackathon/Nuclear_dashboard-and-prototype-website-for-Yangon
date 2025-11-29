import React, { useState, useEffect, useRef } from "react";
import MetricCard from "./MetricCard";
import { Flame, Droplets, Activity, Scale } from "lucide-react";
import { EnergyMixData, updateEnergyMix, getInitialEnergyMix } from "../../services/simulationEngine";
import { DashboardContent } from "../../types";

interface EnergyMixTabProps {
  content: DashboardContent['energy'];
}

export default function EnergyMixTab({ content }: EnergyMixTabProps) {
  const [energyData, setEnergyData] = useState<EnergyMixData>(getInitialEnergyMix());
  const [userDemandInput, setUserDemandInput] = useState<string>("1700");
  const [userDemand, setUserDemand] = useState<number>(1700);
  
  // Initialize history immediately so the chart is never empty on first render
  const [simulationHistory, setSimulationHistory] = useState<any[]>(() => {
    return Array(10).fill(0).map((_, i) => {
        // Use logic consistent with simulationEngine to prevent chart jumps
        const demand = 1700 + (Math.random() - 0.5) * 50;
        const nuclear = 1000 + (Math.random() - 0.5) * 10;
        const hydro = 400 + (Math.random() - 0.5) * 10;
        const fossil = Math.max(0, demand - (nuclear + hydro));

        return {
          name: `T-${10-i}h`,
          Nuclear: nuclear,
          Fossil: fossil,
          Hydro: hydro,
          Demand: demand
        };
    });
  });

  // Update data logic
  useEffect(() => {
    const performUpdate = () => {
      const updatedData = updateEnergyMix(userDemand);
      setEnergyData(updatedData);
      
      const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const safeNum = (v: number) => (Number.isFinite(v) ? v : 0);
      const newPoint = {
        name: timestamp,
        Nuclear: safeNum(updatedData.nuclear),
        Fossil: safeNum(updatedData.fossil),
        Hydro: safeNum(updatedData.hydro),
        Demand: safeNum(updatedData.demand),
      };
      
      setSimulationHistory(prev => {
        const updated = [...prev, newPoint];
        if (updated.length > 12) {
          return updated.slice(-12);
        }
        return updated;
      });
    };

    // Run immediately when userDemand changes
    performUpdate();

    const interval = setInterval(performUpdate, 3000);
    return () => clearInterval(interval);
  }, [userDemand]);
  
  // Prepare data for pie chart
  const energySourcesData = [
    { name: content.metrics.nuclear, value: energyData.nuclear },
    { name: content.metrics.fossil, value: energyData.fossil },
    { name: content.metrics.hydro, value: energyData.hydro },
  ];
  
  const totalGeneration = energyData.nuclear + energyData.fossil + energyData.hydro;
  const nuclearPercentage = totalGeneration > 0 ? Math.round((energyData.nuclear / totalGeneration) * 100) : 0;
  
  // Calculate energy balance
  const surplus = totalGeneration - energyData.demand;
  const energyBalanceStatus = 
    surplus < -100 ? "danger" : 
    surplus < 0 ? "warning" : 
    "success";

  const handleApplyDemand = () => {
    const cleanInput = userDemandInput.replace(/,/g, '');
    const parsedDemand = Number(cleanInput);
    
    if (!isNaN(parsedDemand) && parsedDemand > 0) {
        setUserDemand(parsedDemand);
    } else {
        alert("Please enter a valid positive number for demand.");
    }
  };

  // Chart.js refs and instances
  const lineRef = useRef<HTMLCanvasElement | null>(null);
  const pieRef = useRef<HTMLCanvasElement | null>(null);
  const lineChartRef = useRef<any>(null);
  const pieChartRef = useRef<any>(null);

  // Initialize or update charts when data/content changes
  useEffect(() => {
    const ChartLib: any = (window as any).Chart;
    if (!ChartLib) return; // Chart.js not yet loaded

    // Build history arrays
    const labels = simulationHistory.map((p) => p.name);
    const nuclear = simulationHistory.map((p) => Number(p.Nuclear) || 0);
    const fossil = simulationHistory.map((p) => Number(p.Fossil) || 0);
    const hydro = simulationHistory.map((p) => Number(p.Hydro) || 0);
    const demand = simulationHistory.map((p) => Number(p.Demand) || 0);

    // Line chart
    if (lineRef.current) {
      if (!lineChartRef.current) {
        lineChartRef.current = new ChartLib(lineRef.current.getContext('2d'), {
          type: 'line',
          data: {
            labels: labels,
            datasets: [
              { label: content.metrics.nuclear, data: nuclear, borderColor: '#14b8a6', backgroundColor: 'rgba(20,184,166,0.2)', tension: 0.3 },
              { label: content.metrics.fossil, data: fossil, borderColor: '#ef4444', backgroundColor: 'rgba(239,68,68,0.2)', tension: 0.3 },
              { label: content.metrics.hydro, data: hydro, borderColor: '#3b82f6', backgroundColor: 'rgba(59,130,246,0.2)', tension: 0.3 },
              { label: content.charts ? content.charts.demandLabel || 'Demand' : 'Demand', data: demand, borderColor: '#eab308', backgroundColor: 'rgba(234,179,8,0.2)', borderDash: [6,6], tension: 0.3 }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { labels: { color: '#9ca3af' } } },
            scales: {
              x: { ticks: { color: '#9ca3af' }, grid: { color: 'rgba(255,255,255,0.06)' } },
              y: { ticks: { color: '#9ca3af' }, grid: { color: 'rgba(255,255,255,0.06)' } }
            }
          }
        });
      } else {
        const ch = lineChartRef.current;
        ch.data.labels = labels;
        ch.data.datasets[0].data = nuclear;
        ch.data.datasets[1].data = fossil;
        ch.data.datasets[2].data = hydro;
        ch.data.datasets[3].data = demand;
        ch.data.datasets[0].label = content.metrics.nuclear;
        ch.data.datasets[1].label = content.metrics.fossil;
        ch.data.datasets[2].label = content.metrics.hydro;
        ch.data.datasets[3].label = content.charts ? content.charts.demandLabel || 'Demand' : 'Demand';
        ch.update('none');
      }
    }

    // Pie chart
    if (pieRef.current) {
      const mixData = [energyData.nuclear, energyData.fossil, energyData.hydro].map((n) => Number(n) || 0);
      if (!pieChartRef.current) {
        pieChartRef.current = new ChartLib(pieRef.current.getContext('2d'), {
          type: 'pie',
          data: {
            labels: [content.metrics.nuclear, content.metrics.fossil, content.metrics.hydro],
            datasets: [{ data: mixData, backgroundColor: ['#14b8a6', '#ef4444', '#3b82f6'] }]
          },
          options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: '#9ca3af' } } } }
        });
      } else {
        const pc = pieChartRef.current;
        pc.data.labels = [content.metrics.nuclear, content.metrics.fossil, content.metrics.hydro];
        pc.data.datasets[0].data = mixData;
        pc.update('none');
      }
    }

    return () => {
      // Do not destroy charts on every update; only on unmount
    };
  }, [simulationHistory, energyData, content]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">{content.title}</h2>
          <p className="text-sm text-gray-400">{content.subtitle}</p>
        </div>
        
        <div className="flex items-center gap-2 bg-slate-900/50 p-2 rounded-lg border border-white/10">
          <span className="text-sm text-gray-400 pl-2">{content.gridDemand}</span>
          <input
            type="text"
            className="bg-slate-950 border border-slate-700 rounded px-3 py-1.5 w-32 text-white text-sm focus:ring-1 focus:ring-atom-500 outline-none"
            value={userDemandInput}
            onChange={(e) => setUserDemandInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleApplyDemand()}
            placeholder="MW"
          />
          <button
            onClick={handleApplyDemand}
            className="bg-atom-600 hover:bg-atom-500 text-white px-3 py-1.5 rounded text-sm transition-colors"
          >
            {content.apply}
          </button>
        </div>
      </div>
      
      {/* Charts Grid using Chart.js (no Leaflet/CSS framework) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-w-0">
        <div className="lg:col-span-2 min-h-[380px] min-w-0 rounded-xl border border-white/10 bg-slate-900/50 backdrop-blur-sm">
          <div className="p-6 pb-2">
            <h3 className="text-lg font-medium text-white">{content.charts.genVsDemand}</h3>
          </div>
          <div className="p-6 pt-0" style={{height: 340}}>
            <canvas ref={lineRef} />
          </div>
        </div>

        <div className="flex flex-col h-full rounded-xl border border-white/10 bg-slate-900/50 backdrop-blur-sm min-w-0">
          <div className="p-6 pb-0">
            <h3 className="text-lg font-medium text-white">{content.charts.currentMix}</h3>
          </div>
          <div className="flex-grow min-h-[260px] min-w-0 p-6 pt-0">
            <canvas ref={pieRef} />
          </div>
          <div className="p-6 pt-0 space-y-2">
            <div className="flex justify-between text-sm text-gray-300"><span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full" style={{backgroundColor:'#14b8a6'}}></span>{content.metrics.nuclear}</span><span className="text-white font-mono">{energyData.nuclear.toFixed(0)} MW</span></div>
            <div className="flex justify-between text-sm text-gray-300"><span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full" style={{backgroundColor:'#ef4444'}}></span>{content.metrics.fossil}</span><span className="text-white font-mono">{energyData.fossil.toFixed(0)} MW</span></div>
            <div className="flex justify-between text-sm text-gray-300"><span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full" style={{backgroundColor:'#3b82f6'}}></span>{content.metrics.hydro}</span><span className="text-white font-mono">{energyData.hydro.toFixed(0)} MW</span></div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard 
          title={content.metrics.nuclear}
          value={energyData.nuclear}
          unit="MW"
          icon={<Activity className="h-4 w-4" />}
          description={`${nuclearPercentage}% of total`}
          lastUpdated={energyData.timeLastUpdated}
        />
        
        <MetricCard 
          title={content.metrics.fossil}
          value={energyData.fossil.toFixed(0)}
          unit="MW"
          icon={<Flame className="h-4 w-4" />}
          description={`${Math.round((energyData.fossil / totalGeneration) * 100)}% of total`}
          lastUpdated={energyData.timeLastUpdated}
          status={energyData.fossil > 500 ? 'warning' : 'normal'}
        />
        
        <MetricCard 
          title={content.metrics.hydro}
          value={energyData.hydro.toFixed(0)}
          unit="MW"
          icon={<Droplets className="h-4 w-4" />}
          description={`${Math.round((energyData.hydro / totalGeneration) * 100)}% of total`}
          lastUpdated={energyData.timeLastUpdated}
        />

        <MetricCard 
        title={content.metrics.co2}
        value={energyData.co2Avoided.toLocaleString()}
        unit="tons"
        status="success"
        description="vs. Coal Baseline"
        lastUpdated={energyData.timeLastUpdated}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MetricCard 
        title={content.metrics.balance}
        value={surplus >= 0 ? `+${surplus.toFixed(0)}` : surplus.toFixed(0)}
        unit="MW"
        status={energyBalanceStatus}
        icon={<Scale className="h-4 w-4" />}
        description={surplus >= 0 ? "Grid surplus (stable)" : "Grid deficit (unstable)"}
        lastUpdated={energyData.timeLastUpdated}
        tooltipContent={
            <div className="space-y-1">
            <p className="font-bold">Energy Balance</p>
            <p className="text-xs">Total Gen: {totalGeneration.toFixed(0)} MW</p>
            <p className="text-xs">Demand: {energyData.demand.toFixed(0)} MW</p>
            </div>
        }
        />
      </div>
    </div>
  );
}
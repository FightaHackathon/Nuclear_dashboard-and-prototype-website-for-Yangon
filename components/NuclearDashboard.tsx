
import React, { useState } from 'react';
import PlantOverviewTab from './dashboard/PlantOverviewTab';
import EnergyMixTab from './dashboard/EnergyMixTab';
import { Activity, Zap, LayoutDashboard } from 'lucide-react';
import { DashboardContent, Language } from '../types';

type Tab = 'overview' | 'energy';

interface NuclearDashboardProps {
  lang?: Language;
  content: DashboardContent;
}

const NuclearDashboard: React.FC<NuclearDashboardProps> = ({ lang = 'en', content }) => {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  
  return (
    <div className="pt-24 pb-10 min-h-screen bg-slate-950 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-3xl font-tech font-bold text-white mb-2 flex items-center gap-3 leading-normal py-1">
               <LayoutDashboard className="h-8 w-8 text-atom-400" />
               {content.header.title}
            </h1>
            <p className="text-gray-400">{content.header.subtitle}</p>
          </div>
          <div className="flex bg-slate-900/50 p-1 rounded-xl border border-white/10">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'overview' ? 'bg-atom-600 text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            >
              <Activity className="h-4 w-4" />
              {content.header.tabs.overview}
            </button>
            <button
              onClick={() => setActiveTab('energy')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'energy' ? 'bg-atom-600 text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            >
              <Zap className="h-4 w-4" />
              {content.header.tabs.energy}
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="min-h-[600px]">
          {activeTab === 'overview' && <PlantOverviewTab content={content.overview} />}
          {activeTab === 'energy' && <EnergyMixTab content={content.energy} />}
        </div>
      </div>
    </div>
  );
};

export default NuclearDashboard;

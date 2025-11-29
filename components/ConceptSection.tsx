import React from 'react';
import { Content } from '../types';
import { Box, Clock, TrendingUp, ShieldCheck } from 'lucide-react';

interface ConceptSectionProps {
  content: Content;
}

const ConceptSection: React.FC<ConceptSectionProps> = ({ content }) => {
  return (
    <section id="concept" className="py-20 bg-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-tech font-bold text-white mb-4">{content.concept.title}</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">{content.concept.description}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          {/* 3D Component */}
          <div className="bg-slate-900/50 p-8 rounded-2xl border border-white/10 hover:border-atom-500/50 transition-colors group backdrop-blur-sm">
            <div className="w-14 h-14 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Box className="h-7 w-7 text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">{content.concept.d3.title}</h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              {content.concept.d3.desc}
            </p>
            <div className="h-40 w-full bg-slate-800 rounded-lg overflow-hidden relative">
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1487887235947-a955ef187fcc?q=80&w=1955&auto=format&fit=crop')] bg-cover bg-center opacity-40"></div>
               <div className="absolute inset-0 flex items-center justify-center">
                 <span className="text-xs font-mono text-blue-300 bg-slate-900/80 px-2 py-1 rounded">Spatial Optimization</span>
               </div>
            </div>
          </div>

          {/* 1D Component */}
          <div className="bg-slate-900/50 p-8 rounded-2xl border border-white/10 hover:border-atom-500/50 transition-colors group backdrop-blur-sm">
            <div className="w-14 h-14 bg-atom-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Clock className="h-7 w-7 text-atom-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">{content.concept.d1.title}</h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              {content.concept.d1.desc}
            </p>
            <div className="h-40 w-full bg-slate-800 rounded-lg overflow-hidden relative">
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop')] bg-cover bg-center opacity-40"></div>
               <div className="absolute inset-0 flex items-center justify-center">
                 <span className="text-xs font-mono text-atom-300 bg-slate-900/80 px-2 py-1 rounded">Temporal Efficiency</span>
               </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-4 p-6 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 border border-white/5">
                <ShieldCheck className="h-10 w-10 text-green-400 flex-shrink-0" />
                <div>
                    <h4 className="text-lg font-semibold text-white mb-2">{content.details.feasibility}</h4>
                    <p className="text-gray-400 text-sm">{content.details.feasibilityDesc}</p>
                </div>
            </div>
            <div className="flex gap-4 p-6 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 border border-white/5">
                <TrendingUp className="h-10 w-10 text-purple-400 flex-shrink-0" />
                <div>
                    <h4 className="text-lg font-semibold text-white mb-2">{content.details.efficiency}</h4>
                    <p className="text-gray-400 text-sm">{content.details.efficiencyDesc}</p>
                </div>
            </div>
        </div>

      </div>
    </section>
  );
};

export default ConceptSection;
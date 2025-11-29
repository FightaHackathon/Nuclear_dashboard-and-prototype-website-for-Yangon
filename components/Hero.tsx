
import React from 'react';
import { Link } from 'react-router-dom';
import { Content } from '../types';
import { ArrowRight, Zap, Activity, Layers } from 'lucide-react';

interface HeroProps {
  content: Content['hero'];
}

const Hero: React.FC<HeroProps> = ({ content }) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-slate-950 overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Abstract Blobs */}
        <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] bg-atom-900/20 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute top-[40%] -right-[20%] w-[60%] h-[60%] bg-blue-900/20 rounded-full blur-[100px] animate-pulse-slow" style={{animationDelay: '2s'}}></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-atom-500/10 border border-atom-500/20 text-atom-400 text-sm font-bold mb-8 tracking-wider uppercase animate-fade-in-up">
          <Layers className="h-4 w-4" />
          {content.badge}
        </div>

        {/* Main Title */}
        <h1 className="text-5xl md:text-7xl font-tech font-bold text-white mb-6 leading-normal tracking-tight drop-shadow-[0_0_15px_rgba(20,184,166,0.5)]">
          {content.title.split(':')[0]}
          <span className="text-atom-500">:</span>
          <br />
          <span className="text-4xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-white via-atom-200 to-atom-500 pb-2 inline-block">
            {content.title.split(':')[1]}
          </span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-400 mb-10 leading-relaxed max-w-3xl mx-auto">
          {content.subtitle}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link 
            to="/components" 
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-slate-950 bg-atom-500 rounded-full overflow-hidden transition-all hover:bg-atom-400 hover:scale-105 shadow-[0_0_20px_rgba(20,184,166,0.4)]"
          >
            <div className="absolute inset-0 w-full h-full bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
            <span>{content.cta}</span>
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <a 
            href="#concept" 
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white border border-white/10 rounded-full hover:bg-white/5 hover:border-white/30 transition-all backdrop-blur-sm"
          >
            <Activity className="mr-2 h-5 w-5 text-gray-400" />
            <span>Project Details</span>
          </a>
        </div>

        {/* Floating Stats / Decor */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/5 pt-10">
           <div className="text-center">
              <div className="text-3xl font-tech font-bold text-white mb-1">24/7</div>
              <div className="text-xs text-atom-400 uppercase tracking-widest">Reliability</div>
           </div>
           <div className="text-center">
              <div className="text-3xl font-tech font-bold text-white mb-1">SNPP</div>
              <div className="text-xs text-atom-400 uppercase tracking-widest">Technology</div>
           </div>
           <div className="text-center">
              <div className="text-3xl font-tech font-bold text-white mb-1">4D</div>
              <div className="text-xs text-atom-400 uppercase tracking-widest">Optimization</div>
           </div>
           <div className="text-center">
              <div className="text-3xl font-tech font-bold text-white mb-1">100%</div>
              <div className="text-xs text-atom-400 uppercase tracking-widest">Efficient</div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default Hero;

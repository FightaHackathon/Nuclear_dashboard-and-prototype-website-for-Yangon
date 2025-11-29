import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Language, Content } from '../types';
import { Atom, Globe, Menu, X } from 'lucide-react';

interface NavbarProps {
  lang: Language;
  toggleLang: () => void;
  content: Content['nav'];
}

const Navbar: React.FC<NavbarProps> = ({ lang, toggleLang, content }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path ? 'text-atom-300 font-bold' : 'text-gray-300 hover:text-white';

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-slate-900/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="relative">
                <Atom className="h-8 w-8 text-atom-400 group-hover:animate-spin-slow transition-transform" />
                <div className="absolute inset-0 bg-atom-400 blur-lg opacity-40 group-hover:opacity-60 transition-opacity"></div>
              </div>
              <span className="text-xl font-tech font-bold text-white tracking-wider">SMR <span className="text-atom-400">NEXUS</span></span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link to="/" className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/')}`}>
                {content.home}
              </Link>
              <Link to="/components" className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/components')}`}>
                {content.components}
              </Link>
              <Link to="/dashboard" className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/dashboard')}`}>
                {content.dashboard}
              </Link>
              <Link to="/ai" className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/ai')}`}>
                {content.aiAnalysis}
              </Link>
            </div>
          </div>

          <div className="hidden md:flex items-center">
            <button 
              onClick={toggleLang}
              className="flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 hover:bg-white/10 transition-colors text-sm text-gray-300"
            >
              <Globe className="h-4 w-4" />
              <span>{lang === 'en' ? 'MY' : 'EN'}</span>
            </button>
          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-slate-900 border-b border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/" 
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/')}`}
            >
              {content.home}
            </Link>
            <Link 
              to="/components" 
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/components')}`}
            >
              {content.components}
            </Link>
            <Link 
              to="/dashboard" 
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/dashboard')}`}
            >
              {content.dashboard}
            </Link>
            <Link 
              to="/ai" 
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/ai')}`}
            >
              {content.aiAnalysis}
            </Link>
            <button 
              onClick={() => { toggleLang(); setIsOpen(false); }}
              className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
            >
              <Globe className="h-5 w-5" />
              <span>{lang === 'en' ? 'Switch to Burmese' : 'Switch to English'}</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
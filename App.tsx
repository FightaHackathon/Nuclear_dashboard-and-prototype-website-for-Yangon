
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import SMRViewer from './components/SMRViewer';
import NuclearDashboard from './components/NuclearDashboard';
import NuclearChat from './components/NuclearChat';
import Footer from './components/Footer';
import { CONTENT } from './constants';
import { Language } from './types';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');

  const toggleLang = () => {
    setLang(prev => prev === 'en' ? 'my' : 'en');
  };

  const currentContent = CONTENT[lang];

  return (
    <HashRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-slate-950 text-white selection:bg-atom-500/30">
        <Navbar lang={lang} toggleLang={toggleLang} content={currentContent.nav} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home lang={lang} />} />
            <Route path="/components" element={
              <SMRViewer content={currentContent.viewer} lang={lang} toggleLang={toggleLang} />
            } />
             <Route path="/dashboard" element={
              <NuclearDashboard lang={lang} content={currentContent.dashboard} />
            } />
            <Route path="/ai" element={
              <NuclearChat content={currentContent.chat} lang={lang} />
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;

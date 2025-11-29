import React, { useState, useRef, useEffect } from 'react';
import { CONTENT } from '../constants';
import { Language } from '../types';
import { ChevronLeft, ChevronRight, Maximize2, Minimize2, GripHorizontal, ChevronUp, Check, Globe, RotateCcw } from 'lucide-react';

interface SMRViewerProps {
  // We keep the prop signature compatible but use local state for content
  lang: Language; 
  toggleLang?: () => void; 
  content?: any;
}

const SMRViewer: React.FC<SMRViewerProps> = ({ lang: initialGlobalLang }) => {
  // Local Language State for Component Browser only
  const [localLang, setLocalLang] = useState<Language>(initialGlobalLang);
  const content = CONTENT[localLang].viewer;

  // State
  const [showOverlay, setShowOverlay] = useState(true);
  const [overlayItemIndex, setOverlayItemIndex] = useState(0);
  const [showComponentList, setShowComponentList] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  // Dragging State
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 40, y: 120 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const cardStartPos = useRef({ x: 0, y: 0 });

  const currentOverlayItem = content.overlay.items[overlayItemIndex];

  // Navigation
  const nextOverlayItem = () => {
    setOverlayItemIndex((prev) => (prev + 1) % content.overlay.items.length);
  };

  const prevOverlayItem = () => {
    setOverlayItemIndex((prev) => (prev - 1 + content.overlay.items.length) % content.overlay.items.length);
  };
  
  const selectItem = (index: number) => {
      setOverlayItemIndex(index);
      setShowComponentList(false);
  }

  const toggleLocalLang = () => {
    setLocalLang(prev => prev === 'en' ? 'my' : 'en');
  }

  const resetView = () => {
    setIframeKey(prev => prev + 1);
  };

  // Dragging Logic
  const handleMouseDown = (e: React.MouseEvent) => {
    if (cardRef.current) {
      setIsDragging(true);
      dragStartPos.current = { x: e.clientX, y: e.clientY };
      cardStartPos.current = { x: position.x, y: position.y };
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const dx = e.clientX - dragStartPos.current.x;
        const dy = e.clientY - dragStartPos.current.y;
        setPosition({
          x: cardStartPos.current.x + dx,
          y: cardStartPos.current.y + dy,
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);


  return (
    <div className="relative w-full h-screen bg-slate-950 overflow-hidden">
      {/* Iframe */}
      {/* Added pointer-events-none during drag to prevent iframe from capturing mouse events */}
      <iframe 
        key={iframeKey}
        src="https://3d.energyencyclopedia.com/smr_hall?mode=iframe" 
        frameBorder="0" 
        allowFullScreen 
        className={`w-full h-full relative z-0 transition-opacity duration-300 ${isDragging ? 'pointer-events-none select-none' : ''}`}
        title="SMR 3D Viewer"
      />

      {/* Top Right Logo Blocker */}
      <div className="absolute top-0 right-0 w-[340px] h-24 bg-slate-900/95 backdrop-blur-md rounded-bl-[2rem] z-10 border-b border-l border-white/10 shadow-2xl pointer-events-auto"></div>

      {/* Bottom Control Bar Blocker - Full Width Overlay */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-slate-900/95 backdrop-blur-md z-10 border-t border-white/10 shadow-[0_-5px_20px_rgba(0,0,0,0.5)] pointer-events-auto flex items-center justify-center">
        {/* Decorative handle element */}
        <div className="h-1 w-24 bg-white/10 rounded-full"></div>
      </div>

      {/* Maximize Button (Top Left - when overlay is hidden) */}
      {!showOverlay && (
        <button 
          onClick={() => setShowOverlay(true)}
          className="absolute top-0 left-0 w-20 h-20 bg-slate-900/95 backdrop-blur-md rounded-br-[2rem] border-b border-r border-white/10 shadow-2xl z-50 flex items-center justify-center group cursor-pointer hover:bg-slate-800 transition-all"
          title="Open Component Browser"
        >
          <Maximize2 className="h-8 w-8 text-atom-400 group-hover:scale-110 group-hover:text-atom-300 transition-transform" />
        </button>
      )}

      {/* Draggable Overlay Card */}
      {showOverlay && (
        <div 
          ref={cardRef}
          style={{ 
            left: `${position.x}px`, 
            top: `${position.y}px`,
            position: 'absolute'
          }}
          className="w-[450px] bg-slate-950/95 border border-atom-500/30 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-xl z-30 flex flex-col overflow-visible"
        >
          {/* Header */}
          <div 
            className="flex items-center justify-between px-4 py-3 border-b border-white/10 cursor-move bg-white/5 rounded-t-2xl group select-none"
            onMouseDown={handleMouseDown}
          >
            <div className="flex items-center gap-2">
               <GripHorizontal className="text-gray-500 h-5 w-5 group-hover:text-atom-400 transition-colors" />
               <span className="text-xs font-tech text-atom-400 tracking-wider uppercase">{content.overlay.browserLabel}</span>
            </div>
            
            <div className="flex items-center gap-2" onMouseDown={e => e.stopPropagation()}>
                 {/* Back to Hall Button - Moved inside here */}
                 <button
                   onClick={resetView}
                   className="flex items-center gap-1.5 px-3 py-1.5 bg-atom-600/20 hover:bg-atom-600 hover:text-white text-atom-400 border border-atom-500/30 rounded-lg transition-all text-[10px] font-bold uppercase tracking-wide mr-2"
                   title="Reset to Main View"
                 >
                   <RotateCcw className="h-3 w-3" />
                   Return to Hall
                 </button>

                 <button 
                    onClick={toggleLocalLang}
                    className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors flex items-center gap-1"
                    title="Switch Language for Viewer"
                 >
                    <Globe className="h-4 w-4" />
                    <span className="text-[10px] font-bold">{localLang === 'en' ? 'MY' : 'EN'}</span>
                </button>
            </div>
          </div>

          {/* Minimize Button */}
          <button 
             onClick={() => setShowOverlay(false)}
             className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-slate-800 hover:bg-red-500 text-gray-400 hover:text-white border border-white/20 p-1.5 rounded-full shadow-lg transition-all z-40"
             onMouseDown={e => e.stopPropagation()}
             title="Minimize"
          >
             <Minimize2 className="h-4 w-4" />
          </button>

          {/* Content */}
          <div className="p-6 pr-10">
            <h2 className="text-2xl font-tech font-bold text-white mb-3 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
              {currentOverlayItem.title}
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed drop-shadow-md">
              {currentOverlayItem.description}
            </p>
          </div>

          {/* Footer Control */}
          <div className="px-4 py-3 bg-white/5 border-t border-white/10 rounded-b-2xl relative">
             <div className="flex items-center justify-between">
                <button 
                  onClick={prevOverlayItem}
                  className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <button 
                  onClick={() => setShowComponentList(!showComponentList)}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-atom-500/30 rounded-lg text-atom-300 hover:bg-slate-800 transition-all text-sm font-medium shadow-inner"
                >
                  <span>Select Component</span>
                  <ChevronUp className={`h-4 w-4 transition-transform ${showComponentList ? 'rotate-180' : ''}`} />
                </button>

                <button 
                  onClick={nextOverlayItem}
                  className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
             </div>

             {/* Dropdown Menu */}
             {showComponentList && (
               <>
                 <div className="fixed inset-0 z-40" onClick={() => setShowComponentList(false)}></div>
                 <div className="absolute bottom-full left-4 right-4 mb-2 bg-slate-900/95 border border-atom-500/30 rounded-xl shadow-2xl backdrop-blur-xl max-h-60 overflow-y-auto z-50 custom-scrollbar">
                    {content.overlay.items.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => selectItem(index)}
                        className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between border-b border-white/5 last:border-0 transition-colors ${index === overlayItemIndex ? 'bg-atom-500/20 text-atom-300' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                      >
                        <span className="font-medium truncate">{item.title}</span>
                        {index === overlayItemIndex && <Check className="h-4 w-4 text-atom-400" />}
                      </button>
                    ))}
                 </div>
               </>
             )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SMRViewer;
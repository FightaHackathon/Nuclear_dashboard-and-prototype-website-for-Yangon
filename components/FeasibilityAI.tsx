import React, { useState } from 'react';
import { Content, Language } from '../types';
import { analyzeFeasibility } from '../services/mistralService';
import ReactMarkdown from 'react-markdown';
import { Bot, Loader2, Send } from 'lucide-react';

interface FeasibilityAIProps {
  content: Content['ai'];
  lang: Language;
}

const FeasibilityAI: React.FC<FeasibilityAIProps> = ({ content, lang }) => {
  const [industry, setIndustry] = useState('');
  const [location, setLocation] = useState('');
  const [demand, setDemand] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!industry || !location) return;

    setLoading(true);
    setResult(null);
    
    // Calls Mistral API instead of Gemini
    const response = await analyzeFeasibility(industry, location, demand, lang);
    
    setResult(response);
    setLoading(false);
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-atom-500/10 rounded-xl mb-4">
             <Bot className="h-10 w-10 text-atom-400" />
          </div>
          <h1 className="text-3xl md:text-5xl font-tech font-bold text-white mb-2 leading-normal py-1">{content.title}</h1>
          <p className="text-atom-300 font-medium">{content.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-5 gap-8">
          
          {/* Input Form */}
          <div className="md:col-span-2 space-y-6">
            <form onSubmit={handleAnalyze} className="bg-slate-900/50 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">{content.inputIndustry}</label>
                  <input
                    type="text"
                    required
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-atom-500 focus:border-transparent outline-none transition-all"
                    placeholder="e.g. Steel Mill"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">{content.inputLocation}</label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-atom-500 focus:border-transparent outline-none transition-all"
                    placeholder="e.g. Yangon Industrial Zone"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">{content.inputDemand}</label>
                  <input
                    type="text"
                    value={demand}
                    onChange={(e) => setDemand(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-atom-500 focus:border-transparent outline-none transition-all"
                    placeholder="e.g. 100 MW"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-6 bg-atom-600 hover:bg-atom-500 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                {loading ? content.analyzing : content.analyzeBtn}
              </button>
            </form>
          </div>

          {/* Result Display */}
          <div className="md:col-span-3">
             <div className="h-full bg-slate-900 p-8 rounded-2xl border border-white/10 relative overflow-hidden min-h-[400px]">
                {!result && !loading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 opacity-50">
                    <Bot className="h-16 w-16 mb-4" />
                    <p>Ready to analyze...</p>
                  </div>
                )}
                
                {loading && (
                   <div className="absolute inset-0 flex items-center justify-center space-x-2">
                      <div className="w-3 h-3 bg-atom-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                      <div className="w-3 h-3 bg-atom-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-3 h-3 bg-atom-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                   </div>
                )}

                {result && !loading && (
                  <div className="prose prose-invert prose-atom max-w-none">
                    <h3 className="text-atom-300 border-b border-atom-500/30 pb-2 mb-4">{content.resultTitle}</h3>
                    <ReactMarkdown>{result}</ReactMarkdown>
                  </div>
                )}
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FeasibilityAI;
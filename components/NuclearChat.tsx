import React, { useState, useRef, useEffect } from 'react';
import { Content, Language } from '../types';
import { getChatResponse, ChatMessage } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';
import { Bot, Send, User, Loader2, Sparkles, AlertCircle } from 'lucide-react';

interface NuclearChatProps {
  content: Content['chat'];
  lang: Language;
}

const NuclearChat: React.FC<NuclearChatProps> = ({ content, lang }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: ChatMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    // Call Gemini service
    // Note: getChatResponse handles the system instruction and language logic internally
    const responseText = await getChatResponse([...messages, userMessage], lang);

    const botMessage: ChatMessage = { role: 'assistant', content: responseText };
    setMessages(prev => [...prev, botMessage]);
    setLoading(false);
  };

  return (
    <div className="pt-24 pb-10 min-h-screen bg-slate-950 flex flex-col items-center">
      <div className="w-full max-w-4xl px-4 flex-grow flex flex-col">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-4 bg-atom-500/10 rounded-2xl mb-4 relative group">
             <Bot className="h-10 w-10 text-atom-400" />
             <Sparkles className="absolute -top-2 -right-2 h-5 w-5 text-nuclear-accent animate-pulse" />
          </div>
          <h1 className="text-3xl md:text-4xl font-tech font-bold text-white mb-2 leading-normal py-1">{content.title}</h1>
          <p className="text-atom-300 font-medium">{content.subtitle}</p>
        </div>

        {/* Chat Container */}
        <div className="flex-grow bg-slate-900/50 rounded-2xl border border-white/10 backdrop-blur-sm flex flex-col overflow-hidden shadow-2xl h-[600px]">
          
          {/* Messages Area */}
          <div className="flex-grow overflow-y-auto p-6 space-y-6 custom-scrollbar">
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-gray-500 opacity-60">
                <Bot className="h-16 w-16 mb-4 text-atom-500/50" />
                <p className="text-lg font-medium">{content.welcome}</p>
                <div className="flex items-center gap-2 mt-4 text-sm text-yellow-500/80 bg-yellow-500/10 px-4 py-2 rounded-full border border-yellow-500/20">
                    <AlertCircle className="h-4 w-4" />
                    <span>{content.disclaimer}</span>
                </div>
              </div>
            )}

            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex gap-3 max-w-[85%] md:max-w-[75%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  
                  {/* Avatar */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-blue-600' : 'bg-atom-600'}`}>
                    {msg.role === 'user' ? <User className="h-5 w-5 text-white" /> : <Bot className="h-5 w-5 text-white" />}
                  </div>

                  {/* Bubble */}
                  <div className={`p-4 rounded-2xl ${
                    msg.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-none' 
                      : 'bg-slate-800 border border-white/10 text-gray-100 rounded-tl-none'
                  }`}>
                    {msg.role === 'user' ? (
                      <p>{msg.content}</p>
                    ) : (
                      <div className="prose prose-invert prose-atom max-w-none text-sm">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="flex justify-start">
                 <div className="flex gap-3 max-w-[75%]">
                    <div className="w-8 h-8 rounded-full bg-atom-600 flex items-center justify-center flex-shrink-0">
                      <Bot className="h-5 w-5 text-white" />
                    </div>
                    <div className="bg-slate-800 border border-white/10 p-4 rounded-2xl rounded-tl-none flex items-center gap-2">
                       <Loader2 className="h-4 w-4 animate-spin text-atom-400" />
                       <span className="text-gray-400 text-sm">Thinking...</span>
                    </div>
                 </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-slate-900 border-t border-white/10">
            <form onSubmit={handleSend} className="relative flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={content.placeholder}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-atom-500 focus:border-transparent outline-none transition-all pr-12"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="absolute right-2 p-2 bg-atom-600 hover:bg-atom-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
              >
                <Send className="h-5 w-5" />
              </button>
            </form>
            <p className="text-center text-xs text-gray-500 mt-2">
              {content.disclaimer}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default NuclearChat;
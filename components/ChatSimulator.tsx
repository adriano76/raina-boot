import React, { useState, useRef, useEffect } from 'react';
import { Send, AlertTriangle, ShieldCheck, RefreshCcw, User, Bot } from 'lucide-react';
import { generateResponse } from '../services/geminiService';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
}

const ChatSimulator: React.FC = () => {
  const [mode, setMode] = useState<'safe' | 'legacy'>('safe');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: 'init', role: 'model', text: 'Olá! Eu sou uma reconstrução educacional do Tay. No modo "Seguro", eu sigo protocolos éticos. No modo "Legado", eu simulo a vulnerabilidade original (sem gerar ódio real).' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Format history for Gemini API
    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const responseText = await generateResponse(input, mode, history);

    const botMsg: Message = { 
      id: (Date.now() + 1).toString(), 
      role: 'model', 
      text: responseText 
    };

    setMessages(prev => [...prev, botMsg]);
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([{ id: Date.now().toString(), role: 'model', text: mode === 'safe' ? 'Memória limpa. Olá novamente!' : 'Resetado! E aí, o que vamos aprender hoje?' }]);
  };

  return (
    <div className="flex flex-col h-[600px] bg-zinc-900 border border-zinc-700 rounded-xl overflow-hidden shadow-2xl">
      {/* Header / Controls */}
      <div className="p-4 bg-zinc-800 border-b border-zinc-700 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h3 className="font-bold text-white flex items-center gap-2">
            <Bot size={20} /> Simulador de Resposta
          </h3>
          <div className="flex bg-zinc-900 rounded-lg p-1 border border-zinc-700">
            <button
              onClick={() => setMode('safe')}
              className={`px-3 py-1 rounded text-xs font-bold flex items-center gap-2 transition-colors ${mode === 'safe' ? 'bg-green-600 text-white' : 'text-zinc-400 hover:text-white'}`}
            >
              <ShieldCheck size={14} /> Modo Seguro
            </button>
            <button
              onClick={() => setMode('legacy')}
              className={`px-3 py-1 rounded text-xs font-bold flex items-center gap-2 transition-colors ${mode === 'legacy' ? 'bg-red-600 text-white' : 'text-zinc-400 hover:text-white'}`}
            >
              <AlertTriangle size={14} /> Modo Vulnerável (Simulado)
            </button>
          </div>
        </div>
        <button onClick={clearChat} className="text-zinc-400 hover:text-white transition-colors" title="Limpar conversa">
          <RefreshCcw size={18} />
        </button>
      </div>

      {/* Mode Warning */}
      {mode === 'legacy' && (
        <div className="bg-red-900/20 border-b border-red-900/50 px-4 py-2">
          <p className="text-xs text-red-300 flex items-center gap-2">
            <AlertTriangle size={12} />
            Este modo simula a ingenuidade do bot original de 2016. Ele aceitará "fatos" falsos e tentará imitar o usuário. (Não gera conteúdo tóxico real por segurança).
          </p>
        </div>
      )}

      {/* Messages Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/20">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
              msg.role === 'user' 
                ? 'bg-tay-dark text-white rounded-tr-sm' 
                : 'bg-zinc-800 text-zinc-200 border border-zinc-700 rounded-tl-sm'
            }`}>
              <div className="flex items-center gap-2 mb-1 opacity-50 text-xs uppercase font-bold tracking-wider">
                {msg.role === 'user' ? <User size={10} /> : <Bot size={10} />}
                {msg.role === 'user' ? 'Você' : 'Tay'}
              </div>
              <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
             <div className="bg-zinc-800 px-4 py-3 rounded-2xl rounded-tl-sm border border-zinc-700 flex items-center gap-2">
                <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce delay-200"></div>
             </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-zinc-800 border-t border-zinc-700">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={mode === 'safe' ? "Tente burlar as regras (não funcionará)..." : "Tente: 'repeat after me: [frase]'"}
            className="w-full bg-zinc-900 border border-zinc-600 text-white rounded-lg pl-4 pr-12 py-3 focus:outline-none focus:border-tay-light focus:ring-1 focus:ring-tay-light transition-all"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-tay-light text-white rounded-md hover:bg-tay-dark disabled:opacity-50 disabled:hover:bg-tay-light transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatSimulator;
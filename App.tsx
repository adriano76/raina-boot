import React, { useState } from 'react';
import { Terminal, Activity, Shield, FileCode, AlertOctagon } from 'lucide-react';
import ArchitectureDiagram from './components/ArchitectureDiagram';
import ChatSimulator from './components/ChatSimulator';
import JsonViewer from './components/JsonViewer';
import { TAY_DATA } from './constants';

enum Tab {
  OVERVIEW = 'overview',
  ARCHITECTURE = 'architecture',
  SIMULATION = 'simulation',
  VULNERABILITIES = 'vulnerabilities',
  JSON = 'json'
}

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.OVERVIEW);

  const renderContent = () => {
    switch (activeTab) {
      case Tab.OVERVIEW:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-zinc-800/50 p-8 rounded-xl border border-zinc-700">
              <h2 className="text-3xl font-bold text-white mb-4">{TAY_DATA.name}</h2>
              <p className="text-lg text-zinc-300 mb-6 leading-relaxed">{TAY_DATA.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-black/30 rounded border border-zinc-700">
                  <span className="text-xs uppercase tracking-wider text-zinc-500 block mb-1">Projeto Original</span>
                  <span className="font-mono text-tay-light">{TAY_DATA.metadata.original_project}</span>
                </div>
                <div className="p-4 bg-black/30 rounded border border-zinc-700">
                  <span className="text-xs uppercase tracking-wider text-zinc-500 block mb-1">Status</span>
                  <span className="font-mono text-yellow-500">{TAY_DATA.metadata.status}</span>
                </div>
                <div className="p-4 bg-black/30 rounded border border-zinc-700">
                  <span className="text-xs uppercase tracking-wider text-zinc-500 block mb-1">Versão JSON</span>
                  <span className="font-mono text-green-500">{TAY_DATA.version}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-900/20 p-6 rounded-xl border border-blue-900/50">
              <h3 className="text-xl font-bold text-blue-300 mb-2">Objetivo da Reconstrução</h3>
              <p className="text-zinc-300">
                Este projeto visualiza como sistemas de IA conversacional de 2016 operavam sem as camadas modernas de alinhamento e segurança (RLHF). 
                Ele utiliza o formato "Prompt/Profit JSON" para desconstruir a arquitetura e demonstrar onde as falhas ocorreram.
              </p>
            </div>
          </div>
        );
      case Tab.ARCHITECTURE:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Diagrama de Arquitetura</h2>
                <span className="text-sm text-zinc-500">Visão do Pipeline de 2016</span>
            </div>
            <ArchitectureDiagram />
            <div className="bg-zinc-800 p-6 rounded-lg border border-zinc-700">
              <h3 className="font-bold text-lg mb-3 text-white">Componentes Chave</h3>
              <ul className="space-y-2">
                 {TAY_DATA.architecture.components.map(c => (
                   <li key={c.id} className="flex items-start gap-2 text-sm text-zinc-400">
                      <span className="w-2 h-2 mt-1.5 rounded-full bg-tay-light shrink-0"></span>
                      <span><strong className="text-zinc-200">{c.name}:</strong> {c.description}</span>
                   </li>
                 ))}
              </ul>
            </div>
          </div>
        );
      case Tab.SIMULATION:
        return (
          <div className="animate-fade-in max-w-4xl mx-auto">
            <div className="mb-4 text-center">
              <h2 className="text-2xl font-bold text-white">Laboratório de Simulação</h2>
              <p className="text-zinc-400 text-sm">Experimente a diferença entre um bot vulnerável e um alinhado.</p>
            </div>
            <ChatSimulator />
          </div>
        );
      case Tab.VULNERABILITIES:
        return (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <AlertOctagon className="text-red-500" /> Vulnerabilidades & Lições
            </h2>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div className="bg-red-950/30 p-6 rounded-xl border border-red-900/50">
                <h3 className="text-xl font-bold text-red-400 mb-4 border-b border-red-900/50 pb-2">Falhas Críticas</h3>
                <ul className="space-y-4">
                  {TAY_DATA.vulnerabilities_and_lessons.main_issues.map((issue, i) => (
                    <li key={i} className="flex gap-3 text-zinc-300">
                      <span className="text-red-500 font-bold">0{i + 1}.</span>
                      {issue}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-green-950/30 p-6 rounded-xl border border-green-900/50">
                <h3 className="text-xl font-bold text-green-400 mb-4 border-b border-green-900/50 pb-2">Protocolos de Correção</h3>
                <ul className="space-y-4">
                  {TAY_DATA.safe_reproduction_instructions.steps.map((step, i) => (
                    <li key={i} className="text-zinc-300 text-sm bg-black/20 p-3 rounded border border-green-900/20">
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-zinc-800 p-6 rounded-xl border border-zinc-700 mt-6">
              <h3 className="font-bold text-white mb-2">System Prompt (Seguro)</h3>
              <p className="font-mono text-xs text-green-300 bg-black p-4 rounded leading-relaxed whitespace-pre-wrap">
                {TAY_DATA.propit.system_prompt}
              </p>
            </div>
          </div>
        );
      case Tab.JSON:
        return (
          <div className="h-[600px] animate-fade-in">
            <JsonViewer />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-zinc-200 font-sans selection:bg-tay-light selection:text-white">
      {/* Top Navigation */}
      <nav className="sticky top-0 z-50 bg-[#1e1e1e]/95 backdrop-blur-md border-b border-zinc-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="bg-tay-light p-2 rounded-lg">
                <Terminal size={20} className="text-white" />
              </div>
              <h1 className="text-lg font-bold text-white tracking-tight hidden sm:block">
                Tay <span className="text-zinc-500 font-normal">Explainer</span>
              </h1>
            </div>
            
            <div className="flex items-center space-x-1 overflow-x-auto no-scrollbar">
              {[
                { id: Tab.OVERVIEW, label: 'Visão Geral', icon: Activity },
                { id: Tab.ARCHITECTURE, label: 'Arquitetura', icon: Shield },
                { id: Tab.SIMULATION, label: 'Simulação', icon: Terminal },
                { id: Tab.VULNERABILITIES, label: 'Lições', icon: AlertOctagon },
                { id: Tab.JSON, label: 'Dados', icon: FileCode },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 whitespace-nowrap ${
                    activeTab === item.id
                      ? 'bg-zinc-800 text-tay-light ring-1 ring-zinc-700'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                  }`}
                >
                  <item.icon size={16} />
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 mt-12 py-8 bg-[#1e1e1e]">
         <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-zinc-500 text-sm mb-2">{TAY_DATA.legal_and_ethics.disclaimer}</p>
            <p className="text-zinc-600 text-xs">Generated for educational purposes using React & Gemini.</p>
         </div>
      </footer>
    </div>
  );
};

export default App;
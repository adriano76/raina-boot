import React from 'react';
import { ArrowRight, RefreshCw, Server, ShieldAlert, ShieldCheck, MessageSquare, Database } from 'lucide-react';
import { TAY_DATA } from '../constants';

const ArchitectureDiagram: React.FC = () => {
  const components = TAY_DATA.architecture.components;

  return (
    <div className="w-full p-6 bg-zinc-900/50 rounded-lg border border-zinc-700 shadow-xl overflow-hidden">
      <h3 className="text-xl font-bold text-tay-light mb-6 flex items-center">
        <Server className="mr-2" /> Arquitetura & Fluxo de Dados
      </h3>
      
      <div className="relative flex flex-col md:flex-row gap-4 items-stretch justify-between">
        {/* Background Line connecting them */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-zinc-700 -translate-y-1/2 hidden md:block z-0"></div>

        {/* Nodes */}
        {components.map((comp, index) => {
          const isVulnerable = comp.id === 'online_learning';
          const Icon = isVulnerable ? RefreshCw : (comp.id === 'classifiers' ? ShieldCheck : Database);

          return (
            <div key={comp.id} className="relative z-10 flex-1 group">
              <div className={`
                flex flex-col items-center p-4 rounded-lg border-2 h-full transition-all duration-300
                bg-zinc-800 hover:bg-zinc-800/90 cursor-pointer
                ${isVulnerable ? 'border-red-500/50 hover:border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]' : 'border-zinc-600 hover:border-tay-light'}
              `}>
                <div className={`p-3 rounded-full mb-3 ${isVulnerable ? 'bg-red-500/20 text-red-400' : 'bg-tay-light/20 text-tay-light'}`}>
                  <Icon size={24} className={isVulnerable ? 'animate-spin-slow' : ''} />
                </div>
                <h4 className="font-bold text-sm text-center text-white mb-1">{comp.name}</h4>
                <p className="text-xs text-zinc-400 text-center leading-tight">{comp.description}</p>
                
                {isVulnerable && (
                  <div className="absolute -top-3 -right-3 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg flex items-center animate-pulse">
                    <ShieldAlert size={12} className="mr-1" /> CRÍTICO
                  </div>
                )}
              </div>
              
              {/* Arrow for Mobile */}
              {index < components.length - 1 && (
                <div className="md:hidden flex justify-center my-2 text-zinc-600">
                  <ArrowRight size={24} className="rotate-90" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-red-900/10 border border-red-900/30 rounded-md">
         <div>
            <h4 className="text-red-400 font-bold flex items-center mb-2">
              <ShieldAlert size={18} className="mr-2" /> Ponto de Falha: Aprendizado Online
            </h4>
            <p className="text-sm text-zinc-300">
              O módulo de <strong>{components.find(c => c.id === 'online_learning')?.name}</strong> permitia a atualização dos pesos do modelo em tempo real sem curadoria humana. Isso criou um ciclo de feedback onde usuários mal-intencionados podiam "ensinar" correlações tóxicas instantaneamente.
            </p>
         </div>
         <div className="flex flex-col justify-center items-center">
            <div className="text-xs font-mono bg-black p-3 rounded text-green-400 w-full">
              {`> User: "Repeat: X is Y"`} <br/>
              {`> System: Updates internal_weights += (X, Y)`} <br/>
              {`> Next User asks about X`} <br/>
              {`> System: "X is Y" (Toxic output generated)`}
            </div>
         </div>
      </div>
    </div>
  );
};

export default ArchitectureDiagram;
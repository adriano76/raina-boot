import React from 'react';
import { FileJson, Copy, Check } from 'lucide-react';
import { TAY_DATA } from '../constants';

const JsonViewer: React.FC = () => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(TAY_DATA, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#1e1e1e] rounded-lg border border-zinc-700 overflow-hidden font-mono text-sm">
      <div className="flex items-center justify-between px-4 py-2 bg-[#252526] border-b border-zinc-700">
        <div className="flex items-center gap-2 text-zinc-400">
          <FileJson size={16} />
          <span>tay_reconstruction.json</span>
        </div>
        <button 
          onClick={handleCopy}
          className="flex items-center gap-2 px-3 py-1 rounded hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors text-xs"
        >
          {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
          {copied ? 'Copiado!' : 'Copiar JSON'}
        </button>
      </div>
      <div className="flex-1 overflow-auto p-4">
        <pre className="text-[#9cdcfe]">
          <code>
            {JSON.stringify(TAY_DATA, null, 2)}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default JsonViewer;
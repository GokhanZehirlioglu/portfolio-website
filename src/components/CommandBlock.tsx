import React from "react";
import { Info } from "lucide-react";

const CommandBlock: React.FC<{ title?: string; command: string; explanation?: string; output?: string }> = ({ title, command, explanation, output }) => (
    <div className="my-6 rounded-xl overflow-hidden border border-slate-700/50 bg-[#1e1e1e] shadow-xl">
        {title && (
            <div className="bg-slate-800/50 px-4 py-2 border-b border-slate-700/50 flex items-center justify-between">
                <span className="text-xs font-mono text-orange-400 font-bold uppercase tracking-wider">{title}</span>
                <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
                </div>
            </div>
        )}
        <div className="p-5 font-mono text-sm md:text-base cursor-text selection:bg-orange-500/30">
            <div className="text-emerald-400 whitespace-pre-wrap">{command}</div>
        </div>

        {output && (
            <div className="bg-black/40 p-4 border-t border-slate-700/30 font-mono text-sm text-slate-400">
                <div className="text-xs uppercase text-slate-500 mb-2 font-bold tracking-wider">// OUTPUT / VERIFICATION</div>
                <div className="whitespace-pre-wrap opacity-90">{output}</div>
            </div>
        )}

        {explanation && (
            <div className="bg-slate-800/20 p-4 border-t border-slate-700/50 flex gap-3 text-sm text-slate-400">
                <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <p>{explanation}</p>
            </div>
        )}
    </div>
);

export default CommandBlock;

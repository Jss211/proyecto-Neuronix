import React from 'react';
import { BarChart2, TrendingUp, Cpu, Activity, CheckCircle2, ArrowUpRight } from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in select-none">
      <div className="bg-[#0A1F3D] border border-edu-border rounded-xl p-5 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-edu-violet/15 border border-edu-violet/30 text-edu-violet">
            <BarChart2 className="w-6 h-6 text-edu-cyan" />
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-bold text-white">Telemetría Analítica del Modelo y MLOps</h2>
            <p className="text-xs text-slate-400 mt-0.5">Métricas de precisión, convergencia de pérdida y telemetría de inferencia</p>
          </div>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="bg-[#06152B] px-3 py-1.5 rounded-lg border border-edu-border text-edu-teal font-bold flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" /> PyTorch 2.2.0 • CUDA Activo
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#0A1F3D] border border-edu-border rounded-xl p-4 shadow-lg">
          <span className="text-xs text-slate-400">Pérdida Global (Loss)</span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-edu-cyan font-mono">0.0421</span>
            <span className="text-xs text-edu-teal font-semibold">-18.4% vs ep. 50</span>
          </div>
        </div>
        <div className="bg-[#0A1F3D] border border-edu-border rounded-xl p-4 shadow-lg">
          <span className="text-xs text-slate-400">Exactitud Multitarea (F1)</span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-white font-mono">94.8%</span>
            <span className="text-xs text-edu-teal font-semibold">+3.1%</span>
          </div>
        </div>
        <div className="bg-[#0A1F3D] border border-edu-border rounded-xl p-4 shadow-lg">
          <span className="text-xs text-slate-400">Latencia P99</span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-edu-violet font-mono">23.4 ms</span>
            <span className="text-xs text-edu-teal font-semibold">Óptimo</span>
          </div>
        </div>
        <div className="bg-[#0A1F3D] border border-edu-border rounded-xl p-4 shadow-lg">
          <span className="text-xs text-slate-400">Inferencias / Seg.</span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-edu-teal font-mono">1,840</span>
            <span className="text-xs text-edu-teal font-semibold">+12.8%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

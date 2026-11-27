import React from 'react';
import { 
  BarChart2, TrendingUp, Cpu, Activity, CheckCircle2, 
  ArrowUpRight, Server, ShieldCheck, Zap, Database, Terminal 
} from 'lucide-react';

export const MLOpsTelemetryView: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in select-none">
      {/* Encabezado */}
      <div className="bg-[#0A1F3D] border border-edu-border rounded-xl p-5 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="p-2.5 rounded-xl bg-edu-violet/15 border border-edu-violet/30 text-edu-violet">
            <Cpu className="w-6 h-6 text-edu-cyan" />
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
              Telemetría del Modelo MLOps y Despliegue en Azure
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-edu-teal/20 text-edu-teal border border-edu-teal/40">
                PyTorch v1.4.2-prod
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Supervisión de convergencia, latencia en tiempo real y métricas de inferencia en vm-neuronixmaster (40.116.69.29).
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="bg-[#06152B] px-3 py-1.5 rounded-lg border border-edu-border text-edu-teal font-bold flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" /> TorchScript Validado
          </span>
        </div>
      </div>

      {/* Tarjetas de Metricas Principales */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#0A1F3D] border border-edu-border rounded-xl p-4 shadow-lg hover:border-edu-cyan transition">
          <span className="text-xs text-slate-400 font-medium">Pérdida Global (Loss)</span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-edu-cyan font-mono">0.0421</span>
            <span className="text-xs text-edu-teal font-semibold">-18.4%</span>
          </div>
          <span className="text-[10px] text-slate-500 mt-1 block">BCE + Categorical CE</span>
        </div>

        <div className="bg-[#0A1F3D] border border-edu-border rounded-xl p-4 shadow-lg hover:border-edu-electric transition">
          <span className="text-xs text-slate-400 font-medium">Exactitud F1-Score</span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-white font-mono">94.8%</span>
            <span className="text-xs text-edu-teal font-semibold">+3.1%</span>
          </div>
          <span className="text-[10px] text-slate-500 mt-1 block">4 Cabezas Multitarea</span>
        </div>

        <div className="bg-[#0A1F3D] border border-edu-border rounded-xl p-4 shadow-lg hover:border-edu-violet transition">
          <span className="text-xs text-slate-400 font-medium">Latencia P99</span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-edu-violet font-mono">23.4 ms</span>
            <span className="text-xs text-edu-teal font-semibold">Óptimo</span>
          </div>
          <span className="text-[10px] text-slate-500 mt-1 block">Azure B2als_v2 Host</span>
        </div>

        <div className="bg-[#0A1F3D] border border-edu-border rounded-xl p-4 shadow-lg hover:border-edu-teal transition">
          <span className="text-xs text-slate-400 font-medium">Throughput</span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-edu-teal font-mono">1,840</span>
            <span className="text-xs text-edu-teal font-semibold">+12.8%</span>
          </div>
          <span className="text-[10px] text-slate-500 mt-1 block">Inferencias por Segundo</span>
        </div>
      </div>

      {/* Grafico de Convergencia de Perdida y Matriz de Confusion */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Curva de Perdida (Loss) (7 cols) */}
        <div className="lg:col-span-7 bg-[#0A1F3D] border border-edu-border rounded-xl p-5 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-edu-border/50">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-edu-cyan" />
              <h3 className="font-semibold text-white text-sm">Curva de Convergencia del Modelo (100 Épocas)</h3>
            </div>
            <div className="flex items-center gap-3 text-[10px] font-mono">
              <span className="flex items-center gap-1 text-edu-cyan">
                <span className="w-2 h-2 rounded-full bg-edu-cyan"></span> Entrenamiento
              </span>
              <span className="flex items-center gap-1 text-edu-teal">
                <span className="w-2 h-2 rounded-full bg-edu-teal"></span> Validación
              </span>
            </div>
          </div>

          <div className="mt-4 h-48 w-full">
            <svg viewBox="0 0 500 160" className="w-full h-full">
              <defs>
                <linearGradient id="lossGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#20C8F5" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#20C8F5" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Guias horizontales */}
              <line x1="0" y1="30" x2="500" y2="30" stroke="#0D2B52" strokeDasharray="3,3" />
              <line x1="0" y1="70" x2="500" y2="70" stroke="#0D2B52" strokeDasharray="3,3" />
              <line x1="0" y1="110" x2="500" y2="110" stroke="#0D2B52" strokeDasharray="3,3" />
              <line x1="0" y1="145" x2="500" y2="145" stroke="#0D2B52" />

              {/* Curva de Entrenamiento */}
              <path
                d="M 10 25 Q 70 65, 150 100 T 300 130 T 490 140 L 490 145 L 10 145 Z"
                fill="url(#lossGrad)"
              />
              <path
                d="M 10 25 Q 70 65, 150 100 T 300 130 T 490 140"
                fill="none"
                stroke="#20C8F5"
                strokeWidth="2.5"
              />

              {/* Curva de Validacion */}
              <path
                d="M 10 35 Q 80 75, 160 105 T 320 134 T 490 142"
                fill="none"
                stroke="#00BFA6"
                strokeWidth="2"
                strokeDasharray="4,4"
              />
            </svg>
            <div className="flex justify-between text-[10px] text-slate-400 font-mono px-2 -mt-2">
              <span>Época 0 (Loss: 0.84)</span>
              <span>Época 25</span>
              <span>Época 50</span>
              <span>Época 75</span>
              <span>Época 100 (Loss: 0.0421)</span>
            </div>
          </div>
        </div>

        {/* Matriz de Confusion (Cabeza C: Deteccion de Abandono) (5 cols) */}
        <div className="lg:col-span-5 bg-[#0A1F3D] border border-edu-border rounded-xl p-5 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-edu-border/50">
            <h3 className="font-semibold text-white text-sm">Matriz de Confusión (Cabeza C)</h3>
            <span className="text-[10px] font-mono text-edu-teal">96.2% Precisión</span>
          </div>

          <div className="grid grid-cols-2 gap-3 my-3">
            <div className="bg-[#06152B] p-3 rounded-xl border border-edu-teal/40 text-center">
              <span className="text-[10px] text-slate-400 block font-mono">Verdaderos Positivos</span>
              <strong className="text-xl font-bold text-edu-teal font-mono">1,180</strong>
              <span className="text-[9px] text-slate-500 block">Riesgo detectado a tiempo</span>
            </div>
            <div className="bg-[#06152B] p-3 rounded-xl border border-edu-border text-center">
              <span className="text-[10px] text-slate-400 block font-mono">Falsos Positivos</span>
              <strong className="text-xl font-bold text-amber-400 font-mono">24</strong>
              <span className="text-[9px] text-slate-500 block">Alerta benigna</span>
            </div>
            <div className="bg-[#06152B] p-3 rounded-xl border border-edu-border text-center">
              <span className="text-[10px] text-slate-400 block font-mono">Falsos Negativos</span>
              <strong className="text-xl font-bold text-red-400 font-mono">18</strong>
              <span className="text-[9px] text-slate-500 block">No detectado</span>
            </div>
            <div className="bg-[#06152B] p-3 rounded-xl border border-edu-teal/40 text-center">
              <span className="text-[10px] text-slate-400 block font-mono">Verdaderos Negativos</span>
              <strong className="text-xl font-bold text-edu-cyan font-mono">23,371</strong>
              <span className="text-[9px] text-slate-500 block">Permanencia confirmada</span>
            </div>
          </div>

          <div className="pt-2 border-t border-edu-border/40 text-[11px] text-slate-400 flex justify-between font-mono">
            <span>Sensibilidad (Recall): <strong className="text-white">98.5%</strong></span>
            <span>Especificidad: <strong className="text-white">99.8%</strong></span>
          </div>
        </div>
      </div>

      {/* Registro de Inferencias en Vivo (Live Stream Log Table) */}
      <div className="bg-[#0A1F3D] border border-edu-border rounded-xl p-5 shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-edu-border/50">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-edu-teal" />
            <h3 className="font-semibold text-white text-sm">Flujo de Inferencia en Tiempo Real (Azure Server)</h3>
          </div>
          <span className="text-[10px] font-mono text-edu-cyan">FastAPI /api/v1/events/stream</span>
        </div>

        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="text-slate-400 border-b border-edu-border/40">
                <th className="pb-2">Timestamp</th>
                <th className="pb-2">Endpoint</th>
                <th className="pb-2">Vector Entrada</th>
                <th className="pb-2">Predicción Cabeza</th>
                <th className="pb-2">Latencia</th>
                <th className="pb-2">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-edu-border/30 text-slate-300">
              <tr>
                <td className="py-2.5 text-slate-400">10:45:12.821</td>
                <td className="py-2.5 text-edu-cyan">POST /api/v1/predict/dropout</td>
                <td className="py-2.5">[0.94, 0.88, 12.0]</td>
                <td className="py-2.5 text-edu-teal">Bajo Riesgo (12%)</td>
                <td className="py-2.5 text-white">21.8 ms</td>
                <td className="py-2.5"><span className="px-2 py-0.5 rounded bg-edu-teal/20 text-edu-teal font-bold">200 OK</span></td>
              </tr>
              <tr>
                <td className="py-2.5 text-slate-400">10:45:11.402</td>
                <td className="py-2.5 text-edu-cyan">POST /api/v1/predict/mastery</td>
                <td className="py-2.5">[0.82, 0.91, 4.0]</td>
                <td className="py-2.5 text-edu-cyan">Dominio Alto (89%)</td>
                <td className="py-2.5 text-white">24.1 ms</td>
                <td className="py-2.5"><span className="px-2 py-0.5 rounded bg-edu-teal/20 text-edu-teal font-bold">200 OK</span></td>
              </tr>
              <tr>
                <td className="py-2.5 text-slate-400">10:45:09.914</td>
                <td className="py-2.5 text-edu-cyan">POST /api/v1/predict/recommend</td>
                <td className="py-2.5">[0.76, 0.89, 2.0]</td>
                <td className="py-2.5 text-edu-violet">Ranking Top-3 Generado</td>
                <td className="py-2.5 text-white">23.4 ms</td>
                <td className="py-2.5"><span className="px-2 py-0.5 rounded bg-edu-teal/20 text-edu-teal font-bold">200 OK</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

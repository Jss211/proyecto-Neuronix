import React from 'react';
import { NeuralVisualizer } from '../neural/NeuralVisualizer';
import { LearningProgressMap } from './LearningProgressMap';
import { 
  Users, BookOpen, Clock, Award, TrendingUp, Globe, 
  CheckCircle, ArrowUpRight, ChevronRight, Sparkles 
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-5 animate-in fade-in duration-500">
      {/* SECCION SUPERIOR: Visualizador Neuronal + Ingresos y Progreso */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Panel Izquierdo: Red Neuronal Animada (7 columnas) */}
        <div className="lg:col-span-7">
          <NeuralVisualizer initialState="INFERENCIA_ACTIVA" />
        </div>

        {/* Panel Derecho: Ingresos y Progreso Analitico (5 columnas) */}
        <div className="lg:col-span-5 bg-[#0A1F3D] border border-edu-border rounded-xl p-4 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-edu-border/50">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-edu-electric" />
                <h3 className="font-semibold text-white text-sm">Ingresos y Progreso Analítico</h3>
              </div>
              <div className="flex items-center gap-3 text-[10px]">
                <span className="flex items-center gap-1 text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-edu-electric"></span> Suscripciones
                </span>
                <span className="flex items-center gap-1 text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-edu-violet"></span> Cursos
                </span>
                <span className="flex items-center gap-1 text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-edu-teal"></span> Otros
                </span>
              </div>
            </div>

            <div className="mt-3">
              <span className="text-2xl font-bold text-white tracking-tight">$342,150</span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-slate-400">Total de Ingresos</span>
                <span className="text-xs font-semibold text-edu-teal flex items-center">
                  <ArrowUpRight className="w-3 h-3" /> +12.5% vs. mes anterior
                </span>
              </div>
            </div>

            {/* Grafico de Lineas SVG Luminoso */}
            <div className="mt-3 h-44 w-full">
              <svg viewBox="0 0 400 140" className="w-full h-full">
                <defs>
                  <linearGradient id="gradElectric" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#087FE5" stopOpacity="0.4"/>
                    <stop offset="100%" stopColor="#087FE5" stopOpacity="0.0"/>
                  </linearGradient>
                </defs>
                {/* Guias horizontales */}
                <line x1="0" y1="20" x2="400" y2="20" stroke="#0D2B52" strokeDasharray="3,3" />
                <line x1="0" y1="60" x2="400" y2="60" stroke="#0D2B52" strokeDasharray="3,3" />
                <line x1="0" y1="100" x2="400" y2="100" stroke="#0D2B52" strokeDasharray="3,3" />
                <line x1="0" y1="130" x2="400" y2="130" stroke="#0D2B52" />

                {/* Serie Suscripciones (Azul Electrico) */}
                <path
                  d="M 10 115 Q 80 95, 150 75 T 280 40 T 390 22 L 390 130 L 10 130 Z"
                  fill="url(#gradElectric)"
                />
                <path
                  d="M 10 115 Q 80 95, 150 75 T 280 40 T 390 22"
                  fill="none"
                  stroke="#087FE5"
                  strokeWidth="2.5"
                />

                {/* Serie Cursos (Violeta) */}
                <path
                  d="M 10 125 Q 90 115, 180 100 T 300 80 T 390 70"
                  fill="none"
                  stroke="#8B4DFF"
                  strokeWidth="2"
                />

                {/* Serie Otros (Teal) */}
                <path
                  d="M 10 128 Q 100 124, 200 120 T 310 115 T 390 110"
                  fill="none"
                  stroke="#00BFA6"
                  strokeWidth="1.5"
                />
              </svg>
              <div className="flex justify-between text-[9px] text-slate-400 px-1 -mt-2">
                <span>Ene</span><span>Feb</span><span>Mar</span><span>Abr</span><span>May</span><span>Jun</span>
                <span>Jul</span><span>Ago</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dic</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-edu-border/40 text-center mt-2">
            <div className="bg-[#06152B]/60 p-2 rounded-lg border border-edu-border/30">
              <span className="text-[10px] text-slate-400 block">Suscripciones</span>
              <strong className="text-xs text-edu-electric font-semibold">$342,150</strong>
            </div>
            <div className="bg-[#06152B]/60 p-2 rounded-lg border border-edu-border/30">
              <span className="text-[10px] text-slate-400 block">Cursos</span>
              <strong className="text-xs text-edu-violet font-semibold">$98,150</strong>
            </div>
            <div className="bg-[#06152B]/60 p-2 rounded-lg border border-edu-border/30">
              <span className="text-[10px] text-slate-400 block">Otros</span>
              <strong className="text-xs text-edu-teal font-semibold">$24,000</strong>
            </div>
          </div>
        </div>
      </div>

      {/* SECCION 2: 4 TARJETAS DE KPIS PRINCIPALES */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Alumnos */}
        <div className="bg-[#0A1F3D] border border-edu-border rounded-xl p-4 shadow-lg hover:border-edu-cyan transition">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Alumnos</span>
            <Users className="w-4 h-4 text-edu-cyan" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-xl md:text-2xl font-bold text-white">24,593</span>
            <span className="text-xs font-semibold text-edu-teal flex items-center">
              <ArrowUpRight className="w-3 h-3" /> +12.5%
            </span>
          </div>
        </div>

        {/* Cursos */}
        <div className="bg-[#0A1F3D] border border-edu-border rounded-xl p-4 shadow-lg hover:border-edu-electric transition">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Cursos</span>
            <BookOpen className="w-4 h-4 text-edu-electric" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-xl md:text-2xl font-bold text-white">1,248</span>
            <span className="text-xs font-semibold text-edu-teal flex items-center">
              <ArrowUpRight className="w-3 h-3" /> +14.2%
            </span>
          </div>
        </div>

        {/* Horas de Aprendizaje */}
        <div className="bg-[#0A1F3D] border border-edu-border rounded-xl p-4 shadow-lg hover:border-edu-violet transition">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Horas de Aprendizaje</span>
            <Clock className="w-4 h-4 text-edu-violet" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-xl md:text-2xl font-bold text-white">89,450</span>
            <span className="text-xs font-semibold text-edu-teal flex items-center">
              <ArrowUpRight className="w-3 h-3" /> +23.7%
            </span>
          </div>
        </div>

        {/* Certificaciones */}
        <div className="bg-[#0A1F3D] border border-edu-border rounded-xl p-4 shadow-lg hover:border-edu-teal transition">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Certificaciones</span>
            <Award className="w-4 h-4 text-edu-teal" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-xl md:text-2xl font-bold text-white">5,782</span>
            <span className="text-xs font-semibold text-edu-teal flex items-center">
              <ArrowUpRight className="w-3 h-3" /> +8.5%
            </span>
          </div>
        </div>
      </div>

      {/* SECCION 3: MAPA DE PROGRESO DE APRENDIZAJE + FINALIZACION DE CURSOS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Mapa Mundial de Progreso de Aprendizaje con Telemetria (7 cols) */}
        <div className="lg:col-span-7">
          <LearningProgressMap />
        </div>

        {/* Finalizacion de Cursos (Donut Chart) (5 cols) */}
        <div className="md:col-span-5 bg-[#0A1F3D] border border-edu-border rounded-xl p-4 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-edu-border/50">
            <h3 className="font-semibold text-white text-sm">Finalización de Cursos</h3>
            <span className="text-[11px] text-slate-400">Cohorte Activa</span>
          </div>

          <div className="flex items-center justify-center gap-6 my-2">
            {/* SVG Donut */}
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                <circle cx="50" cy="50" r="38" fill="none" stroke="#0D2B52" strokeWidth="12" />
                {/* 78% Completados (Teal) */}
                <circle 
                  cx="50" cy="50" r="38" fill="none" 
                  stroke="#00BFA6" strokeWidth="12"
                  strokeDasharray="238.7"
                  strokeDashoffset="52.5"
                  className="transition-all duration-1000"
                />
                {/* 15% En progreso (Violeta) */}
                <circle 
                  cx="50" cy="50" r="38" fill="none" 
                  stroke="#8B4DFF" strokeWidth="12"
                  strokeDasharray="238.7"
                  strokeDashoffset="202.9"
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute text-center">
                <span className="text-xl font-extrabold text-white">78%</span>
                <span className="text-[9px] text-slate-400 block -mt-1">Completados</span>
              </div>
            </div>

            {/* Leyenda */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-edu-teal"></span>
                <span className="text-slate-300">Completados</span>
                <strong className="text-white ml-auto">78%</strong>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-edu-violet"></span>
                <span className="text-slate-300">En Progreso</span>
                <strong className="text-white ml-auto">15%</strong>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-600"></span>
                <span className="text-slate-300">No Iniciados</span>
                <strong className="text-white ml-auto">7%</strong>
              </div>
            </div>
          </div>

          <div className="text-[10px] text-slate-400 text-center border-t border-edu-border/30 pt-2">
            Tasa de finalización general: <span className="text-edu-teal font-semibold">+12.5% vs cohorte 2025</span>
          </div>
        </div>
      </div>

      {/* SECCION 4: HEATMAP DE COMPETENCIAS + RECOMENDACIONES IA + ACTIVIDAD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Dominio de Habilidades - Heatmap (5 cols) */}
        <div className="lg:col-span-5 bg-[#0A1F3D] border border-edu-border rounded-xl p-4 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-edu-border/50">
            <h3 className="font-semibold text-white text-sm">Dominio de Habilidades - Mastery</h3>
            <span className="text-[10px] text-edu-cyan">Escala 0% - 100%</span>
          </div>

          <div className="mt-3 space-y-2 text-xs">
            {[
              { skill: 'Inteligencia Artificial', values: [95, 88, 82, 74, 60] },
              { skill: 'Machine Learning', values: [92, 85, 78, 70, 52] },
              { skill: 'Ciencia de Datos', values: [88, 80, 75, 65, 45] },
              { skill: 'Desarrollo Web', values: [90, 84, 80, 72, 58] },
              { skill: 'Nube y DevOps', values: [85, 76, 68, 55, 40] }
            ].map((row, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="w-32 text-[11px] text-slate-300 truncate">{row.skill}</span>
                <div className="flex-1 grid grid-cols-5 gap-1">
                  {row.values.map((v, cIdx) => {
                    const opacity = v / 100;
                    return (
                      <div 
                        key={cIdx} 
                        className="h-6 rounded flex items-center justify-center text-[9px] font-mono text-white/90"
                        style={{ backgroundColor: `rgba(139, 77, 255, ${opacity})` }}
                        title={`${v}%`}
                      >
                        {v}%
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
            <div className="flex justify-between text-[9px] text-slate-400 pl-32 pt-1">
              <span>Aprender</span><span>Practicar</span><span>Aplicar</span><span>Avanzado</span><span>Experto</span>
            </div>
          </div>
        </div>

        {/* Recomendaciones de IA (4 cols) */}
        <div className="lg:col-span-4 bg-[#0A1F3D] border border-edu-border rounded-xl p-4 shadow-xl">
          <div className="flex items-center justify-between pb-2 border-b border-edu-border/50">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-edu-violet" />
              <h3 className="font-semibold text-white text-sm">Recomendaciones de IA</h3>
            </div>
            <span className="text-[10px] text-slate-400">Cabeza D (Ranking)</span>
          </div>

          <div className="mt-3 space-y-2">
            {[
              { title: 'Repasa: Inteligencia Artificial Avanzada', color: 'border-l-edu-cyan' },
              { title: 'Completa: Machine Learning Básico', color: 'border-l-edu-electric' },
              { title: 'Sigue: Ruta de Ciencia de Datos', color: 'border-l-edu-violet' },
              { title: 'Realiza: Proyecto Final de Python', color: 'border-l-edu-teal' },
              { title: 'Explora: Nuevos Cursos en IA', color: 'border-l-amber-400' }
            ].map((rec, idx) => (
              <div
                key={idx}
                className={`flex items-center justify-between p-2.5 bg-[#06152B] border border-edu-border/30 rounded-lg hover:border-edu-electric transition border-l-4 ${rec.color} cursor-pointer group`}
              >
                <span className="text-[11px] text-slate-200 group-hover:text-white font-medium truncate">
                  {rec.title}
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-edu-cyan transition flex-shrink-0" />
              </div>
            ))}
          </div>
        </div>

        {/* Actividad Reciente (3 cols) */}
        <div className="lg:col-span-3 bg-[#0A1F3D] border border-edu-border rounded-xl p-4 shadow-xl">
          <div className="flex items-center justify-between pb-2 border-b border-edu-border/50">
            <h3 className="font-semibold text-white text-sm">Actividad Reciente</h3>
            <span className="text-[10px] text-edu-cyan cursor-pointer hover:underline">Ver todas</span>
          </div>

          <div className="mt-3 space-y-2.5">
            {[
              { text: 'Curso de Python completado', time: 'Hace 2 h', icon: CheckCircle, color: 'text-edu-teal' },
              { text: 'Certificado emitido correctamente', time: 'Hace 3 h', icon: Award, color: 'text-edu-cyan' },
              { text: 'Nuevo curso iniciado', time: 'Hace 5 h', icon: BookOpen, color: 'text-edu-electric' },
              { text: 'Examen de Machine Learning aprobado', time: 'Hace 1 día', icon: CheckCircle, color: 'text-edu-teal' },
              { text: 'Meta de aprendizaje alcanzada (90%)', time: 'Hace 1 día', icon: TrendingUp, color: 'text-edu-violet' }
            ].map((act, idx) => {
              const Icon = act.icon;
              return (
                <div key={idx} className="flex items-start gap-2 text-xs">
                  <Icon className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${act.color}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] text-slate-200 truncate">{act.text}</p>
                    <span className="text-[9px] text-slate-500">{act.time}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Home, Map, BookOpen, BarChart2, Bot, 
  CheckCircle, Award, Users2, Settings, ShieldCheck, 
  ChevronDown, ChevronRight, Sparkles, MessageSquare 
} from 'lucide-react';

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<Props> = ({ activeTab, setActiveTab }) => {
  const { user } = useAuth();

  // Estados de acordeón expandido para cada grupo
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    cursos: true,
    analisis: true,
    certificados: true
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <aside className="w-72 bg-[#0A1F3D] border-r border-edu-border flex flex-col justify-between shrink-0 min-h-screen select-none">
      <div>
        {/* Brand Logo Corporativo */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-edu-border/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-edu-electric to-edu-cyan flex items-center justify-center text-white font-extrabold text-sm shadow-lg shadow-edu-electric/25">
              EM
            </div>
            <div>
              <span className="font-extrabold text-base text-white tracking-tight">
                EduMaster<span className="text-edu-cyan">.pro</span>
              </span>
              <span className="text-[10px] text-slate-400 block -mt-1 font-mono">
                Enterprise Platform
              </span>
            </div>
          </div>
        </div>

        {/* Lista de Navegación en Formato Acordeón */}
        <nav className="p-4 space-y-1.5 overflow-y-auto max-h-[calc(100vh-230px)]">
          {/* 1. Item Directo: Resumen Principal */}
          <button
            onClick={() => setActiveTab('resumen')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
              activeTab === 'resumen'
                ? 'bg-edu-electric text-white shadow-lg shadow-edu-electric/25'
                : 'text-slate-300 hover:bg-edu-surface2 hover:text-white'
            }`}
          >
            <Home className={`w-4 h-4 ${activeTab === 'resumen' ? 'text-white' : 'text-slate-400'}`} />
            <span>Resumen del Sistema</span>
          </button>

          {/* 2. Acordeon: Cursos y Aprendizaje */}
          <div className="pt-2">
            <button
              onClick={() => toggleSection('cursos')}
              className="w-full flex items-center justify-between px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider hover:text-white transition"
            >
              <span className="flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5 text-edu-cyan" />
                Cursos y Rutas
              </span>
              {openSections.cursos ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            </button>

            {openSections.cursos && (
              <div className="mt-1 pl-2 space-y-1 animate-in fade-in">
                <button
                  onClick={() => setActiveTab('cursos')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition ${
                    activeTab === 'cursos'
                      ? 'bg-edu-electric/20 text-edu-cyan border border-edu-cyan/30'
                      : 'text-slate-300 hover:bg-edu-surface2 hover:text-white'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-edu-cyan"></span>
                  <span>Catálogo de Cursos</span>
                </button>
                <button
                  onClick={() => setActiveTab('planes')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition ${
                    activeTab === 'planes'
                      ? 'bg-edu-electric/20 text-edu-cyan border border-edu-cyan/30'
                      : 'text-slate-300 hover:bg-edu-surface2 hover:text-white'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-edu-violet"></span>
                  <span>Planes de Aprendizaje</span>
                </button>
              </div>
            )}
          </div>

          {/* 3. Acordeon: Analitica e Inteligencia Artificial */}
          <div className="pt-2">
            <button
              onClick={() => toggleSection('analisis')}
              className="w-full flex items-center justify-between px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider hover:text-white transition"
            >
              <span className="flex items-center gap-2">
                <BarChart2 className="w-3.5 h-3.5 text-edu-electric" />
                Analítica e IA
              </span>
              {openSections.analisis ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            </button>

            {openSections.analisis && (
              <div className="mt-1 pl-2 space-y-1 animate-in fade-in">
                <button
                  onClick={() => setActiveTab('analisis')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition ${
                    activeTab === 'analisis'
                      ? 'bg-edu-electric/20 text-edu-cyan border border-edu-cyan/30'
                      : 'text-slate-300 hover:bg-edu-surface2 hover:text-white'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-edu-electric"></span>
                  <span>Telemetría del Modelo MLOps</span>
                </button>
                <button
                  onClick={() => setActiveTab('ai-tutor')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition ${
                    activeTab === 'ai-tutor'
                      ? 'bg-edu-electric/20 text-edu-cyan border border-edu-cyan/30'
                      : 'text-slate-300 hover:bg-edu-surface2 hover:text-white'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-edu-teal"></span>
                  <span>Tutor IA Explicable</span>
                </button>
              </div>
            )}
          </div>

          {/* 4. Acordeon: Acreditacion y Certificados */}
          <div className="pt-2">
            <button
              onClick={() => toggleSection('certificados')}
              className="w-full flex items-center justify-between px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider hover:text-white transition"
            >
              <span className="flex items-center gap-2">
                <Award className="w-3.5 h-3.5 text-edu-teal" />
                Certificación
              </span>
              {openSections.certificados ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            </button>

            {openSections.certificados && (
              <div className="mt-1 pl-2 space-y-1 animate-in fade-in">
                <button
                  onClick={() => setActiveTab('certificados')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition ${
                    activeTab === 'certificados'
                      ? 'bg-edu-teal/20 text-edu-teal border border-edu-teal/30 font-semibold'
                      : 'text-slate-300 hover:bg-edu-surface2 hover:text-white'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-edu-teal"></span>
                  <span>Certificados con QR</span>
                </button>
                <button
                  onClick={() => setActiveTab('evaluaciones')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition ${
                    activeTab === 'evaluaciones'
                      ? 'bg-edu-teal/20 text-edu-teal border border-edu-teal/30'
                      : 'text-slate-300 hover:bg-edu-surface2 hover:text-white'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                  <span>Evaluaciones Continuas</span>
                </button>
              </div>
            )}
          </div>

          {/* 5. Item Directo: Comunidad y Chat en Vivo */}
          <div className="pt-2">
            <button
              onClick={() => setActiveTab('comunidad')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                activeTab === 'comunidad'
                  ? 'bg-edu-electric text-white shadow-lg shadow-edu-electric/25'
                  : 'text-slate-300 hover:bg-edu-surface2 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Users2 className={`w-4 h-4 ${activeTab === 'comunidad' ? 'text-white' : 'text-slate-400'}`} />
                <span>Comunidad & Chat</span>
              </div>
              <span className="px-1.5 py-0.5 rounded-full text-[9px] bg-edu-teal/25 text-edu-teal font-mono">
                En Vivo
              </span>
            </button>
          </div>

          {/* 6. Item Directo: Configuracion */}
          <button
            onClick={() => setActiveTab('configuracion')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
              activeTab === 'configuracion'
                ? 'bg-edu-electric text-white shadow-lg shadow-edu-electric/25'
                : 'text-slate-300 hover:bg-edu-surface2 hover:text-white'
            }`}
          >
            <Settings className={`w-4 h-4 ${activeTab === 'configuracion' ? 'text-white' : 'text-slate-400'}`} />
            <span>Configuración</span>
          </button>
        </nav>
      </div>

      {/* Widgets Inferiores del Sidebar: Precision Gauge y Alumnos Conectados */}
      <div className="p-4 space-y-3 border-t border-edu-border/40">
        {/* Circular Gauge de Precision */}
        <div className="bg-[#06152B] border border-edu-border/40 rounded-xl p-3 flex items-center gap-3">
          <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
            <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#0D2B52"
                strokeWidth="3.5"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#20C8F5"
                strokeWidth="3.5"
                strokeDasharray="99.8, 100"
              />
            </svg>
            <ShieldCheck className="w-4 h-4 text-edu-cyan absolute" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block">Precisión Neuronal</span>
            <strong className="text-sm font-bold text-white font-mono">99.8%</strong>
            <span className="text-[9px] text-edu-teal block font-semibold">+2.4% este mes</span>
          </div>
        </div>

        {/* Alumnos Conectados */}
        <div className="bg-[#06152B] border border-edu-border/40 rounded-xl p-3">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] text-slate-400 font-medium">Cohorte en Línea</span>
            <span className="w-2 h-2 rounded-full bg-edu-teal animate-pulse"></span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex -space-x-2">
              <img className="w-6 h-6 rounded-full border border-edu-surface" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" alt="user1" />
              <img className="w-6 h-6 rounded-full border border-edu-surface" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" alt="user2" />
              <img className="w-6 h-6 rounded-full border border-edu-surface" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100" alt="user3" />
            </div>
            <span className="text-[10px] text-slate-400 font-mono">+24 activos</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

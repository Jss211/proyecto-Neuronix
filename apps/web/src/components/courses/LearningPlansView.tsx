import React from 'react';
import { 
  Map, CheckCircle2, Circle, Lock, ArrowRight, Play, 
  Sparkles, Clock, Target, Award, Calendar, Flame 
} from 'lucide-react';

interface LearningRoadmap {
  id: string;
  title: string;
  category: string;
  progress: number;
  totalHours: string;
  completedSteps: number;
  totalSteps: number;
  description: string;
  steps: {
    title: string;
    description: string;
    status: 'COMPLETADO' | 'EN_CURSO' | 'BLOQUEADO';
    duration: string;
  }[];
}

const ROADMAPS: LearningRoadmap[] = [
  {
    id: 'r1',
    title: 'Ruta Especialista en Deep Learning & Arquitecturas Neuronales',
    category: 'Especialización Central',
    progress: 100,
    totalHours: '96 horas',
    completedSteps: 4,
    totalSteps: 4,
    description: 'De tensores y backpropagation a modelos recurrentes GRU y cabezas multitarea validados en PyTorch.',
    steps: [
      { title: '1. Fundamentos de Tensores y Autograd', description: 'Grafos de computación y operaciones matriciales aceleradas por GPU.', status: 'COMPLETADO', duration: '20h' },
      { title: '2. Redes Densas y Backpropagation', description: 'Descenso del gradiente estocástico y optimizadores Adam.', status: 'COMPLETADO', duration: '24h' },
      { title: '3. Redes Recurrentes GRU & Memoria Temporal', description: 'Modelado secuencial de comportamiento de estudiantes en plataforma.', status: 'COMPLETADO', duration: '28h' },
      { title: '4. Fusión Multitarea y Evaluación con PyTorch', description: 'Predicción simultánea de finalización, dominio y detección de deserción.', status: 'COMPLETADO', duration: '24h' }
    ]
  },
  {
    id: 'r2',
    title: 'Ruta Arquitecto Cloud MLOps & Infraestructura Azure',
    category: 'Ingeniería Cloud',
    progress: 45,
    totalHours: '80 horas',
    completedSteps: 2,
    totalSteps: 4,
    description: 'Despliegue escalable en máquinas virtuales Ubuntu B2als_v2, Docker Compose, FastAPI y Nginx.',
    steps: [
      { title: '1. Contenerización con Docker y Docker Compose', description: 'Creación de imágenes ligeras para frontend Vite y backend Python.', status: 'COMPLETADO', duration: '18h' },
      { title: '2. Servidores Cloud Azure e IP Pública', description: 'Aprovisionamiento de la VM vm-neuronixmaster (40.116.69.29).', status: 'COMPLETADO', duration: '22h' },
      { title: '3. Servidores de Inferencia en Tiempo Real con FastAPI', description: 'Transmisión de eventos de telemetría y endpoints REST autenticados.', status: 'EN_CURSO', duration: '20h' },
      { title: '4. Monitoreo Continuo y CI/CD en Producción', description: 'Supervisión de latencia, fallbacks y despliegue automático.', status: 'BLOQUEADO', duration: '20h' }
    ]
  },
  {
    id: 'r3',
    title: 'Ruta Científico de Datos & Análisis Predictivo',
    category: 'Ciencia de Datos',
    progress: 75,
    totalHours: '70 horas',
    completedSteps: 3,
    totalSteps: 4,
    description: 'Análisis de cohortes de aprendizaje, reducción de dimensionalidad y matrices de confusión.',
    steps: [
      { title: '1. Análisis Exploratorio y Limpieza de Datos', description: 'Tratamiento de valores atípicos y normalización estándar.', status: 'COMPLETADO', duration: '16h' },
      { title: '2. Modelos Clásicos y XGBoost', description: 'Árboles de decisión y ensambles para clasificación binaria.', status: 'COMPLETADO', duration: '20h' },
      { title: '3. Detección Preventiva de Abandono (Head C)', description: 'Calibración de probabilidades y matrices de confusión.', status: 'COMPLETADO', duration: '18h' },
      { title: '4. Tableros Analíticos en Tiempo Real', description: 'Integración con Supabase Realtime y WebSockets en tiempo real.', status: 'EN_CURSO', duration: '16h' }
    ]
  }
];

export const LearningPlansView: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in select-none">
      {/* Encabezado */}
      <div className="bg-[#0A1F3D] border border-edu-border rounded-xl p-5 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="p-2.5 rounded-xl bg-edu-violet/15 border border-edu-violet/30 text-edu-violet">
            <Map className="w-6 h-6 text-edu-cyan" />
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
              Planes y Rutas de Aprendizaje Guiadas
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-edu-teal/20 text-edu-teal border border-edu-teal/40">
                Secuencia Activa
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Trayectorias profesionales diseñadas para garantizar la progresión y obtención de certificaciones oficiales.
            </p>
          </div>
        </div>

        {/* Metricas de Compromiso Semanal */}
        <div className="flex items-center gap-3 font-mono text-xs">
          <div className="bg-[#06152B] px-3 py-2 rounded-xl border border-edu-border flex items-center gap-2 text-slate-300">
            <Flame className="w-4 h-4 text-amber-400" />
            <div>
              <span className="text-[10px] text-slate-400 block">Racha de Estudio</span>
              <strong className="text-white">14 días activos</strong>
            </div>
          </div>
          <div className="bg-[#06152B] px-3 py-2 rounded-xl border border-edu-border flex items-center gap-2 text-slate-300">
            <Target className="w-4 h-4 text-edu-teal" />
            <div>
              <span className="text-[10px] text-slate-400 block">Meta Semanal</span>
              <strong className="text-edu-teal">12h / 12h (100%)</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Listado de Rutas de Aprendizaje */}
      <div className="space-y-6">
        {ROADMAPS.map((roadmap) => (
          <div
            key={roadmap.id}
            className="bg-[#0A1F3D] border border-edu-border rounded-xl p-6 shadow-xl"
          >
            {/* Cabecera de la Ruta */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-edu-border/50 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-edu-electric/20 text-edu-cyan border border-edu-electric/40">
                  {roadmap.category}
                </span>
                <h3 className="text-base md:text-lg font-bold text-white mt-1.5">{roadmap.title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{roadmap.description}</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="text-xs text-slate-400 block">Progreso de la Ruta</span>
                  <strong className="text-base font-bold text-white font-mono">{roadmap.progress}%</strong>
                </div>
                <div className="w-16 h-16 relative flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#06152B"
                      strokeWidth="3.5"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke={roadmap.progress === 100 ? '#00BFA6' : '#20C8F5'}
                      strokeWidth="3.5"
                      strokeDasharray={`${roadmap.progress}, 100`}
                    />
                  </svg>
                  <Award className="w-5 h-5 text-edu-cyan absolute" />
                </div>
              </div>
            </div>

            {/* Pasos / Hitos de la Ruta (Linea de Tiempo) */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
              {roadmap.steps.map((step, sIdx) => {
                const isCompleted = step.status === 'COMPLETADO';
                const isInProgress = step.status === 'EN_CURSO';
                const isLocked = step.status === 'BLOQUEADO';

                return (
                  <div
                    key={sIdx}
                    className={`p-4 rounded-xl border transition relative flex flex-col justify-between ${
                      isCompleted
                        ? 'bg-[#06152B]/80 border-edu-teal/40'
                        : isInProgress
                        ? 'bg-edu-electric/10 border-edu-cyan shadow-lg shadow-edu-cyan/10'
                        : 'bg-[#06152B]/40 border-edu-border/30 opacity-60'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono text-slate-400">{step.duration}</span>
                        {isCompleted && (
                          <span className="p-1 rounded-full bg-edu-teal/20 text-edu-teal">
                            <CheckCircle2 className="w-4 h-4" />
                          </span>
                        )}
                        {isInProgress && (
                          <span className="p-1 rounded-full bg-edu-cyan/20 text-edu-cyan animate-pulse">
                            <Circle className="w-4 h-4 fill-edu-cyan" />
                          </span>
                        )}
                        {isLocked && (
                          <span className="p-1 rounded-full bg-slate-800 text-slate-500">
                            <Lock className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </div>

                      <h4 className={`font-bold text-xs ${isInProgress ? 'text-edu-cyan' : 'text-white'}`}>
                        {step.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                        {step.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-2 border-t border-edu-border/30">
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${
                        isCompleted ? 'text-edu-teal' : isInProgress ? 'text-edu-cyan' : 'text-slate-500'
                      }`}>
                        {step.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { 
  CheckCircle, Clock, Award, FileText, ChevronRight, 
  HelpCircle, CheckCircle2, AlertCircle, BarChart2, Sparkles 
} from 'lucide-react';

interface Evaluation {
  id: string;
  title: string;
  course: string;
  score: number;
  maxScore: number;
  status: 'CALIFICADO' | 'PENDIENTE';
  date: string;
  feedback: string;
  rubric: { criterion: string; points: number; maxPoints: number }[];
}

const EVALUATIONS: Evaluation[] = [
  {
    id: 'e1',
    title: 'Examen Parcial: Arquitecturas Tensoriales y Celdas GRU',
    course: 'Arquitectura de Redes Neuronales y Deep Learning con PyTorch',
    score: 19.5,
    maxScore: 20,
    status: 'CALIFICADO',
    date: '24 de Noviembre de 2026',
    feedback: 'Excelente rigor en la demostración analítica de las compuertas de reinicio y actualización. La implementación en PyTorch demostró código limpio y vectorizado.',
    rubric: [
      { criterion: 'Fundamentación matemática de tensores', points: 4.0, maxPoints: 4.0 },
      { criterion: 'Programación de capas GRU en PyTorch', points: 4.0, maxPoints: 4.0 },
      { criterion: 'Optimización y regularización Dropout', points: 3.5, maxPoints: 4.0 },
      { criterion: 'Evaluación y métricas de convergencia', points: 4.0, maxPoints: 4.0 },
      { criterion: 'Sustentación técnica y claridad', points: 4.0, maxPoints: 4.0 }
    ]
  },
  {
    id: 'e2',
    title: 'Laboratorio Práctico: Descenso de Gradiente Estocástico (SGD)',
    course: 'Machine Learning Empresarial y Análisis Predictivo',
    score: 18.8,
    maxScore: 20,
    status: 'CALIFICADO',
    date: '20 de Noviembre de 2026',
    feedback: 'Implementación correcta del algoritmo de optimización Adam y comparación gráfica de curvas de pérdida.',
    rubric: [
      { criterion: 'Preprocesamiento de datos y normalización', points: 4.0, maxPoints: 4.0 },
      { criterion: 'Función de costo y cálculo de gradientes', points: 3.8, maxPoints: 4.0 },
      { criterion: 'Convergencia y visualización de épocas', points: 4.0, maxPoints: 4.0 },
      { criterion: 'Análisis de matriz de confusión', points: 3.5, maxPoints: 4.0 },
      { criterion: 'Conclusiones y reporte técnico', points: 3.5, maxPoints: 4.0 }
    ]
  },
  {
    id: 'e3',
    title: 'Proyecto Final Integrador: Inferencia Multitarea en Azure Cloud',
    course: 'Arquitectura de Redes Neuronales y Deep Learning con PyTorch',
    score: 0,
    maxScore: 20,
    status: 'PENDIENTE',
    date: '28 de Noviembre de 2026',
    feedback: 'Entrega final y sustentación ante jurado académico. Proyecto desplegado en la máquina virtual vm-neuronixmaster (40.116.69.29).',
    rubric: [
      { criterion: 'Arquitectura de 2 entradas y 4 cabezas', points: 0, maxPoints: 5.0 },
      { criterion: 'Despliegue con Docker y FastAPI en Azure', points: 0, maxPoints: 5.0 },
      { criterion: 'Visualizador sincrónico de axones y tensores', points: 0, maxPoints: 5.0 },
      { criterion: 'Defensa oral y dominio de preguntas', points: 0, maxPoints: 5.0 }
    ]
  }
];

export const EvaluationsView: React.FC = () => {
  const [selectedEval, setSelectedEval] = useState<Evaluation>(EVALUATIONS[0]);

  return (
    <div className="space-y-6 animate-in fade-in select-none">
      {/* Encabezado */}
      <div className="bg-[#0A1F3D] border border-edu-border rounded-xl p-5 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="p-2.5 rounded-xl bg-edu-cyan/15 border border-edu-cyan/30 text-edu-cyan">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
              Evaluaciones Continuas y Rúbricas Oficiales
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-edu-teal/20 text-edu-teal border border-edu-teal/40">
                Promedio Ponderado: 19.15
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Desglose detallado de criterios evaluados, notas certificadas y retroalimentación del docente.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="bg-[#06152B] px-3 py-1.5 rounded-lg border border-edu-border text-slate-300">
            Aprobadas: <strong className="text-edu-teal font-bold">2 / 2</strong>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Lista de Evaluaciones (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1 block">
            Historial de Evaluaciones de la Cohorte
          </span>

          {EVALUATIONS.map((ev) => {
            const isSelected = selectedEval.id === ev.id;
            const isGraded = ev.status === 'CALIFICADO';

            return (
              <div
                key={ev.id}
                onClick={() => setSelectedEval(ev)}
                className={`p-4 rounded-xl border cursor-pointer transition flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#06152B] border-edu-cyan shadow-lg shadow-edu-cyan/15'
                    : 'bg-[#0A1F3D] border-edu-border hover:border-edu-border/80'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] text-slate-400 font-mono">{ev.date}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isGraded
                          ? 'bg-edu-teal/20 text-edu-teal border border-edu-teal/40'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      }`}
                    >
                      {ev.status}
                    </span>
                  </div>

                  <h3 className="font-bold text-xs text-white leading-snug">{ev.title}</h3>
                  <p className="text-[11px] text-slate-400 mt-1">{ev.course}</p>
                </div>

                <div className="mt-3 pt-2 border-t border-edu-border/40 flex items-center justify-between">
                  <span className="text-xs text-slate-400">Calificación:</span>
                  {isGraded ? (
                    <strong className="text-sm font-bold text-edu-teal font-mono">
                      {ev.score} / {ev.maxScore} (Sobresaliente)
                    </strong>
                  ) : (
                    <span className="text-xs text-amber-300 font-semibold font-mono">Pendiente de Sustentación</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Detalle y Rubrica de la Evaluacion Seleccionada (7 cols) */}
        <div className="lg:col-span-7 bg-[#0A1F3D] border border-edu-border rounded-xl p-5 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-edu-border/50 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-edu-cyan font-mono">
                  Rúbrica de Calificación Oficial
                </span>
                <h3 className="font-extrabold text-base text-white mt-0.5">{selectedEval.title}</h3>
              </div>
              {selectedEval.status === 'CALIFICADO' && (
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block font-mono">Nota Final</span>
                  <span className="text-xl font-bold text-edu-teal font-mono">{selectedEval.score} / {selectedEval.maxScore}</span>
                </div>
              )}
            </div>

            {/* Retroalimentación del Docente */}
            <div className="mt-4 p-3 rounded-xl bg-[#06152B] border border-edu-border/60">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">
                Comentarios y Devolución del Docente:
              </span>
              <p className="text-xs text-slate-200 leading-relaxed italic">
                "{selectedEval.feedback}"
              </p>
            </div>

            {/* Desglose de Criterios de la Rubrica */}
            <div className="mt-5 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Desglose por Competencias Evaluadas:
              </h4>

              <div className="space-y-2">
                {selectedEval.rubric.map((r, rIdx) => (
                  <div key={rIdx} className="bg-[#06152B]/60 p-3 rounded-lg border border-edu-border/40 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-edu-teal shrink-0" />
                      <span className="text-slate-200 font-medium">{r.criterion}</span>
                    </div>
                    <span className="font-mono font-bold text-edu-cyan whitespace-nowrap">
                      {selectedEval.status === 'CALIFICADO' ? `${r.points} / ${r.maxPoints} pts` : `- / ${r.maxPoints} pts`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-3 border-t border-edu-border/40 text-[11px] text-slate-400 flex justify-between font-mono">
            <span>Evaluador: Profesor Carlos Zambrano</span>
            <span>Firma Digital: Validada en Azure</span>
          </div>
        </div>
      </div>
    </div>
  );
};

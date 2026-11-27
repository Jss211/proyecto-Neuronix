import React, { useState } from 'react';
import { 
  Users, AlertTriangle, CheckSquare, BarChart3, 
  Send, UserCheck, Search, Filter 
} from 'lucide-react';
import { DropoutAlert } from '../../types';

const INITIAL_ALERTS: DropoutAlert[] = [
  {
    id: 'alt-01',
    student_name: 'Luis Alberto García',
    course: 'Deep Learning y Redes Convolucionales',
    risk_score: 0.78,
    risk_level: 'CRITICO',
    inactive_days: 12,
    missing_assignments: 2,
    suggested_action: 'Enviar recordatorio y sesión de tutoría 1 a 1'
  },
  {
    id: 'alt-02',
    student_name: 'Mariana Paredes Soto',
    course: 'Machine Learning para Negocios',
    risk_score: 0.64,
    risk_level: 'MODERADO',
    inactive_days: 8,
    missing_assignments: 1,
    suggested_action: 'Revisar dudas en el foro de discusión'
  },
  {
    id: 'alt-03',
    student_name: 'Jorge Huamán Castro',
    course: 'Arquitectura Cloud y MLOps',
    risk_score: 0.45,
    risk_level: 'BAJO',
    inactive_days: 5,
    missing_assignments: 0,
    suggested_action: 'Monitoreo regular'
  }
];

export const DocenteDashboard: React.FC = () => {
  const [alerts, setAlerts] = useState<DropoutAlert[]>(INITIAL_ALERTS);
  const [intervened, setIntervened] = useState<Record<string, boolean>>({});

  const handleIntervene = (id: string) => {
    setIntervened(prev => ({ ...prev, [id]: true }));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Resumen del Instructor */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#0A1F3D] border border-edu-border rounded-xl p-4 shadow-lg">
          <span className="text-xs text-slate-400 font-medium">Estudiantes a Cargo</span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-white">418</span>
            <span className="text-xs text-edu-cyan font-semibold">3 Cursos</span>
          </div>
        </div>

        <div className="bg-[#0A1F3D] border border-edu-border rounded-xl p-4 shadow-lg">
          <span className="text-xs text-slate-400 font-medium">Alertas de Deserción</span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-amber-400">7 Alumnos</span>
            <span className="text-xs text-amber-400 font-semibold">Cabeza C (IA)</span>
          </div>
        </div>

        <div className="bg-[#0A1F3D] border border-edu-border rounded-xl p-4 shadow-lg">
          <span className="text-xs text-slate-400 font-medium">Promedio de Evaluaciones</span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-edu-teal">16.4 / 20</span>
            <span className="text-xs text-edu-teal font-semibold">+1.2 pts</span>
          </div>
        </div>

        <div className="bg-[#0A1F3D] border border-edu-border rounded-xl p-4 shadow-lg">
          <span className="text-xs text-slate-400 font-medium">Entregas Pendientes</span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-edu-electric">14</span>
            <span className="text-xs text-slate-400">Por calificar</span>
          </div>
        </div>
      </div>

      {/* MODULO PRINCIPAL: Alertas Tempranas de Abandono (Cabeza C) */}
      <div className="bg-[#0A1F3D] border border-edu-border rounded-xl p-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between pb-4 border-b border-edu-border/50 gap-2">
          <div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              <h3 className="font-semibold text-white text-base">
                Detección Temprana de Riesgo de Abandono
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Estimación predictiva de desconexión generada por la red neuronal para intervención docente humana.
            </p>
          </div>
          <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-300 rounded-full text-xs font-medium">
            Supervisión Docente Activa
          </span>
        </div>

        {/* Tabla de Alumnos en Riesgo */}
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#06152B] text-slate-400 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-3">Estudiante</th>
                <th className="p-3">Curso Asignado</th>
                <th className="p-3">Riesgo IA</th>
                <th className="p-3">Inactividad</th>
                <th className="p-3">Tareas Pendientes</th>
                <th className="p-3">Acción Recomendada</th>
                <th className="p-3 text-right">Intervención</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-edu-border/30">
              {alerts.map((al) => {
                const isDone = intervened[al.id];
                return (
                  <tr key={al.id} className="hover:bg-edu-surface2/30 transition">
                    <td className="p-3 font-medium text-white flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-edu-electric/20 border border-edu-electric/40 flex items-center justify-center text-[10px] text-edu-cyan font-bold">
                        {al.student_name.charAt(0)}
                      </div>
                      {al.student_name}
                    </td>
                    <td className="p-3 text-slate-300">{al.course}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        al.risk_level === 'CRITICO' ? 'bg-red-500/20 text-red-400 border border-red-500/40' :
                        al.risk_level === 'MODERADO' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' :
                        'bg-edu-teal/20 text-edu-teal border border-edu-teal/40'
                      }`}>
                        {(al.risk_score * 100).toFixed(0)}% ({al.risk_level})
                      </span>
                    </td>
                    <td className="p-3 text-slate-300">{al.inactive_days} días</td>
                    <td className="p-3 text-slate-300 font-semibold">{al.missing_assignments}</td>
                    <td className="p-3 text-slate-400 italic">{al.suggested_action}</td>
                    <td className="p-3 text-right">
                      {isDone ? (
                        <span className="text-edu-teal font-medium text-xs flex items-center justify-end gap-1">
                          <UserCheck className="w-4 h-4" /> Notificado
                        </span>
                      ) : (
                        <button
                          onClick={() => handleIntervene(al.id)}
                          className="px-2.5 py-1 bg-edu-electric hover:bg-edu-cyan hover:text-[#06152B] text-white rounded text-xs font-medium transition flex items-center gap-1 ml-auto"
                        >
                          <Send className="w-3 h-3" /> Intervenir
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Validacion de Competencias (Skill Mastery por Cohorte) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-[#0A1F3D] border border-edu-border rounded-xl p-5 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-edu-border/50">
            <h3 className="font-semibold text-white text-sm">Validación Docente de Evidencias</h3>
            <span className="text-[11px] text-slate-400">Rúbricas Oficiales</span>
          </div>

          <div className="mt-4 space-y-3">
            {[
              { student: 'Ana Lucía Torres', skill: 'Optimización Adam & Loss Functions', score: '18 / 20', state: 'Pendiente' },
              { student: 'Marcos Vinicius Díaz', skill: 'Transformers & Self-Attention', score: '19 / 20', state: 'Aprobado' },
              { student: 'Elena Morales Ruiz', skill: 'Regularización Dropout & BatchNorm', score: '15 / 20', state: 'Pendiente' }
            ].map((ev, idx) => (
              <div key={idx} className="p-3 bg-[#06152B] border border-edu-border/40 rounded-lg flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-semibold text-white">{ev.student}</h4>
                  <p className="text-[11px] text-slate-400">{ev.skill}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-edu-cyan">{ev.score}</span>
                  <button className="p-1 bg-edu-teal/20 text-edu-teal border border-edu-teal/40 rounded hover:bg-edu-teal hover:text-white transition">
                    <CheckSquare className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Panel de Asistencia y Rendimiento */}
        <div className="bg-[#0A1F3D] border border-edu-border rounded-xl p-5 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-edu-border/50">
              <h3 className="font-semibold text-white text-sm">Asistencia de Cohorte en Tiempo Real</h3>
              <span className="text-[11px] text-edu-teal font-semibold">94.2% Asistencia Promedio</span>
            </div>
            <p className="text-xs text-slate-300 mt-3 leading-relaxed">
              Las métricas transaccionales se actualizan automáticamente con cada entrega de actividad en la plataforma.
              El 88% de los estudiantes completaron el laboratorio de PyTorch antes de la fecha límite.
            </p>
          </div>

          <div className="p-3 bg-[#06152B] border border-edu-border/30 rounded-lg mt-4 flex items-center justify-between text-xs">
            <span className="text-slate-400">Próxima sesión sincrónica:</span>
            <strong className="text-white">Mañana, 19:00 hrs</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

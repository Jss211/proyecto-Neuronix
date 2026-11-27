import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Settings, Server, ShieldCheck, 
  Users, Sliders, CheckCircle2, Save, GraduationCap, 
  Award, Bell, Check, Cpu, Globe 
} from 'lucide-react';

export const AdminConfigView: React.FC = () => {
  const { user } = useAuth();
  const [learningRate, setLearningRate] = useState<number>(0.001);
  const [dropoutRate, setDropoutRate] = useState<number>(0.20);
  const [batchSize, setBatchSize] = useState<number>(64);
  const [minPassingGrade, setMinPassingGrade] = useState<number>(14.0);
  const [dropoutThreshold, setDropoutThreshold] = useState<number>(60);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 animate-in fade-in select-none">
      {/* Encabezado */}
      <div className="bg-[#0A1F3D] border border-edu-border rounded-xl p-5 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="p-2.5 rounded-xl bg-edu-electric/15 border border-edu-electric/30 text-edu-electric">
            <Settings className="w-6 h-6 text-edu-cyan" />
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
              Configuración y Gobierno de la Plataforma Enterprise
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-edu-electric/20 text-edu-cyan border border-edu-electric/40">
                Nivel: Administrador
              </span>
            </h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Políticas académicas, parámetros del modelo de inferencia y control de cuentas institucionales.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="bg-[#06152B] px-3 py-1.5 rounded-lg border border-edu-border text-slate-300">
            Usuario Activo: <strong className="text-edu-cyan font-bold">{user?.name} ({user?.role})</strong>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Panel Izquierdo: Políticas Institucionales y Servidor Cloud (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Servidor Cloud Azure */}
          <div className="bg-[#0A1F3D] border border-edu-border rounded-xl p-5 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-edu-border/50">
              <div className="flex items-center gap-2">
                <Server className="w-4 h-4 text-edu-cyan" />
                <h3 className="font-bold text-white text-sm">Servidor Cloud y Cómputo (Microsoft Azure)</h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-edu-teal/20 text-edu-teal border border-edu-teal/40 font-bold">
                EN LÍNEA (99.98% UPTIME)
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4 text-xs">
              <div className="bg-[#06152B] p-3 rounded-lg border border-edu-border/40">
                <span className="text-[10px] text-slate-400 block font-mono">Nodo Virtual</span>
                <strong className="text-white font-mono">vm-neuronixmaster</strong>
              </div>
              <div className="bg-[#06152B] p-3 rounded-lg border border-edu-border/40">
                <span className="text-[10px] text-slate-400 block font-mono">Dirección IP Pública</span>
                <strong className="text-edu-cyan font-mono">40.116.69.29</strong>
              </div>
              <div className="bg-[#06152B] p-3 rounded-lg border border-edu-border/40">
                <span className="text-[10px] text-slate-400 block font-mono">Región Geográfica</span>
                <strong className="text-slate-200">North Central US</strong>
              </div>
              <div className="bg-[#06152B] p-3 rounded-lg border border-edu-border/40">
                <span className="text-[10px] text-slate-400 block font-mono">Motor de Inferencia</span>
                <strong className="text-white">PyTorch TorchScript</strong>
              </div>
              <div className="bg-[#06152B] p-3 rounded-lg border border-edu-border/40">
                <span className="text-[10px] text-slate-400 block font-mono">Sistema Operativo</span>
                <strong className="text-slate-200">Ubuntu 24.04 LTS</strong>
              </div>
              <div className="bg-[#06152B] p-3 rounded-lg border border-edu-border/40">
                <span className="text-[10px] text-slate-400 block font-mono">Latencia de Red (P99)</span>
                <strong className="text-edu-teal font-mono">23.4 ms</strong>
              </div>
            </div>
          </div>

          {/* Políticas Académicas y Reglas del Sistema (Reemplazo profesional del endpoint crudo) */}
          <div className="bg-[#0A1F3D] border border-edu-border rounded-xl p-5 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-edu-border/50">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-edu-teal" />
                <h3 className="font-bold text-white text-sm">Políticas Académicas y Reglas de Evaluación</h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-edu-electric/20 text-edu-cyan border border-edu-electric/40 font-bold">
                VIGENTES
              </span>
            </div>

            <div className="space-y-3 mt-4 text-xs">
              <div className="p-3 bg-[#06152B] rounded-lg border border-edu-border/40 flex items-center justify-between">
                <div>
                  <strong className="text-white block font-medium">Escala Oficial de Calificaciones</strong>
                  <span className="text-[11px] text-slate-400">Sistema vigesimal estándar (0.0 a 20.0). Nota mínima para aprobación:</span>
                </div>
                <span className="px-2.5 py-1 rounded-md bg-[#0A1F3D] border border-edu-cyan/30 text-edu-cyan font-bold font-mono">
                  14.0 / 20.0
                </span>
              </div>

              <div className="p-3 bg-[#06152B] rounded-lg border border-edu-border/40 flex items-center justify-between">
                <div>
                  <strong className="text-white block font-medium">Criterio de Emisión Automática de Certificados</strong>
                  <span className="text-[11px] text-slate-400">Genera diploma con firma criptográfica SHA-256 y código QR ISO al superar:</span>
                </div>
                <span className="px-2.5 py-1 rounded-md bg-[#0A1F3D] border border-edu-teal/30 text-edu-teal font-bold font-mono">
                  18.0 / 20.0
                </span>
              </div>

              <div className="p-3 bg-[#06152B] rounded-lg border border-edu-border/40 flex items-center justify-between">
                <div>
                  <strong className="text-white block font-medium">Umbral de Alerta Temprana de Abandono (Cabeza C)</strong>
                  <span className="text-[11px] text-slate-400">Notifica automáticamente al docente si la probabilidad calculada supera:</span>
                </div>
                <span className="px-2.5 py-1 rounded-md bg-[#0A1F3D] border border-edu-violet/30 text-edu-violet font-bold font-mono">
                  60% de Riesgo
                </span>
              </div>

              <div className="p-3 bg-[#06152B] rounded-lg border border-edu-border/40 flex items-center justify-between">
                <div>
                  <strong className="text-white block font-medium">Ledger de Seguridad y Trazabilidad</strong>
                  <span className="text-[11px] text-slate-400">Firmado digital de credenciales respaldado en el nodo Azure</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-edu-teal/15 text-edu-teal border border-edu-teal/30">
                  ACTIVO
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Panel Derecho: Hiperparámetros PyTorch y Control de Cuentas (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Hiperparámetros de la Red PyTorch */}
          <div className="bg-[#0A1F3D] border border-edu-border rounded-xl p-5 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-edu-border/50">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-edu-cyan" />
                <h3 className="font-bold text-white text-sm">Hiperparámetros de la Red PyTorch</h3>
              </div>
            </div>

            <form onSubmit={handleSaveConfig} className="mt-4 space-y-4 text-xs">
              <div>
                <div className="flex justify-between mb-1 text-slate-300 font-mono">
                  <span>Tasa de Aprendizaje (Learning Rate):</span>
                  <strong className="text-edu-cyan">{learningRate}</strong>
                </div>
                <input
                  type="range"
                  min="0.0001"
                  max="0.01"
                  step="0.0001"
                  value={learningRate}
                  onChange={(e) => setLearningRate(parseFloat(e.target.value))}
                  className="w-full accent-edu-cyan"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1 text-slate-300 font-mono">
                  <span>Tasa de Regularización Dropout:</span>
                  <strong className="text-edu-violet">{(dropoutRate * 100).toFixed(0)}%</strong>
                </div>
                <input
                  type="range"
                  min="0.05"
                  max="0.50"
                  step="0.05"
                  value={dropoutRate}
                  onChange={(e) => setDropoutRate(parseFloat(e.target.value))}
                  className="w-full accent-edu-violet"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1 text-slate-300 font-mono">
                  <span>Tamaño de Lote (Batch Size):</span>
                  <strong className="text-edu-teal">{batchSize} muestras</strong>
                </div>
                <select
                  value={batchSize}
                  onChange={(e) => setBatchSize(parseInt(e.target.value))}
                  className="w-full bg-[#06152B] border border-edu-border rounded-lg p-2 text-white font-mono"
                >
                  <option value={32}>32 muestras por lote</option>
                  <option value={64}>64 muestras por lote (Predeterminado)</option>
                  <option value={128}>128 muestras por lote</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-edu-electric hover:bg-edu-electric/90 text-white rounded-xl font-bold flex items-center justify-center gap-1.5 transition shadow-lg shadow-edu-electric/25"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{savedSuccess ? 'Parámetros Guardados Exitosamente' : 'Guardar Parámetros en Servidor'}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Cuentas y Control de Acceso (RBAC) con NOMBRES ACTUALIZADOS */}
          <div className="bg-[#0A1F3D] border border-edu-border rounded-xl p-5 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-edu-border/50">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-edu-teal" />
                <h3 className="font-bold text-white text-sm">Cuentas y Control de Acceso (RBAC)</h3>
              </div>
            </div>

            <div className="mt-3 space-y-2.5 text-xs">
              {/* Administrador: Dr. Segura */}
              <div className="p-3 rounded-xl bg-[#06152B] border border-edu-border/50 flex items-center justify-between">
                <div>
                  <strong className="text-white block text-sm">Dr. Segura</strong>
                  <span className="text-[11px] text-slate-400 font-mono">admin@edumaster.ai</span>
                  <span className="text-[10px] text-edu-cyan block mt-0.5">Director Académico & Administrador General</span>
                </div>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-edu-electric/25 text-edu-cyan font-mono border border-edu-electric/40">
                  ADMIN
                </span>
              </div>

              {/* Docente: Profesor Carlos Zambrano */}
              <div className="p-3 rounded-xl bg-[#06152B] border border-edu-border/50 flex items-center justify-between">
                <div>
                  <strong className="text-white block text-sm">Profesor Carlos Zambrano</strong>
                  <span className="text-[11px] text-slate-400 font-mono">docente@edumaster.ai</span>
                  <span className="text-[10px] text-edu-violet block mt-0.5">Instructor Principal de Inteligencia Artificial</span>
                </div>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-edu-violet/25 text-edu-violet font-mono border border-edu-violet/40">
                  DOCENTE
                </span>
              </div>

              {/* Estudiante: Jordan Rojas */}
              <div className="p-3 rounded-xl bg-[#06152B] border border-edu-border/50 flex items-center justify-between">
                <div>
                  <strong className="text-white block text-sm">Jordan Rojas</strong>
                  <span className="text-[11px] text-slate-400 font-mono">estudiante@edumaster.ai</span>
                  <span className="text-[10px] text-edu-teal block mt-0.5">Estudiante de Especialización (Promedio: 19.5)</span>
                </div>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-edu-teal/25 text-edu-teal font-mono border border-edu-teal/40">
                  ESTUDIANTE
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

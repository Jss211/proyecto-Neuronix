import React, { useState, useEffect } from 'react';
import { ModelState } from '../../types';
import { Play, Pause, RotateCcw, Activity, Cpu, CheckCircle2, Zap, Maximize2, Minimize2 } from 'lucide-react';

interface Props {
  initialState?: ModelState;
}

interface LayerConfig {
  id: string;
  name: string;
  color: string;
  x: number;
  neurons: { id: string; label: string; activation: number; role: string }[];
}

const LAYERS_CONFIG: LayerConfig[] = [
  {
    id: 'input',
    name: 'NIVEL DE ENTRADA',
    color: '#20C8F5',
    x: 180,
    neurons: [
      { id: 'in_1', label: 'Rendimiento Académico', activation: 0.94, role: 'Puntajes de evaluaciones, exámenes y entregas' },
      { id: 'in_2', label: 'Actividad en Plataforma', activation: 0.88, role: 'Frecuencia de sesiones, tiempo activo y lecciones' }
    ]
  },
  {
    id: 'embeddings',
    name: 'ESTUDIANTES (PROYECCIÓN)',
    color: '#087FE5',
    x: 390,
    neurons: [
      { id: 'emb_1', label: 'Vector Perfil Académico', activation: 0.82, role: 'Representación densa de competencias previas' },
      { id: 'emb_2', label: 'Compromiso de Aprendizaje', activation: 0.91, role: 'Tendencia de persistencia y hábitos de estudio' },
      { id: 'emb_3', label: 'Ritmo de Asimilación', activation: 0.76, role: 'Tiempo de resolución entre intentos' },
      { id: 'emb_4', label: 'Interacción Comunitaria', activation: 0.89, role: 'Participación en debates y foros' }
    ]
  },
  {
    id: 'gru',
    name: 'ANÁLISIS TEMPORAL (GRU)',
    color: '#8B4DFF',
    x: 600,
    neurons: [
      { id: 'gru_1', label: 'Secuencia Recurrente h1', activation: 0.87, role: 'Memoria de corto plazo de eventos recientes' },
      { id: 'gru_2', label: 'Secuencia Recurrente h2', activation: 0.93, role: 'Memoria de largo plazo de retención conceptual' },
      { id: 'gru_3', label: 'Atención Temporal h3', activation: 0.85, role: 'Detección de puntos de quiebre o dificultad' },
      { id: 'gru_4', label: 'Fusión Multitarea h4', activation: 0.90, role: 'Vector latente unificado antes de predicción' }
    ]
  },
  {
    id: 'output',
    name: 'SALIDA MULTITAREA',
    color: '#00BFA6',
    x: 810,
    neurons: [
      { id: 'out_1', label: 'Recomendaciones IA', activation: 0.96, role: 'Cabeza D: Ranking de contenidos personalizados' },
      { id: 'out_2', label: 'Rutas de Aprendizaje', activation: 0.89, role: 'Cabeza B: Estimación de dominio de competencias' },
      { id: 'out_3', label: 'Alerta de Riesgo Abandono', activation: 0.12, role: 'Cabeza C: Detección preventiva de desconexión' },
      { id: 'out_4', label: 'Probabilidad Finalización', activation: 0.94, role: 'Cabeza A: Tasa estimada de culminación' }
    ]
  }
];

export const NeuralVisualizer: React.FC<Props> = ({ initialState = 'INFERENCIA_ACTIVA' }) => {
  const [modelState, setModelState] = useState<ModelState>(initialState);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [speed, setSpeed] = useState<number>(1);
  const [selectedNeuron, setSelectedNeuron] = useState<any | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Etapas del recorrido (0: Entrada, 1: Capa 2, 2: Capa 3, 3: Salida, 4: Pausa de lectura de resultados)
  const [currentStage, setCurrentStage] = useState<number>(0);
  const [pulseProgress, setPulseProgress] = useState<number>(0);

  useEffect(() => {
    if (!isPlaying || modelState === 'DETENIDO' || modelState === 'ERROR') return;

    let animId: number;
    let lastTime = performance.now();

    const loop = (time: number) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      setPulseProgress((prev) => {
        const next = prev + dt * (0.95 * speed);
        if (next >= 1.0) {
          setCurrentStage((stage) => {
            if (stage >= 2) {
              return 3; // Inferencia completa: pausa para lectura de resultados
            }
            return stage + 1;
          });
          return 0.0;
        }
        return next;
      });

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, modelState, speed]);

  // Manejo de la pausa en la etapa final de salida
  useEffect(() => {
    if (currentStage === 3) {
      const timeout = setTimeout(() => {
        setCurrentStage(0);
        setPulseProgress(0);
      }, 2600 / speed);
      return () => clearTimeout(timeout);
    }
  }, [currentStage, speed]);

  const getYPosition = (_layerId: string, index: number, total: number) => {
    const centerY = 175;
    if (total === 2) {
      return index === 0 ? centerY - 55 : centerY + 55;
    }
    const spacing = 58;
    const startY = centerY - ((total - 1) * spacing) / 2;
    return startY + index * spacing;
  };

  return (
    <div className={isFullscreen ? "fixed inset-0 z-50 bg-[#06152B] p-6 flex flex-col justify-between overflow-hidden shadow-2xl animate-in fade-in select-none" : "bg-[#0A1F3D] border border-edu-border rounded-xl p-4 shadow-xl flex flex-col h-full select-none"}>
      {/* Header del Panel */}
      <div className="flex flex-wrap items-center justify-between pb-3 border-b border-edu-border/50 gap-2">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-edu-cyan" />
          <h3 className="font-semibold text-white tracking-wide text-sm md:text-base">
            Arquitectura de Aprendizaje Inteligente
          </h3>
          <span className="px-2.5 py-0.5 text-xs font-medium rounded-full border bg-edu-cyan/20 text-edu-cyan border-edu-cyan/40 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-edu-teal animate-ping"></span>
            En vivo
          </span>
        </div>

        {/* Controles de Animacion */}
        <div className="flex items-center gap-2">
          <select 
            value={modelState}
            onChange={(e) => setModelState(e.target.value as ModelState)}
            className="bg-[#06152B] text-xs text-slate-300 border border-edu-border rounded px-2.5 py-1 focus:outline-none focus:border-edu-electric"
          >
            <option value="INFERENCIA_ACTIVA">Inferencia Activa (Propagación)</option>
            <option value="ENTRENANDO">Entrenando (Retropropagación)</option>
            <option value="VALIDANDO">Validando Modelo</option>
            <option value="DETENIDO">Detenido</option>
          </select>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 bg-[#06152B] hover:bg-edu-surface2 text-edu-cyan border border-edu-border rounded transition"
            title={isPlaying ? 'Pausar' : 'Reanudar'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => {
              setCurrentStage(0);
              setPulseProgress(0);
              setSelectedNeuron(null);
            }}
            className="p-1.5 bg-[#06152B] hover:bg-edu-surface2 text-slate-400 border border-edu-border rounded transition"
            title="Reiniciar Recorrido"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center gap-1 bg-[#06152B] border border-edu-border rounded px-1.5 py-0.5">
            {[0.5, 1, 2].map((s) => (
              <button
                key={s}
                onClick={() => setSpeed(s)}
                className={`text-[10px] px-1.5 py-0.5 rounded ${speed === s ? 'bg-edu-electric text-white font-bold' : 'text-slate-400'}`}
              >
                {s}x
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 bg-[#06152B] hover:bg-edu-surface2 text-edu-cyan border border-edu-border rounded transition"
            title={isFullscreen ? 'Restaurar tamaño normal' : 'Maximizar / Pantalla Completa (Presentación)'}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Visualizador SVG de Alta Fidelidad */}
      <div className="relative flex-1 min-h-[330px] w-full mt-2 flex items-center justify-center overflow-hidden">
        <svg 
          viewBox="0 0 1020 350" 
          className="w-full h-full max-h-[380px]"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <filter id="neonGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="particleGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* SINOPSIS Y FLUJO FLUIDO ENTRE CAPAS */}
          {LAYERS_CONFIG.map((layer, lIdx) => {
            if (lIdx === LAYERS_CONFIG.length - 1) return null;
            const nextLayer = LAYERS_CONFIG[lIdx + 1];
            const isWaveActive = currentStage === lIdx && isPlaying;
            const beamColor = lIdx === 0 ? '#20C8F5' : lIdx === 1 ? '#8B4DFF' : '#00BFA6';

            return layer.neurons.map((_, n1) => {
              const y1 = getYPosition(layer.id, n1, layer.neurons.length);

              return nextLayer.neurons.map((_, n2) => {
                const y2 = getYPosition(nextLayer.id, n2, nextLayer.neurons.length);
                
                const cp1x = layer.x + (nextLayer.x - layer.x) * 0.45;
                const cp2x = layer.x + (nextLayer.x - layer.x) * 0.55;
                const pathD = `M ${layer.x} ${y1} C ${cp1x} ${y1}, ${cp2x} ${y2}, ${nextLayer.x} ${y2}`;

                // Distancia real de la curva sinaptica
                const approxLength = Math.hypot(nextLayer.x - layer.x, y2 - y1);

                // Longitud del haz de luz
                const dashLen = 36;
                // Al inicio (pulseProgress = 0) el haz comienza exactamente en el nodo emisor (s = 0)
                // Al final (pulseProgress = 1) arriba con precision milimetrica al nodo receptor (s = approxLength)
                const dashOffset = dashLen - pulseProgress * (approxLength + dashLen);

                return (
                  <g key={`syn-${lIdx}-${n1}-${n2}`}>
                    {/* Linea base de conexion axonal */}
                    <path
                      d={pathD}
                      fill="none"
                      stroke={isWaveActive ? 'rgba(8, 127, 229, 0.35)' : 'rgba(8, 127, 229, 0.12)'}
                      strokeWidth={isWaveActive ? 1.4 : 0.8}
                    />

                    {/* Haz de energia luminosa (parte desde el inicio exacto y viajan sincronizados al unísono) */}
                    {isWaveActive && (
                      <path
                        d={pathD}
                        fill="none"
                        stroke={beamColor}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeDasharray={`${dashLen} 3000`}
                        strokeDashoffset={dashOffset}
                        filter="url(#neonGlow)"
                        opacity={0.95}
                      />
                    )}
                  </g>
                );
              });
            });
          })}

          {/* CAPAS Y NODOS TENSORIALES */}
          {LAYERS_CONFIG.map((layer, lIdx) => {
            const isLayerActive = currentStage === lIdx || (currentStage === 3 && lIdx === 3);

            return (
              <g key={layer.id}>
                {/* Título de Capa */}
                <text
                  x={layer.x}
                  y={28}
                  textAnchor="middle"
                  fill="#94A3B8"
                  fontSize="10"
                  fontWeight="700"
                  letterSpacing="0.8"
                >
                  {layer.name}
                </text>

                {/* Nodos */}
                {layer.neurons.map((neuron, nIdx) => {
                  const y = getYPosition(layer.id, nIdx, layer.neurons.length);
                  const isSelected = selectedNeuron?.id === neuron.id;

                  return (
                    <g
                      key={neuron.id}
                      className="cursor-pointer group"
                      onClick={() => setSelectedNeuron(neuron)}
                    >
                      {/* Anillo de pulso centrado exactamente en el nodo (sin desbordamiento) */}
                      {isLayerActive && (
                        <circle
                          cx={layer.x}
                          cy={y}
                          r={20}
                          fill="none"
                          stroke={layer.color}
                          strokeWidth="1.5"
                          opacity="0.5"
                        >
                          <animate
                            attributeName="r"
                            values="15;24;15"
                            dur="1.4s"
                            repeatCount="indefinite"
                          />
                          <animate
                            attributeName="opacity"
                            values="0.6;0.1;0.6"
                            dur="1.4s"
                            repeatCount="indefinite"
                          />
                        </circle>
                      )}

                      {/* Halo exterior de resplandor */}
                      <circle
                        cx={layer.x}
                        cy={y}
                        r={isSelected ? 18 : 15}
                        fill="#06152B"
                        stroke={layer.color}
                        strokeWidth={isSelected ? 3 : isLayerActive ? 2.5 : 1.5}
                        filter={isLayerActive || isSelected ? 'url(#neonGlow)' : undefined}
                        className="transition-all duration-300"
                      />

                      {/* Núcleo interior activo */}
                      <circle
                        cx={layer.x}
                        cy={y}
                        r={neuron.activation * 8}
                        fill={layer.color}
                        fillOpacity={isLayerActive ? 0.95 : 0.6}
                      />

                      {/* Punto central */}
                      <circle cx={layer.x} cy={y} r={2.5} fill="#FFFFFF" />

                      {/* TEXTO IZQUIERDO: Capa 1 */}
                      {lIdx === 0 && (
                        <text
                          x={layer.x - 24}
                          y={y + 4}
                          textAnchor="end"
                          fill="#E2E8F0"
                          fontSize="11"
                          fontWeight="600"
                          className="group-hover:fill-edu-cyan transition"
                        >
                          {neuron.label}
                        </text>
                      )}

                      {/* TEXTO DERECHO: Capa 4 */}
                      {lIdx === LAYERS_CONFIG.length - 1 && (
                        <g>
                          <text
                            x={layer.x + 24}
                            y={y + 4}
                            textAnchor="start"
                            fill="#E2E8F0"
                            fontSize="11"
                            fontWeight="600"
                            className="group-hover:fill-edu-teal transition"
                          >
                            {neuron.label}
                          </text>
                          {currentStage === 3 && (
                            <text
                              x={layer.x + 24}
                              y={y + 18}
                              textAnchor="start"
                              fill="#00BFA6"
                              fontSize="10"
                              fontWeight="bold"
                              fontFamily="monospace"
                            >
                              Confianza: {(neuron.activation * 100).toFixed(0)}%
                            </text>
                          )}
                        </g>
                      )}
                    </g>
                  );
                })}
              </g>
            );
          })}
        </svg>

        {/* Modal de Inspección de Nodo */}
        {selectedNeuron && (
          <div className="absolute top-2 right-4 bg-[#06152B]/95 border border-edu-cyan/50 rounded-xl p-3.5 text-xs shadow-2xl backdrop-blur-md max-w-[240px] animate-in fade-in z-20">
            <div className="flex items-center justify-between border-b border-slate-700 pb-2 mb-2">
              <span className="font-semibold text-edu-cyan flex items-center gap-1.5">
                <Cpu className="w-4 h-4" /> Inspección Neuronal
              </span>
              <button 
                onClick={() => setSelectedNeuron(null)}
                className="text-slate-400 hover:text-white font-bold text-sm"
              >
                ×
              </button>
            </div>
            <p className="text-white font-bold text-xs">{selectedNeuron.label}</p>
            <p className="text-[10px] text-slate-400 mt-1">{selectedNeuron.role}</p>

            <div className="mt-3 space-y-1.5 text-slate-300 text-[11px] font-mono border-t border-slate-800 pt-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Activación:</span>
                <span className="text-edu-teal font-bold">{(selectedNeuron.activation * 100).toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Función:</span>
                <span className="text-edu-violet">ReLU / GRU</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Operación:</span>
                <span className="text-slate-200">W·x + b</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Barra de Estado Inferior */}
      <div className="flex flex-wrap items-center justify-between pt-2.5 border-t border-edu-border/40 text-xs text-slate-400 mt-2 gap-2">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-slate-300">
            <Zap className={`w-3.5 h-3.5 ${currentStage === 3 ? 'text-edu-teal' : 'text-edu-cyan animate-pulse'}`} />
            Fase: <strong className="text-white font-semibold">
              {currentStage === 0 && '1. Entrada: Rendimiento y Actividad'}
              {currentStage === 1 && '2. Proyección Latente de Estudiantes'}
              {currentStage === 2 && '3. Análisis Temporal GRU y Despacho Multitarea'}
              {currentStage === 3 && 'Inferencia Completa (Evaluando Resultados)'}
            </strong>
          </span>
        </div>

        <div className="flex items-center gap-4 text-[11px] font-mono">
          <span>Loss: <strong className="text-edu-cyan">0.0421</strong></span>
          <span>Latencia: <strong className="text-white">23.4 ms</strong></span>
          <span className="text-edu-teal flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> PyTorch Validado
          </span>
        </div>
      </div>
    </div>
  );
};

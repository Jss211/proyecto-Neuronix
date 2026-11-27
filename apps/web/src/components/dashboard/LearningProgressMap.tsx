import React, { useState } from 'react';
import { BarChart2, ArrowUpRight, Radio, Activity } from 'lucide-react';

interface RegionStat {
  id: string;
  name: string;
  count: string;
  growth: string;
  latency: string;
  activeNodes: number;
  // Coordenadas absolutas en el viewBox de 2000 x 857 del mapa mundial real
  mapX: number;
  mapY: number;
  // Posicionamiento responsivo de las tarjetas flotantes
  cardClass: string;
}

const REGION_STATS: RegionStat[] = [
  {
    id: 'na',
    name: 'América del Norte',
    count: '8,450',
    growth: '+12.5%',
    latency: '18 ms',
    activeNodes: 142,
    mapX: 480,
    mapY: 310,
    cardClass: 'top-[12%] left-[4%]'
  },
  {
    id: 'eu',
    name: 'Europa',
    count: '6,120',
    growth: '+8.9%',
    latency: '74 ms',
    activeNodes: 98,
    mapX: 1060,
    mapY: 235,
    cardClass: 'top-[10%] left-[45%] -translate-x-1/2'
  },
  {
    id: 'as',
    name: 'Asia',
    count: '7,890',
    growth: '+11.3%',
    latency: '110 ms',
    activeNodes: 126,
    mapX: 1460,
    mapY: 320,
    cardClass: 'top-[30%] right-[3%]'
  },
  {
    id: 'sa',
    name: 'América del Sur',
    count: '2,980',
    growth: '+6.7%',
    latency: '82 ms',
    activeNodes: 54,
    mapX: 680,
    mapY: 590,
    cardClass: 'bottom-[8%] left-[5%]'
  },
  {
    id: 'af',
    name: 'África',
    count: '1,820',
    growth: '+5.1%',
    latency: '128 ms',
    activeNodes: 36,
    mapX: 1090,
    mapY: 480,
    cardClass: 'bottom-[6%] left-[36%]'
  },
  {
    id: 'oc',
    name: 'Oceanía',
    count: '1,760',
    growth: '+4.8%',
    latency: '145 ms',
    activeNodes: 28,
    mapX: 1730,
    mapY: 670,
    cardClass: 'bottom-[6%] right-[3%]'
  }
];

export const LearningProgressMap: React.FC = () => {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  return (
    <div className="bg-[#0A1F3D] border border-edu-border rounded-xl p-4 md:p-5 shadow-xl relative overflow-hidden select-none">
      {/* Cabecera del Panel */}
      <div className="flex items-center justify-between pb-3 border-b border-edu-border/50 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-edu-electric/15 border border-edu-electric/30 text-edu-electric">
            <BarChart2 className="w-4 h-4 text-edu-cyan" />
          </div>
          <div>
            <h3 className="font-semibold text-white text-sm md:text-base tracking-wide flex items-center gap-2">
              Mapa de Progreso de Aprendizaje
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono bg-[#06152B] border border-edu-border/60 text-edu-teal">
            <Radio className="w-3 h-3 text-edu-cyan animate-pulse" />
            Azure 40.116.69.29 (US Central)
          </span>
        </div>
      </div>

      {/* Contenedor del Mapa Mundial Real de Alta Definición */}
      <div className="relative w-full h-[380px] md:h-[430px] mt-2 overflow-hidden rounded-xl bg-[#06152B]/70 border border-edu-border/30 flex items-center justify-center">
        {/* Mapa Mundial Vectorial Real (Geográficamente Auténtico) */}
        <img
          src="/world-map.svg"
          alt="Mapa Mundial de Aprendizaje"
          className="absolute inset-0 w-full h-full object-fill opacity-80 pointer-events-none select-none"
        />

        {/* Capa SVG Superior: Puntos Radiantes, Halos y Enlaces Sinápticos */}
        <svg
          viewBox="0 0 2000 857"
          className="absolute inset-0 w-full h-full pointer-events-none"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Gradiente Radial para Gran Halo de Resplandor Azul en Cada Región */}
            <radialGradient id="hotspotGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#20C8F5" stopOpacity="0.95" />
              <stop offset="35%" stopColor="#087FE5" stopOpacity="0.5" />
              <stop offset="70%" stopColor="#06152B" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#06152B" stopOpacity="0" />
            </radialGradient>

            <filter id="mapPointGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Arcos Sinápticos Intercontinentales hacia Azure (Hub Central de Inferencia) */}
          <g fill="none" opacity="0.35">
            {REGION_STATS.map((stat) => (
              <path
                key={`line-${stat.id}`}
                d={`M 480 310 Q ${(480 + stat.mapX) / 2} ${Math.min(310, stat.mapY) - 70}, ${stat.mapX} ${stat.mapY}`}
                stroke={hoveredRegion === stat.id ? '#20C8F5' : '#087FE5'}
                strokeWidth={hoveredRegion === stat.id ? '2.5' : '1.2'}
                strokeDasharray="6,8"
              />
            ))}
          </g>

          {/* Puntos de Telemetría Radiantes en Cada Continente */}
          {REGION_STATS.map((stat) => {
            const isHovered = hoveredRegion === stat.id;
            return (
              <g key={`hotspot-${stat.id}`} className="transition-all duration-300">
                {/* Gran Halo Radiante de Luz Azul Luminoso */}
                <circle
                  cx={stat.mapX}
                  cy={stat.mapY}
                  r={isHovered ? 110 : 80}
                  fill="url(#hotspotGlow)"
                  className="transition-all duration-300"
                />

                {/* Anillo de Pulso Expansivo Sincronizado */}
                <circle
                  cx={stat.mapX}
                  cy={stat.mapY}
                  r={isHovered ? 28 : 20}
                  fill="none"
                  stroke={isHovered ? '#20C8F5' : '#087FE5'}
                  strokeWidth="2"
                  opacity="0.8"
                >
                  <animate
                    attributeName="r"
                    values="14;35;14"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.85;0.1;0.85"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>

                {/* Núcleo Central Blanco Brillante */}
                <circle
                  cx={stat.mapX}
                  cy={stat.mapY}
                  r={isHovered ? 8 : 5.5}
                  fill="#FFFFFF"
                  filter="url(#mapPointGlow)"
                />
              </g>
            );
          })}
        </svg>

        {/* Tarjetas Flotantes Ejecutivas Posicionadas sobre Continentes */}
        <div className="absolute inset-0 pointer-events-none p-3">
          {REGION_STATS.map((stat) => {
            const isHovered = hoveredRegion === stat.id;

            return (
              <div
                key={`card-${stat.id}`}
                onMouseEnter={() => setHoveredRegion(stat.id)}
                onMouseLeave={() => setHoveredRegion(null)}
                className={`absolute ${stat.cardClass} pointer-events-auto transition-all duration-200 transform ${
                  isHovered ? 'scale-105 z-30' : 'z-20'
                }`}
              >
                <div className={`bg-[#06152B]/90 hover:bg-[#06152B] backdrop-blur-md border px-3.5 py-2.5 rounded-xl shadow-2xl cursor-pointer min-w-[130px] sm:min-w-[145px] transition-all ${
                  isHovered ? 'border-edu-cyan shadow-edu-cyan/20' : 'border-edu-border/80'
                }`}>
                  <div className="flex items-center justify-between gap-1.5">
                    <span className="text-[11px] text-slate-300 font-semibold truncate block">
                      {stat.name}
                    </span>
                    {isHovered && (
                      <span className="w-1.5 h-1.5 rounded-full bg-edu-cyan animate-pulse"></span>
                    )}
                  </div>

                  <div className="flex items-baseline justify-between mt-1 gap-2">
                    <span className="text-base font-bold text-white tracking-tight">
                      {stat.count}
                    </span>
                    <span className="text-[11px] font-semibold text-edu-teal flex items-center">
                      <ArrowUpRight className="w-3 h-3" />
                      {stat.growth}
                    </span>
                  </div>

                  {/* Telemetría Dinámica de Latencia */}
                  {isHovered && (
                    <div className="mt-1.5 pt-1.5 border-t border-slate-700/60 flex items-center justify-between text-[9px] text-slate-400 font-mono">
                      <span>Latencia: <strong className="text-edu-cyan">{stat.latency}</strong></span>
                      <span>Nodos: <strong className="text-white">{stat.activeNodes}</strong></span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Barra Inferior con Métricas Consolidadas */}
      <div className="flex flex-wrap items-center justify-between pt-3 border-t border-edu-border/40 text-[11px] text-slate-400 mt-2 gap-2">
        <div className="flex items-center gap-2">
          <Activity className="w-3.5 h-3.5 text-edu-teal" />
          <span>Total de Estudiantes Globales Conectados: <strong className="text-white font-semibold">28,980</strong></span>
        </div>
        <div className="flex items-center gap-3 font-mono text-[10px]">
          <span className="text-slate-300">Regiones Activas: <strong className="text-edu-cyan">6/6</strong></span>
          <span className="text-edu-teal font-semibold">Uptime Red: 99.98%</span>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { 
  BookOpen, Clock, Users, ArrowUpRight, Play, CheckCircle2, 
  Search, Filter, Star, Sparkles, Award, Layers, FileCode, Check 
} from 'lucide-react';

interface Course {
  id: string;
  title: string;
  instructor: string;
  modules: number;
  duration: string;
  enrolled: number;
  rating: number;
  progress: number;
  status: 'COMPLETADO' | 'EN_CURSO' | 'DISPONIBLE';
  tag: string;
  level: string;
  description: string;
  skills: string[];
}

const COURSES: Course[] = [
  {
    id: 'c1',
    title: 'Arquitectura de Redes Neuronales y Deep Learning con PyTorch',
    instructor: 'Profesor Carlos Zambrano',
    modules: 12,
    duration: '48 horas',
    enrolled: 1240,
    rating: 4.9,
    progress: 100,
    status: 'COMPLETADO',
    tag: 'Especialización Central',
    level: 'Avanzado',
    description: 'Domina el diseño de redes tensoriales, capas recurrentes GRU, propagación hacia adelante, retropropagación y cabezas multitarea en PyTorch.',
    skills: ['PyTorch 2.2', 'Tensores GPU', 'Capas GRU', 'Backpropagation', 'Inferencia en Azure']
  },
  {
    id: 'c2',
    title: 'Machine Learning Empresarial y Análisis Predictivo',
    instructor: 'Profesor Carlos Zambrano',
    modules: 8,
    duration: '32 horas',
    enrolled: 890,
    rating: 4.8,
    progress: 92,
    status: 'EN_CURSO',
    tag: 'Ciencia de Datos',
    level: 'Intermedio',
    description: 'Modelado predictivo sobre grandes volúmenes de datos estudiantiles, detección de patrones de deserción y matrices de confusión.',
    skills: ['Scikit-Learn', 'Regresión Logística', 'XGBoost', 'Matrices de Confusión', 'Métricas F1']
  },
  {
    id: 'c3',
    title: 'MLOps, Despliegue en Servidores Cloud con Azure y Docker',
    instructor: 'Dr. Segura',
    modules: 10,
    duration: '40 horas',
    enrolled: 650,
    rating: 4.9,
    progress: 45,
    status: 'EN_CURSO',
    tag: 'Infraestructura Cloud',
    level: 'Avanzado',
    description: 'Contenerización de modelos con Docker, configuración de máquinas virtuales Ubuntu en Azure, Nginx como proxy inverso y endpoints FastAPI.',
    skills: ['Azure VM B2als_v2', 'Docker Compose', 'FastAPI', 'Nginx Proxy', 'CI/CD Pipelines']
  },
  {
    id: 'c4',
    title: 'Procesamiento de Lenguaje Natural y Modelos Transformers',
    instructor: 'Dr. Alejandro Soto',
    modules: 14,
    duration: '56 horas',
    enrolled: 1420,
    rating: 4.9,
    progress: 0,
    status: 'DISPONIBLE',
    tag: 'NLP y LLMs',
    level: 'Avanzado',
    description: 'Mecanismos de atención multi-cabeza, embeddings densos, fine-tuning de modelos fundacionales y agentes conversacionales inteligentes.',
    skills: ['Transformers', 'HuggingFace', 'Self-Attention', 'Tokenización', 'Embeddings']
  },
  {
    id: 'c5',
    title: 'Visión por Computadora y Reconocimiento de Patrones con OpenCV',
    instructor: 'Ing. Valeria Ruiz',
    modules: 10,
    duration: '38 horas',
    enrolled: 910,
    rating: 4.7,
    progress: 0,
    status: 'DISPONIBLE',
    tag: 'Visión Artificial',
    level: 'Intermedio',
    description: 'Segmentación de imágenes, convoluciones 2D, extracción de características biométricas y verificación óptica en tiempo real.',
    skills: ['OpenCV', 'Convoluciones CNN', 'Transfer Learning', 'Detección YOLO', 'TorchVision']
  },
  {
    id: 'c6',
    title: 'Fundamentos Matemáticos y Álgebra Lineal para Inteligencia Artificial',
    instructor: 'Dr. Fernando Vega',
    modules: 6,
    duration: '24 horas',
    enrolled: 2100,
    rating: 5.0,
    progress: 100,
    status: 'COMPLETADO',
    tag: 'Matemáticas Puras',
    level: 'Fundamental',
    description: 'Descomposición en valores singulares (SVD), cálculo multivariable, vectores propios, producto punto y optimización convexa.',
    skills: ['Álgebra Lineal', 'Cálculo Multivariable', 'Gradiente y Hessiano', 'Eigenvalues', 'NumPy']
  }
];

export const CoursesView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('TODOS');
  const [selectedCourseModal, setSelectedCourseModal] = useState<Course | null>(null);

  const tags = ['TODOS', 'Especialización Central', 'Ciencia de Datos', 'Infraestructura Cloud', 'NLP y LLMs', 'Visión Artificial', 'Matemáticas Puras'];

  const filteredCourses = COURSES.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) || c.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === 'TODOS' || c.tag === selectedTag;
    return matchesSearch && matchesTag;
  });

  return (
    <div className="space-y-6 animate-in fade-in select-none">
      {/* Encabezado Principal */}
      <div className="bg-[#0A1F3D] border border-edu-border rounded-xl p-5 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="p-2.5 rounded-xl bg-edu-electric/15 border border-edu-electric/30 text-edu-electric">
            <BookOpen className="w-6 h-6 text-edu-cyan" />
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
              Catálogo de Especialización y Recursos Curriculares
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-edu-cyan/20 text-edu-cyan border border-edu-cyan/40">
                Cohorte 2026
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Programas de formación avanzada estructurados con módulos prácticos y validación con PyTorch.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <span className="bg-[#06152B] px-3 py-1.5 rounded-lg border border-edu-border text-slate-300">
            Total Asignaturas: <strong className="text-white font-bold">{COURSES.length}</strong>
          </span>
          <span className="bg-[#06152B] px-3 py-1.5 rounded-lg border border-edu-border text-edu-teal font-bold">
            Completados: 2 / {COURSES.length}
          </span>
        </div>
      </div>

      {/* Barra de Filtros y Búsqueda */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0A1F3D]/60 p-3 rounded-xl border border-edu-border/50">
        <div className="relative flex-1 min-w-[240px] max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nombre de curso o instructor..."
            className="w-full bg-[#06152B] border border-edu-border rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-edu-cyan transition"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                selectedTag === tag
                  ? 'bg-edu-electric text-white font-semibold shadow-md shadow-edu-electric/25'
                  : 'bg-[#06152B] text-slate-300 hover:text-white hover:bg-edu-surface2 border border-edu-border/40'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Cuadrícula de Cursos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="bg-[#0A1F3D] border border-edu-border rounded-xl p-5 shadow-xl hover:border-edu-cyan/50 transition flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-edu-electric/20 text-edu-cyan border border-edu-electric/40">
                  {course.tag}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    course.status === 'COMPLETADO'
                      ? 'bg-edu-teal/20 text-edu-teal border border-edu-teal/40'
                      : course.status === 'EN_CURSO'
                      ? 'bg-edu-cyan/20 text-edu-cyan border border-edu-cyan/40'
                      : 'bg-slate-700/40 text-slate-300 border border-slate-600/40'
                  }`}
                >
                  {course.status === 'COMPLETADO' && 'Completado'}
                  {course.status === 'EN_CURSO' && 'En Curso'}
                  {course.status === 'DISPONIBLE' && 'Disponible'}
                </span>
              </div>

              <h3 className="font-bold text-sm text-white leading-snug group-hover:text-edu-cyan transition">
                {course.title}
              </h3>
              <p className="text-xs text-slate-400 mt-1">{course.instructor} • <span className="text-edu-violet font-semibold">{course.level}</span></p>

              <p className="text-xs text-slate-300 mt-3 line-clamp-2 leading-relaxed">
                {course.description}
              </p>

              {/* Skills Tags */}
              <div className="mt-3 flex flex-wrap gap-1">
                {course.skills.slice(0, 3).map((s, idx) => (
                  <span key={idx} className="text-[10px] px-1.5 py-0.5 rounded bg-[#06152B] border border-edu-border/50 text-slate-300 font-mono">
                    {s}
                  </span>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-edu-border/40 space-y-2 text-xs text-slate-300">
                <div className="flex justify-between text-slate-400">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-edu-cyan" /> {course.duration}</span>
                  <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-edu-teal" /> {course.enrolled} alumnos</span>
                  <span className="flex items-center gap-1 text-amber-400 font-bold"><Star className="w-3 h-3 fill-amber-400" /> {course.rating}</span>
                </div>

                <div className="space-y-1 pt-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-400">Avance Curricular</span>
                    <strong className="text-white font-mono">{course.progress}%</strong>
                  </div>
                  <div className="w-full bg-[#06152B] h-2 rounded-full overflow-hidden border border-edu-border/50">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        course.progress === 100
                          ? 'bg-edu-teal'
                          : 'bg-gradient-to-r from-edu-electric to-edu-cyan'
                      }`}
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-2 flex gap-2">
              <button
                onClick={() => setSelectedCourseModal(course)}
                className="flex-1 py-2 bg-edu-electric hover:bg-edu-electric/90 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition shadow-md shadow-edu-electric/25"
              >
                <Play className="w-3.5 h-3.5" />
                <span>{course.progress === 100 ? 'Repasar Módulo' : course.progress > 0 ? 'Continuar Lección' : 'Comenzar Curso'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de Detalle de Curso */}
      {selectedCourseModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in">
          <div className="bg-[#06152B] border border-edu-cyan/50 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-edu-border pb-3 mb-4">
              <span className="text-xs font-bold text-edu-cyan uppercase tracking-wider">
                {selectedCourseModal.tag} • {selectedCourseModal.level}
              </span>
              <button
                onClick={() => setSelectedCourseModal(null)}
                className="text-slate-400 hover:text-white font-bold text-sm"
              >
                ×
              </button>
            </div>

            <h2 className="text-xl font-extrabold text-white">{selectedCourseModal.title}</h2>
            <p className="text-xs text-slate-300 mt-2">{selectedCourseModal.description}</p>

            <div className="mt-5 bg-[#0A1F3D] rounded-xl p-4 border border-edu-border space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-edu-teal">Competencias Técnicas Evaluadas:</h4>
              <div className="flex flex-wrap gap-2">
                {selectedCourseModal.skills.map((skill, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-lg bg-[#06152B] border border-edu-border text-xs text-slate-200 flex items-center gap-1.5">
                    <Check className="w-3 h-3 text-edu-teal" /> {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-edu-border/50">
              <button
                onClick={() => setSelectedCourseModal(null)}
                className="px-4 py-2 bg-edu-surface2 text-slate-300 hover:text-white rounded-xl text-xs font-medium"
              >
                Cerrar
              </button>
              <button
                onClick={() => setSelectedCourseModal(null)}
                className="px-5 py-2 bg-edu-electric hover:bg-edu-electric/90 text-white rounded-xl text-xs font-bold shadow-lg shadow-edu-electric/25"
              >
                Ingresar al Aula Virtual
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

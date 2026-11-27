import React, { useState } from 'react';
import { 
  BookOpen, Award, CheckCircle, Clock, Sparkles, 
  ChevronRight, Download, QrCode, ArrowRight, Play 
} from 'lucide-react';

export const EstudianteDashboard: React.FC = () => {
  const [showCertModal, setShowCertModal] = useState<boolean>(false);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Saludo y Progreso General */}
      <div className="bg-[#0A1F3D] border border-edu-border rounded-xl p-5 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs text-edu-cyan font-semibold uppercase tracking-wider">
            Ruta de Aprendizaje Activa
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-white mt-1">
            Especialización en Redes Neuronales y Deep Learning
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Módulo actual: <strong>Arquitecturas Recurrentes GRU y Fusión Multitarea</strong> (Lección 4 de 6)
          </p>
        </div>

        <div className="flex items-center gap-4 bg-[#06152B] border border-edu-border/50 p-3 rounded-lg w-full md:w-auto">
          <div className="text-center">
            <span className="text-2xl font-extrabold text-edu-teal">84%</span>
            <span className="text-[10px] text-slate-400 block">Completado</span>
          </div>
          <button className="px-4 py-2 bg-edu-electric hover:bg-edu-cyan hover:text-[#06152B] text-white font-semibold rounded-lg text-xs transition flex items-center gap-1.5 ml-auto">
            <Play className="w-3.5 h-3.5 fill-current" /> Continuar Clase
          </button>
        </div>
      </div>

      {/* SECCION DE IA TUTOR + RECOMENDACIONES EXPLICADAS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Recomendaciones Personalizadas de IA (7 cols) */}
        <div className="lg:col-span-7 bg-[#0A1F3D] border border-edu-border rounded-xl p-5 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-edu-border/50">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-edu-violet" />
              <h3 className="font-semibold text-white text-base">Recomendaciones del Tutor IA</h3>
            </div>
            <span className="text-xs text-slate-400">Modelo v1.4.2</span>
          </div>

          <div className="mt-4 space-y-3">
            {[
              {
                title: 'Repasa: Mecanismos de Retropropagación y Gradientes',
                course: 'Redes Neuronales Avanzadas',
                reason: 'El modelo detectó una tasa de aciertos menor al 70% en el test del Módulo 3.',
                impact: 'Alto Impacto',
                badgeColor: 'bg-edu-violet/20 text-edu-violet border-edu-violet/40'
              },
              {
                title: 'Completa el Laboratorio Práctico de PyTorch Tensor Ops',
                course: 'Fundamentos de Deep Learning',
                reason: 'Requisito para certificar la competencia de Implementación de Modelos.',
                impact: 'Certificable',
                badgeColor: 'bg-edu-teal/20 text-edu-teal border-edu-teal/40'
              },
              {
                title: 'Lectura Complementaria: Comparación de GRU vs Transformers',
                course: 'Modelos Secuenciales',
                reason: 'Sugerido para profundizar tras aprobar la evaluación de recurrentes.',
                impact: 'Recomendado',
                badgeColor: 'bg-edu-cyan/20 text-edu-cyan border-edu-cyan/40'
              }
            ].map((rec, idx) => (
              <div 
                key={idx}
                className="p-3.5 bg-[#06152B] border border-edu-border/40 hover:border-edu-electric rounded-lg transition group cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${rec.badgeColor}`}>
                    {rec.impact}
                  </span>
                  <span className="text-[10px] text-slate-400">{rec.course}</span>
                </div>
                <h4 className="text-sm font-semibold text-white group-hover:text-edu-cyan transition mt-1.5">
                  {rec.title}
                </h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  <strong>Motivo IA:</strong> {rec.reason}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Certificaciones y Logros (5 cols) */}
        <div className="lg:col-span-5 bg-[#0A1F3D] border border-edu-border rounded-xl p-5 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-edu-border/50">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-edu-teal" />
                <h3 className="font-semibold text-white text-base">Mis Certificados</h3>
              </div>
              <span className="text-xs text-edu-teal font-semibold">1 Certificado Emitido</span>
            </div>

            {/* Certificado Emitido Card */}
            <div className="mt-4 p-4 bg-gradient-to-br from-[#06152B] to-[#0D2B52] border border-edu-teal/40 rounded-xl relative overflow-hidden">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono text-edu-teal uppercase tracking-widest block">
                    CERTIFICADO OFICIAL VERIFICADO
                  </span>
                  <h4 className="text-sm font-bold text-white mt-1">
                    Especialista en Python y Machine Learning Básico
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Folio Único: <strong className="font-mono text-slate-200">EDUMASTER-2026-9842</strong>
                  </p>
                </div>
                <Award className="w-8 h-8 text-edu-teal flex-shrink-0" />
              </div>

              <div className="flex items-center justify-between mt-4 pt-3 border-t border-edu-border/40">
                <span className="text-[10px] text-slate-400">Emitido: 12 de Noviembre, 2026</span>
                <button 
                  onClick={() => setShowCertModal(true)}
                  className="px-2.5 py-1 bg-edu-teal/20 text-edu-teal hover:bg-edu-teal hover:text-white rounded text-xs font-medium transition flex items-center gap-1"
                >
                  <QrCode className="w-3.5 h-3.5" /> Ver Credencial
                </button>
              </div>
            </div>
          </div>

          <div className="p-3 bg-[#06152B] border border-edu-border/30 rounded-lg text-xs text-slate-400 mt-4">
            Tu próximo certificado se emitirá al alcanzar el 100% de la ruta de Deep Learning.
          </div>
        </div>
      </div>

      {/* Modal de Certificado con Codigo QR */}
      {showCertModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0A1F3D] border border-edu-teal/50 rounded-2xl max-w-md w-full p-6 shadow-2xl text-center relative animate-in zoom-in-95">
            <button 
              onClick={() => setShowCertModal(false)}
              className="absolute top-3 right-3 text-slate-400 hover:text-white text-lg font-bold"
            >
              ×
            </button>
            <Award className="w-12 h-12 text-edu-teal mx-auto mb-2" />
            <h3 className="text-lg font-bold text-white">Certificado Oficial EduMaster.ai</h3>
            <p className="text-xs text-slate-300 mt-1">Otorgado a: <strong>Jordan Rojas</strong></p>
            <p className="text-xs text-slate-400">Por culminar con éxito la especialización en Machine Learning</p>

            {/* Simulación SVG de Código QR */}
            <div className="my-5 flex justify-center">
              <div className="p-3 bg-white rounded-xl shadow-lg inline-block">
                <svg viewBox="0 0 100 100" className="w-36 h-36">
                  {/* Patrones de QR */}
                  <rect x="0" y="0" width="30" height="30" fill="#06152B" />
                  <rect x="5" y="5" width="20" height="20" fill="#FFFFFF" />
                  <rect x="10" y="10" width="10" height="10" fill="#06152B" />

                  <rect x="70" y="0" width="30" height="30" fill="#06152B" />
                  <rect x="75" y="5" width="20" height="20" fill="#FFFFFF" />
                  <rect x="80" y="10" width="10" height="10" fill="#06152B" />

                  <rect x="0" y="70" width="30" height="30" fill="#06152B" />
                  <rect x="5" y="75" width="20" height="20" fill="#FFFFFF" />
                  <rect x="10" y="80" width="10" height="10" fill="#06152B" />

                  <rect x="35" y="10" width="10" height="10" fill="#06152B" />
                  <rect x="50" y="15" width="15" height="10" fill="#06152B" />
                  <rect x="35" y="35" width="30" height="30" fill="#06152B" />
                  <rect x="40" y="40" width="20" height="20" fill="#FFFFFF" />
                  <rect x="70" y="40" width="10" height="20" fill="#06152B" />
                  <rect x="40" y="75" width="20" height="15" fill="#06152B" />
                  <rect x="70" y="70" width="25" height="25" fill="#06152B" />
                </svg>
              </div>
            </div>

            <p className="text-[11px] font-mono text-slate-400">
              Validación en: https://edumaster.ai/verify/EDUMASTER-2026-9842
            </p>

            <button 
              onClick={() => setShowCertModal(false)}
              className="mt-5 w-full py-2.5 bg-edu-teal hover:bg-edu-teal/90 text-[#06152B] font-bold rounded-lg text-xs transition flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" /> Descargar PDF Oficial
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

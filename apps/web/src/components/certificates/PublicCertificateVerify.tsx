import React, { useState } from 'react';
import { Award, CheckCircle2, ShieldCheck, Printer, ArrowLeft, ExternalLink, Calendar, Sparkles, Building2, UserCheck, AlertCircle } from 'lucide-react';
import { QRCodeSVG } from '../common/QRCodeSVG';

interface CertificateData {
  code: string;
  studentName: string;
  courseName: string;
  grade: number;
  issueDate: string;
  hash: string;
  issuer: string;
  instructor: string;
  status: 'VIGENTE' | 'EXPIRADO';
}

const PUBLIC_REGISTRY: Record<string, CertificateData> = {
  'CERT-2026-X94B2': {
    code: 'CERT-2026-X94B2',
    studentName: 'Jordan Rojas',
    courseName: 'Arquitectura de Redes Neuronales y Deep Learning con PyTorch',
    grade: 19.5,
    issueDate: '27 de Noviembre de 2026',
    hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    issuer: 'Dr. Segura (Director Académico)',
    instructor: 'Profesor Carlos Zambrano (Instructor Principal IA)',
    status: 'VIGENTE'
  },
  'CERT-2026-M81C9': {
    code: 'CERT-2026-M81C9',
    studentName: 'Jordan Rojas',
    courseName: 'Machine Learning Empresarial y Análisis Predictivo',
    grade: 18.8,
    issueDate: '25 de Noviembre de 2026',
    hash: '8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4',
    issuer: 'Dr. Segura (Director Académico)',
    instructor: 'Profesor Carlos Zambrano (Instructor Principal IA)',
    status: 'VIGENTE'
  }
};

interface Props {
  code: string;
  onBackToApp?: () => void;
}

export const PublicCertificateVerify: React.FC<Props> = ({ code, onBackToApp }) => {
  const normalizedCode = code.trim().toUpperCase();
  const cert = PUBLIC_REGISTRY[normalizedCode];

  return (
    <div className="min-h-screen bg-[#06152B] text-slate-100 flex flex-col items-center justify-center p-4 md:p-8 select-none">
      {/* Barra Superior con Marca */}
      <header className="w-full max-w-4xl mb-6 flex items-center justify-between border-b border-edu-border/50 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-edu-electric flex items-center justify-center text-white font-extrabold text-base shadow-lg shadow-edu-electric/30">
            EM
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-wide">
              EduMaster.pro
            </h1>
            <p className="text-[11px] font-mono text-edu-cyan">
              Portal Oficial de Verificación de Credenciales Académicas
            </p>
          </div>
        </div>

        {onBackToApp && (
          <button
            onClick={onBackToApp}
            className="px-3.5 py-1.5 rounded-xl bg-[#0A1F3D] hover:bg-edu-surface2 text-xs font-semibold text-edu-cyan border border-edu-cyan/30 flex items-center gap-1.5 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Ir al Sistema
          </button>
        )}
      </header>

      {/* Contenedor Principal */}
      <main className="w-full max-w-3xl">
        {cert ? (
          <div className="bg-[#0A1F3D] border-2 border-edu-teal/50 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden animate-in fade-in">
            {/* Banner de Estado Oficial */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-edu-border/60">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-edu-teal/20 border-2 border-edu-teal text-edu-teal shadow-lg shadow-edu-teal/20">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-edu-teal text-[#06152B] uppercase tracking-wider">
                      Certificación Oficial Válida
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      Código: <strong className="text-edu-cyan">{cert.code}</strong>
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    Credencial académica respaldada criptográficamente en Azure 40.116.69.29 y Supabase Ledger.
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[11px] font-mono text-slate-400 block">Estado en Registro</span>
                <span className="text-xs font-bold text-edu-teal px-2.5 py-0.5 rounded bg-edu-teal/15 border border-edu-teal/30">
                  {cert.status}
                </span>
              </div>
            </div>

            {/* Datos del Certificado */}
            <div className="py-6 space-y-5">
              <div className="bg-[#06152B] border border-edu-border/60 rounded-xl p-4">
                <span className="text-xs uppercase font-mono text-slate-400 block tracking-wider">
                  Estudiante Acreditado
                </span>
                <h2 className="text-xl md:text-2xl font-extrabold text-white mt-1">
                  {cert.studentName}
                </h2>
              </div>

              <div className="bg-[#06152B] border border-edu-border/60 rounded-xl p-4">
                <span className="text-xs uppercase font-mono text-slate-400 block tracking-wider">
                  Programa / Especialización Culminada
                </span>
                <h3 className="text-base md:text-lg font-bold text-edu-cyan mt-1">
                  {cert.courseName}
                </h3>
                <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3 pt-3 border-t border-edu-border/40 text-xs">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Calendar className="w-4 h-4 text-edu-cyan" />
                    <span>Fecha de Emisión: <strong className="text-white">{cert.issueDate}</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <Sparkles className="w-4 h-4 text-edu-teal" />
                    <span>Calificación Final: <strong className="text-edu-teal font-extrabold">{cert.grade} / 20.0</strong></span>
                  </div>
                </div>
              </div>

              {/* Autoridades Emisoras */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#06152B] border border-edu-border/40 rounded-xl p-3.5 text-xs">
                  <span className="text-slate-400 text-[11px] flex items-center gap-1.5 mb-1">
                    <Building2 className="w-3.5 h-3.5 text-edu-cyan" /> Dirección Académica
                  </span>
                  <span className="font-bold text-white block">{cert.issuer}</span>
                  <span className="text-[10px] text-slate-400">EduMaster Institute of Artificial Intelligence</span>
                </div>

                <div className="bg-[#06152B] border border-edu-border/40 rounded-xl p-3.5 text-xs">
                  <span className="text-slate-400 text-[11px] flex items-center gap-1.5 mb-1">
                    <UserCheck className="w-3.5 h-3.5 text-edu-teal" /> Docente Instructor
                  </span>
                  <span className="font-bold text-white block">{cert.instructor}</span>
                  <span className="text-[10px] text-slate-400">Cátedra de Arquitectura Neuronal & MLOps</span>
                </div>
              </div>

              {/* Firma Criptográfica SHA-256 y Código QR */}
              <div className="bg-[#06152B] border border-edu-border/60 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
                <div className="flex-1 min-w-[240px]">
                  <span className="text-xs font-mono text-slate-400 block mb-1">
                    Firma Criptográfica SHA-256 (Inmutable):
                  </span>
                  <p className="text-[11px] font-mono text-slate-300 break-all bg-[#0A1F3D] p-2 rounded-lg border border-edu-border/40">
                    {cert.hash}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-2">
                    Validado a través del nodo Azure 40.116.69.29 (Ubuntu 24.04 LTS). La clave pública de la institución verifica que este registro no ha sido alterado.
                  </p>
                </div>

                <div className="flex flex-col items-center shrink-0">
                  <QRCodeSVG
                    value={`http://40.116.69.29/verify/${cert.code}`}
                    size={110}
                    className="border border-edu-border shadow-md"
                  />
                  <span className="text-[10px] font-mono text-edu-cyan mt-1 font-bold">
                    {cert.code}
                  </span>
                </div>
              </div>
            </div>

            {/* Acciones */}
            <div className="pt-4 border-t border-edu-border/60 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-slate-400 font-mono">
                Certificado Institucional Oficial • EduMaster.pro
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-edu-teal hover:bg-edu-teal/90 text-[#06152B] rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition shadow-lg shadow-edu-teal/20"
                >
                  <Printer className="w-4 h-4" /> Imprimir Acreditación
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-[#0A1F3D] border-2 border-red-500/50 rounded-2xl p-8 text-center shadow-2xl animate-in fade-in">
            <div className="w-16 h-16 rounded-full bg-red-500/20 border-2 border-red-500/60 flex items-center justify-center mx-auto mb-4 text-red-400">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-white">Código de Certificado No Encontrado</h2>
            <p className="text-xs text-slate-300 mt-2 max-w-md mx-auto">
              El código <strong className="text-red-400 font-mono">{normalizedCode}</strong> no coincide con ninguna credencial registrada en el libro mayor de EduMaster.
            </p>
            <div className="mt-6">
              {onBackToApp && (
                <button
                  onClick={onBackToApp}
                  className="px-5 py-2.5 bg-edu-electric hover:bg-edu-electric/90 text-white rounded-xl text-xs font-bold transition shadow-lg shadow-edu-electric/25"
                >
                  Volver al Validador
                </button>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Pie de Página */}
      <footer className="mt-8 text-center text-xs text-slate-500 font-mono">
        EduMaster.pro Enterprise v1.4.2 • Servidor Azure: 40.116.69.29 (North Central US)
      </footer>
    </div>
  );
};

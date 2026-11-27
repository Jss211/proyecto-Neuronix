import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { QRCodeSVG } from '../common/QRCodeSVG';
import { 
  Award, CheckCircle2, ShieldCheck, Printer, ExternalLink, 
  QrCode, Copy, Check, Download, Sparkles, Calendar, FileText, 
  Search, AlertCircle, KeyRound, ArrowRight, Smartphone, Info 
} from 'lucide-react';

interface Certificate {
  id: string;
  code: string;
  studentName: string;
  courseName: string;
  grade: number;
  issueDate: string;
  hash: string;
  issuer: string;
  instructor: string;
}

const SAMPLE_CERTIFICATES: Certificate[] = [
  {
    id: 'cert-1',
    code: 'CERT-2026-X94B2',
    studentName: 'Jordan Rojas',
    courseName: 'Arquitectura de Redes Neuronales y Deep Learning con PyTorch',
    grade: 19.5,
    issueDate: '27 de Noviembre de 2026',
    hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    issuer: 'Dr. Segura (Director Académico)',
    instructor: 'Profesor Carlos Zambrano (Instructor Principal IA)'
  },
  {
    id: 'cert-2',
    code: 'CERT-2026-M81C9',
    studentName: 'Jordan Rojas',
    courseName: 'Machine Learning Empresarial y Análisis Predictivo',
    grade: 18.8,
    issueDate: '25 de Noviembre de 2026',
    hash: '8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4',
    issuer: 'Dr. Segura (Director Académico)',
    instructor: 'Profesor Carlos Zambrano (Instructor Principal IA)'
  }
];

export const CertificatesView: React.FC = () => {
  const { user } = useAuth();
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [showQRModal, setShowQRModal] = useState<Certificate | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  // Estados para el Validador Oficial por Codigo Alfanumérico
  const [searchCodeInput, setSearchCodeInput] = useState<string>('');
  const [verificationResult, setVerificationResult] = useState<{
    searched: boolean;
    valid: boolean;
    cert?: Certificate;
  } | null>(null);

  const certificates = SAMPLE_CERTIFICATES.map((c) => ({
    ...c,
    studentName: user?.name || c.studentName
  }));

  const getVerifyUrl = (code: string) => {
    // Si estamos en localhost o en Azure, genera la ruta hash compatible
    const origin = typeof window !== 'undefined' ? window.location.origin : 'http://40.116.69.29';
    return `${origin}/#verify/${code}`;
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleCopyUrl = (code: string) => {
    const url = getVerifyUrl(code);
    navigator.clipboard.writeText(url);
    setCopiedUrl(code);
    setTimeout(() => setCopiedUrl(null), 2500);
  };

  const handleValidateCode = (codeToTest?: string) => {
    const code = (codeToTest || searchCodeInput).trim().toUpperCase();
    if (!code) return;

    const found = certificates.find((c) => 
      c.code.toUpperCase() === code || 
      c.hash.toLowerCase() === code.toLowerCase()
    );

    if (found) {
      setVerificationResult({ searched: true, valid: true, cert: found });
    } else {
      setVerificationResult({ searched: true, valid: false });
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in select-none">
      {/* Encabezado del Módulo con Explicación de los 2 Métodos de Validación */}
      <div className="bg-[#0A1F3D] border border-edu-border rounded-xl p-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-edu-teal/15 border border-edu-teal/30 text-edu-teal">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                Certificaciones Académicas Oficiales
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-edu-teal/20 text-edu-teal border border-edu-teal/40">
                  Doble Validación: Código & QR ISO
                </span>
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                Acreditaciones con validez internacional. Cada diploma cuenta con un <strong>Código Alfanumérico Único</strong> y un <strong>Código QR Óptico ISO</strong>.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="bg-[#06152B] px-3 py-1.5 rounded-lg border border-edu-border text-slate-300">
              Diplomas Emitidos: <strong className="text-edu-teal font-bold">{certificates.length}</strong>
            </span>
          </div>
        </div>

        {/* Explicación Técnica de Validación */}
        <div className="mt-4 pt-3 border-t border-edu-border/50 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-lg bg-[#06152B] border border-edu-cyan/30 flex items-start gap-2.5">
            <KeyRound className="w-4 h-4 text-edu-cyan shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block font-bold">1. Validación por Código Alfanumérico (Método Oficial)</strong>
              <span className="text-slate-300 text-[11px] leading-relaxed">
                Es el estándar usado por empresas, reclutadores de RRHH y universidades. Se ingresa el código (ej: <code className="text-edu-cyan font-mono font-bold">CERT-2026-X94B2</code>) directamente en el validador para verificar el registro en el ledger de Azure.
              </span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-[#06152B] border border-edu-teal/30 flex items-start gap-2.5">
            <Smartphone className="w-4 h-4 text-edu-teal shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block font-bold">2. Validación por Código QR (Acceso Rápido Móvil)</strong>
              <span className="text-slate-300 text-[11px] leading-relaxed">
                Generado bajo norma ISO/IEC 18004 con zona de silencio. Apunta la cámara de tu celular (iOS / Android) hacia el recuadro blanco para abrir la credencial pública sin necesidad de tipear.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* PANEL 1: VALIDADOR INSTITUCIONAL POR CÓDIGO ALFANUMÉRICO */}
      <div className="bg-[#0A1F3D] border-2 border-edu-cyan/50 rounded-xl p-5 shadow-2xl relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-edu-border/50">
          <div className="flex items-center gap-2">
            <KeyRound className="w-5 h-5 text-edu-cyan" />
            <h3 className="font-extrabold text-sm md:text-base text-white">
              Validador de Certificados por Código Alfanumérico
            </h3>
          </div>
          <span className="text-[11px] font-mono text-edu-teal bg-edu-teal/15 px-2.5 py-0.5 rounded-full border border-edu-teal/30">
            Ledger Criptográfico Azure 40.116.69.29
          </span>
        </div>

        <p className="text-xs text-slate-300 mt-2">
          Ingresa el código único del certificado (ejemplo: <strong className="text-edu-cyan font-mono">CERT-2026-X94B2</strong>) o el hash SHA-256 para verificar su autenticidad académica:
        </p>

        {/* Formulario de Búsqueda de Código */}
        <div className="mt-3 flex flex-wrap gap-2">
          <div className="relative flex-1 min-w-[260px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchCodeInput}
              onChange={(e) => setSearchCodeInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleValidateCode(); }}
              placeholder="Ingresa código (ej: CERT-2026-X94B2)..."
              className="w-full bg-[#06152B] border border-edu-border rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-400 uppercase font-mono tracking-wider focus:outline-none focus:border-edu-cyan transition"
            />
          </div>

          <button
            onClick={() => handleValidateCode()}
            className="px-5 py-2.5 bg-edu-electric hover:bg-edu-electric/90 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-lg shadow-edu-electric/25"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Validar Código</span>
          </button>
        </div>

        {/* Chips de Códigos de Prueba Rápidos */}
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-[11px] text-slate-400 font-mono">Probar códigos oficiales:</span>
          {certificates.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                setSearchCodeInput(c.code);
                handleValidateCode(c.code);
              }}
              className="px-3 py-1 rounded-lg bg-[#06152B] hover:bg-edu-surface2 text-edu-cyan border border-edu-cyan/40 text-[11px] font-mono transition font-bold"
            >
              {c.code} ({c.grade}/20)
            </button>
          ))}
        </div>

        {/* Resultado de la Validación por Código */}
        {verificationResult && (
          <div className="mt-4 animate-in fade-in">
            {verificationResult.valid && verificationResult.cert ? (
              <div className="p-4 rounded-xl bg-edu-teal/10 border-2 border-edu-teal/70 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-edu-teal/20 text-edu-teal mt-0.5">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold bg-edu-teal text-[#06152B] uppercase">
                        Certificado Válido y Auténtico
                      </span>
                      <span className="text-xs font-mono text-edu-cyan font-bold">
                        {verificationResult.cert.code}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white mt-1">
                      {verificationResult.cert.courseName}
                    </h4>

                    <div className="mt-1 flex flex-wrap gap-4 text-xs text-slate-300">
                      <span>Estudiante: <strong className="text-white">{verificationResult.cert.studentName}</strong></span>
                      <span>Calificación: <strong className="text-edu-teal font-extrabold">{verificationResult.cert.grade} / 20.0</strong></span>
                      <span>Emisión: <span className="text-slate-300">{verificationResult.cert.issueDate}</span></span>
                    </div>

                    <p className="text-[10px] font-mono text-slate-400 mt-1 truncate max-w-xl">
                      Firma SHA-256: {verificationResult.cert.hash}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedCert(verificationResult.cert!)}
                    className="px-4 py-2 bg-edu-teal hover:bg-edu-teal/90 text-[#06152B] rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition shadow-lg shadow-edu-teal/20"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Ver Diploma Oficial</span>
                  </button>

                  <a
                    href={`#verify/${verificationResult.cert.code}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3.5 py-2 bg-[#06152B] hover:bg-edu-surface2 text-edu-cyan border border-edu-cyan/40 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Portal Público</span>
                  </a>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-red-500/10 border-2 border-red-500/50 flex items-center gap-3 text-red-300 text-xs">
                <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
                <div>
                  <strong className="block text-sm text-red-200">Código de Certificado No Encontrado</strong>
                  <span>El código ingresado no coincide con ningún registro oficial en el libro mayor de Azure. Comprueba que no tenga espacios adicionales.</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* PANEL 2: TARJETAS DE CERTIFICADOS CON QR ISO ESCANEABLE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {certificates.map((cert) => (
          <div
            key={cert.id}
            className="bg-[#0A1F3D] border border-edu-border rounded-xl p-5 shadow-xl hover:border-edu-cyan/50 transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 border-b border-edu-border/40 pb-3">
                <span className="text-xs font-mono text-edu-cyan font-bold tracking-wider">
                  {cert.code}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-edu-teal/15 text-edu-teal border border-edu-teal/30 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Certificado Vigente
                </span>
              </div>

              <div className="mt-4 flex gap-4 items-center">
                {/* Código QR ISO 100% Escaneable por Cualquier Cámara Móvil */}
                <div 
                  onClick={() => setShowQRModal(cert)}
                  className="cursor-pointer group relative shrink-0 flex flex-col items-center"
                  title="Haz clic para ampliar y escanear con tu celular"
                >
                  <QRCodeSVG
                    value={getVerifyUrl(cert.code)}
                    size={116}
                    className="border-2 border-slate-300 group-hover:scale-105 group-hover:border-edu-cyan transition shadow-md"
                  />
                  <span className="text-[10px] font-mono text-edu-cyan mt-1.5 font-bold flex items-center gap-1 group-hover:underline">
                    <Smartphone className="w-3 h-3" /> Escanear con Celular
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm md:text-base text-white leading-snug">
                    {cert.courseName}
                  </h3>
                  <div className="mt-2.5 space-y-1.5 text-xs text-slate-300">
                    <p className="flex items-center gap-1.5 text-slate-400">
                      <Calendar className="w-3.5 h-3.5 text-edu-cyan shrink-0" /> Emisión: <span className="text-white font-medium">{cert.issueDate}</span>
                    </p>
                    <p className="flex items-center gap-1.5 text-slate-400">
                      <Sparkles className="w-3.5 h-3.5 text-edu-teal shrink-0" /> Calificación: <strong className="text-edu-teal font-extrabold">{cert.grade} / 20.0 (Sobresaliente)</strong>
                    </p>
                    <p className="text-[11px] text-slate-400 truncate">
                      Estudiante: <strong className="text-white">{cert.studentName}</strong>
                    </p>
                  </div>
                </div>
              </div>

              {/* Hash Criptografico */}
              <div className="mt-4 p-2 rounded-lg bg-[#06152B] border border-edu-border/50 text-[10px] font-mono text-slate-400 truncate">
                <span className="text-slate-500">Hash SHA-256: </span>
                <span className="text-slate-300">{cert.hash}</span>
              </div>
            </div>

            {/* Botones de Accion */}
            <div className="mt-5 pt-3 border-t border-edu-border/40 flex flex-wrap items-center justify-between gap-2">
              <button
                onClick={() => setSelectedCert(cert)}
                className="px-3.5 py-1.5 bg-edu-electric hover:bg-edu-electric/90 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition shadow-md shadow-edu-electric/25"
              >
                <FileText className="w-3.5 h-3.5" /> Ver Diploma Completo
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowQRModal(cert)}
                  className="px-3 py-1.5 bg-[#06152B] hover:bg-edu-surface2 text-edu-cyan border border-edu-cyan/40 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
                  title="Ampliar QR para escanear con teléfono"
                >
                  <QrCode className="w-3.5 h-3.5" /> Ampliar QR
                </button>

                <button
                  onClick={() => handleCopyCode(cert.code)}
                  className="px-2.5 py-1.5 bg-[#06152B] hover:bg-edu-surface2 text-slate-300 border border-edu-border rounded-lg text-xs font-mono transition flex items-center gap-1"
                  title="Copiar código alfanumérico"
                >
                  {copiedCode === cert.code ? <Check className="w-3.5 h-3.5 text-edu-teal" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode === cert.code ? 'Copiado' : 'Código'}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL 1: ESCANEO ÓPTICO QR AMPLIADO PARA TELÉFONO */}
      {showQRModal && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in">
          <div className="bg-[#06152B] border-2 border-edu-cyan/60 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-edu-border pb-3 mb-4">
              <span className="font-bold text-sm text-edu-cyan flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-edu-cyan" /> Escaneo con Cámara de Celular
              </span>
              <button 
                onClick={() => setShowQRModal(null)} 
                className="text-slate-400 hover:text-white font-bold text-lg leading-none"
              >
                ×
              </button>
            </div>

            <div className="text-center">
              <h3 className="font-extrabold text-base text-white">
                {showQRModal.courseName}
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Apunta la cámara de tu teléfono hacia este código QR:
              </p>

              {/* QR en Alta Resolución con Fondo Blanco Puro y Zona de Silencio */}
              <div className="mt-4 inline-block bg-white p-3 rounded-2xl shadow-2xl border-4 border-edu-cyan">
                <QRCodeSVG
                  value={getVerifyUrl(showQRModal.code)}
                  size={200}
                  className="shadow-none"
                />
              </div>

              <div className="mt-3 flex items-center justify-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-extrabold bg-[#0A1F3D] text-edu-cyan border border-edu-cyan/40">
                  {showQRModal.code}
                </span>
                <button
                  onClick={() => handleCopyCode(showQRModal.code)}
                  className="p-1 rounded bg-[#0A1F3D] hover:bg-slate-700 text-slate-300 border border-edu-border text-xs"
                  title="Copiar código"
                >
                  {copiedCode === showQRModal.code ? <Check className="w-3.5 h-3.5 text-edu-teal" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="mt-4 p-3 rounded-xl bg-[#0A1F3D] border border-edu-border text-left text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-400">Estudiante:</span>
                  <span className="text-white font-bold">{showQRModal.studentName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Calificación:</span>
                  <span className="text-edu-teal font-extrabold">{showQRModal.grade} / 20.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Emisión:</span>
                  <span className="text-slate-300 font-mono">{showQRModal.issueDate}</span>
                </div>
              </div>
            </div>

            <div className="mt-5 flex gap-2">
              <a
                href={`#verify/${showQRModal.code}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2.5 bg-edu-electric hover:bg-edu-electric/90 text-white rounded-xl text-xs font-bold transition text-center shadow-lg shadow-edu-electric/25 flex items-center justify-center gap-1.5"
              >
                <ExternalLink className="w-3.5 h-3.5" /> Abrir Verificación Pública
              </a>
              <button
                onClick={() => setShowQRModal(null)}
                className="px-4 py-2.5 bg-[#0A1F3D] hover:bg-edu-surface2 text-slate-300 rounded-xl text-xs font-medium transition"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: DIPLOMA ACADÉMICO OFICIAL EN ALTA RESOLUCIÓN */}
      {selectedCert && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in">
          <div className="bg-[#06152B] border-2 border-edu-cyan/60 rounded-2xl max-w-3xl w-full p-6 md:p-8 shadow-2xl relative overflow-hidden flex flex-col justify-between max-h-[92vh] overflow-y-auto">
            {/* Marco de Seguridad Guilloché Decorativo */}
            <div className="absolute inset-2 border border-edu-cyan/20 rounded-xl pointer-events-none"></div>

            <div>
              {/* Encabezado del Diploma */}
              <div className="text-center pb-4 border-b border-edu-border/60">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-edu-electric/20 border border-edu-electric/40 text-edu-cyan font-bold text-lg mb-2">
                  EM
                </div>
                <h1 className="text-xl md:text-2xl font-extrabold text-white tracking-widest uppercase">
                  EduMaster.ai Enterprise Platform
                </h1>
                <p className="text-xs text-edu-cyan font-mono tracking-wider mt-0.5">
                  INSTITUTO DE INTELIGENCIA ARTIFICIAL & ANALÍTICA PREDICTIVA
                </p>
                <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-edu-cyan to-transparent mx-auto mt-2"></div>
              </div>

              {/* Cuerpo del Diploma */}
              <div className="text-center my-6 space-y-4">
                <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold block">
                  Otorga el presente Diploma de Excelencia Académica a:
                </span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-edu-cyan">
                  {selectedCert.studentName}
                </h2>
                <p className="text-xs text-slate-300 max-w-xl mx-auto leading-relaxed">
                  Por haber culminado y aprobado con distinción meritoria las exigencias teóricas, matemáticas y de laboratorio computacional en:
                </p>
                <div className="bg-[#0A1F3D] border border-edu-border/80 rounded-xl p-3 max-w-lg mx-auto">
                  <h3 className="text-sm md:text-base font-bold text-edu-teal">
                    {selectedCert.courseName}
                  </h3>
                  <span className="text-xs text-slate-300 font-mono mt-1 block">
                    Calificación Obtenida: <strong className="text-white">{selectedCert.grade} / 20.0 (Sobresaliente)</strong>
                  </span>
                </div>
              </div>

              {/* Pie del Diploma: Firmas + Código QR Vectorial Real ISO */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center pt-4 border-t border-edu-border/60 mt-4">
                {/* Código QR Escaneable */}
                <div className="flex flex-col items-center md:items-start">
                  <QRCodeSVG
                    value={getVerifyUrl(selectedCert.code)}
                    size={110}
                    className="border border-edu-border shadow-md"
                  />
                  <span className="text-[10px] font-mono text-slate-400 mt-1">
                    Código: <strong className="text-edu-cyan">{selectedCert.code}</strong>
                  </span>
                </div>

                {/* Firma 1: Docente */}
                <div className="text-center">
                  <div className="w-36 h-0.5 bg-slate-600 mx-auto mb-1"></div>
                  <span className="text-xs font-bold text-white block">{selectedCert.instructor}</span>
                  <span className="text-[10px] text-slate-400 block">Instructor del Programa</span>
                </div>

                {/* Firma 2: Administrador */}
                <div className="text-center">
                  <div className="w-36 h-0.5 bg-slate-600 mx-auto mb-1"></div>
                  <span className="text-xs font-bold text-white block">{selectedCert.issuer}</span>
                  <span className="text-[10px] text-slate-400 block">Dirección Académica</span>
                </div>
              </div>

              {/* Hash y Sello Digital */}
              <div className="mt-4 pt-2 text-[9px] font-mono text-slate-500 text-center truncate">
                Firma Criptográfica SHA-256: {selectedCert.hash}
              </div>
            </div>

            {/* Botones de Control del Modal */}
            <div className="mt-6 pt-4 border-t border-edu-border/50 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-slate-400 font-mono">
                Emitido el {selectedCert.issueDate} • Servidor Azure: 40.116.69.29
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-edu-teal hover:bg-edu-teal/90 text-[#06152B] rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition shadow-lg shadow-edu-teal/20"
                >
                  <Printer className="w-3.5 h-3.5" /> Imprimir / PDF
                </button>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="px-4 py-2 bg-edu-surface2 hover:bg-slate-700 text-white rounded-xl text-xs font-medium transition"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

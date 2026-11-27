import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { AdminDashboard } from './components/dashboard/AdminDashboard';
import { DocenteDashboard } from './components/dashboard/DocenteDashboard';
import { EstudianteDashboard } from './components/dashboard/EstudianteDashboard';
import { CoursesView } from './components/courses/CoursesView';
import { LearningPlansView } from './components/courses/LearningPlansView';
import { MLOpsTelemetryView } from './components/analytics/MLOpsTelemetryView';
import { AITutorView } from './components/analytics/AITutorView';
import { EvaluationsView } from './components/evaluations/EvaluationsView';
import { CertificatesView } from './components/certificates/CertificatesView';
import { PublicCertificateVerify } from './components/certificates/PublicCertificateVerify';
import { CommunityChat } from './components/community/CommunityChat';
import { AdminConfigView } from './components/admin/AdminConfigView';
import { LoginPage } from './components/auth/LoginPage';

const getVerifyCodeFromUrl = (): string | null => {
  if (typeof window === 'undefined') return null;
  
  // 1. Deteccion por hash (soporta #verify/CODIGO y #/verify/CODIGO)
  const hash = window.location.hash;
  const hashMatch = hash.match(/#\/?verify\/([A-Za-z0-9_-]+)/i);
  if (hashMatch) return hashMatch[1];

  // 2. Deteccion por pathname (/verify/CODIGO)
  const path = window.location.pathname;
  const pathMatch = path.match(/\/verify\/([A-Za-z0-9_-]+)/i);
  if (pathMatch) return pathMatch[1];

  // 3. Deteccion por parametros de busqueda (?code=CODIGO o ?verify=CODIGO)
  const params = new URLSearchParams(window.location.search);
  return params.get('verify') || params.get('code');
};

const MainContent: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('resumen');
  const [verifyCode, setVerifyCode] = useState<string | null>(() => getVerifyCodeFromUrl());
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return Boolean(localStorage.getItem('edumaster_authenticated'));
  });

  useEffect(() => {
    const handleHashChange = () => {
      const code = getVerifyCodeFromUrl();
      setVerifyCode(code);
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, []);

  // Si se accede a una URL de verificacion publica, se muestra sin requerir login
  if (verifyCode) {
    return (
      <PublicCertificateVerify
        code={verifyCode}
        onBackToApp={() => {
          setVerifyCode(null);
          window.location.hash = '';
        }}
      />
    );
  }

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    localStorage.setItem('edumaster_authenticated', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('edumaster_authenticated');
    logout();
  };

  if (!isAuthenticated || !user) {
    return <LoginPage onSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="flex min-h-screen bg-[#06152B] text-slate-100">
      {/* Sidebar Fijo con Acordeon Interactivo */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Contenedor Principal */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Navbar onLogout={handleLogout} />

        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          {/* Encabezado Dinamico de Pagina */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-2 border-b border-edu-border/30 pb-3">
            <div>
              <h1 className="text-xl md:text-2xl font-extrabold text-white">
                {activeTab === 'resumen' && (
                  user.role === 'ADMIN' ? 'Centro de Mando y Arquitectura Neuronal' :
                  user.role === 'DOCENTE' ? 'Gestión de Cohortes y Alertas de Riesgo' :
                  'Mi Aula Virtual y Tutor Personalizado'
                )}
                {activeTab === 'cursos' && 'Catálogo de Cursos y Recursos de Aprendizaje'}
                {activeTab === 'planes' && 'Planes de Estudio y Rutas de Especialización'}
                {activeTab === 'analisis' && 'Telemetría del Modelo MLOps y Despliegue en Azure'}
                {activeTab === 'ai-tutor' && 'Tutor de Inteligencia Artificial Explicable (XAI)'}
                {activeTab === 'evaluaciones' && 'Evaluaciones Continuas y Rúbricas Oficiales'}
                {activeTab === 'certificados' && 'Certificaciones Oficiales con Código QR Verificable'}
                {activeTab === 'comunidad' && 'Comunidad Académica y Mensajería en Vivo'}
                {activeTab === 'configuracion' && 'Configuración y Gobierno de la Plataforma'}
              </h1>
            </div>
            <div className="text-xs text-slate-400 font-mono">
              Servidor Azure: <span className="text-edu-teal font-semibold">40.116.69.29 (North Central US)</span>
            </div>
          </div>

          {/* Renderizado de Pantallas segun la Pestaña Activa */}
          {activeTab === 'resumen' && (
            <>
              {user.role === 'ADMIN' && <AdminDashboard />}
              {user.role === 'DOCENTE' && <DocenteDashboard />}
              {user.role === 'ESTUDIANTE' && <EstudianteDashboard />}
            </>
          )}

          {activeTab === 'cursos' && <CoursesView />}
          {activeTab === 'planes' && <LearningPlansView />}
          {activeTab === 'analisis' && <MLOpsTelemetryView />}
          {activeTab === 'ai-tutor' && <AITutorView />}
          {activeTab === 'evaluaciones' && <EvaluationsView />}
          {activeTab === 'certificados' && <CertificatesView />}
          {activeTab === 'comunidad' && <CommunityChat />}
          {activeTab === 'configuracion' && <AdminConfigView />}
        </main>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <MainContent />
    </AuthProvider>
  );
}

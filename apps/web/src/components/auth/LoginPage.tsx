import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Role } from '../../types';
import { 
  Shield, UserCheck, GraduationCap, ArrowLeft, 
  ArrowRight, Lock, Mail, KeyRound, AlertCircle 
} from 'lucide-react';

interface Props {
  onSuccess: () => void;
}

const ROLE_METADATA = {
  ADMIN: {
    title: 'Administrador',
    subtitle: 'Acceso completo al gobierno del sistema, arquitectura de red neuronal y analítica ejecutiva.',
    email: 'admin@edumaster.ai',
    password: 'Admin2026!',
    color: '#087FE5',
    borderHover: 'hover:border-edu-electric hover:shadow-edu-electric/25',
    badge: 'border-edu-electric/40 bg-edu-electric/20 text-edu-electric',
    icon: Shield
  },
  DOCENTE: {
    title: 'Docente / Instructor',
    subtitle: 'Gestión de cursos asignados, alertas tempranas de abandono y calificación con rúbricas.',
    email: 'docente@edumaster.ai',
    password: 'Docente2026!',
    color: '#8B4DFF',
    borderHover: 'hover:border-edu-violet hover:shadow-edu-violet/25',
    badge: 'border-edu-violet/40 bg-edu-violet/20 text-edu-violet',
    icon: UserCheck
  },
  ESTUDIANTE: {
    title: 'Estudiante',
    subtitle: 'Rutas de aprendizaje personalizadas, tutor de IA explicable y emisión de certificados.',
    email: 'estudiante@edumaster.ai',
    password: 'Estudiante2026!',
    color: '#00BFA6',
    borderHover: 'hover:border-edu-teal hover:shadow-edu-teal/25',
    badge: 'border-edu-teal/40 bg-edu-teal/20 text-edu-teal',
    icon: GraduationCap
  }
};

export const LoginPage: React.FC<Props> = ({ onSuccess }) => {
  const { login } = useAuth();
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSelectRole = (role: Role) => {
    setSelectedRole(role);
    setEmail(ROLE_METADATA[role].email);
    setPassword('');
    setErrorMsg('');
  };

  const handleFillDemo = () => {
    if (!selectedRole) return;
    setEmail(ROLE_METADATA[selectedRole].email);
    setPassword(ROLE_METADATA[selectedRole].password);
    setErrorMsg('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) return;

    setErrorMsg('');
    setIsLoading(true);

    setTimeout(() => {
      const correctEmail = ROLE_METADATA[selectedRole].email.toLowerCase();
      const correctPass = ROLE_METADATA[selectedRole].password;

      if (email.toLowerCase().trim() === correctEmail && password === correctPass) {
        login(email, selectedRole);
        setIsLoading(false);
        onSuccess();
      } else {
        setIsLoading(false);
        setErrorMsg('Credenciales inválidas. Usa el botón "Rellenar demo" para cargar las credenciales oficiales.');
      }
    }, 450);
  };

  return (
    <div className="min-h-screen bg-[#06152B] flex flex-col justify-between items-center p-4 md:p-8 select-none relative overflow-hidden">
      {/* Luces difusas de fondo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-edu-electric/10 via-edu-violet/15 to-edu-teal/10 blur-[130px] rounded-full pointer-events-none"></div>

      {/* BLOQUE CENTRAL AGRUPADO: TITULO + TARJETAS CENTRADAS */}
      <div className="w-full max-w-5xl my-auto flex flex-col items-center justify-center z-10 py-4">
        {/* Encabezado centrado con distancia armoniosa a las tarjetas */}
        <header className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Bienvenido a EduMaster.ai
          </h1>
          <p className="text-xs md:text-sm text-slate-400 mt-2.5 max-w-lg mx-auto">
            {selectedRole 
              ? 'Ingresa tus credenciales autorizadas para acceder a tu panel de control.' 
              : 'Selecciona tu rol institucional para continuar al sistema'}
          </p>
        </header>

        {/* Contenido Principal */}
        <main className="w-full">
          {!selectedRole ? (
            /* TRES TARJETAS DE SELECCION */
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(['ADMIN', 'DOCENTE', 'ESTUDIANTE'] as Role[]).map((r) => {
                const meta = ROLE_METADATA[r];
                const Icon = meta.icon;

                return (
                  <div
                    key={r}
                    onClick={() => handleSelectRole(r)}
                    className={`bg-[#0A1F3D]/90 backdrop-blur-md border border-edu-border/60 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1.5 shadow-xl ${meta.borderHover} group relative flex flex-col justify-between min-h-[220px]`}
                  >
                    <div>
                      {/* Icono con contenedor cuadrado redondeado */}
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-105"
                        style={{ backgroundColor: `${meta.color}15`, border: `1px solid ${meta.color}40` }}
                      >
                        <Icon className="w-6 h-6" style={{ color: meta.color }} />
                      </div>

                      <h3 className="text-lg font-bold text-white group-hover:text-white transition tracking-tight">
                        {meta.title}
                      </h3>

                      <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                        {meta.subtitle}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-edu-border/30 flex items-center justify-between text-xs font-semibold" style={{ color: meta.color }}>
                      <span>Ingresar credenciales</span>
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition duration-200" />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* FORMULARIO DE CREDENCIALES */
            <div className="max-w-md mx-auto bg-[#0A1F3D]/95 backdrop-blur-md border border-edu-border rounded-2xl p-6 md:p-8 shadow-2xl animate-in zoom-in-95 duration-300">
              {/* Boton para regresar */}
              <button
                onClick={() => setSelectedRole(null)}
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition mb-4 group"
              >
                <ArrowLeft className="w-3.5 h-3.5 transform group-hover:-translate-x-1 transition" />
                <span>Cambiar de perfil</span>
              </button>

              {/* Encabezado */}
              <div className="flex items-center gap-3 pb-4 border-b border-edu-border/40">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ 
                    backgroundColor: `${ROLE_METADATA[selectedRole].color}20`, 
                    border: `1px solid ${ROLE_METADATA[selectedRole].color}50` 
                  }}
                >
                  {React.createElement(ROLE_METADATA[selectedRole].icon, { 
                    className: "w-5 h-5", 
                    style: { color: ROLE_METADATA[selectedRole].color } 
                  })}
                </div>
                <div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${ROLE_METADATA[selectedRole].badge}`}>
                    Rol: {ROLE_METADATA[selectedRole].title}
                  </span>
                  <h2 className="text-base font-bold text-white mt-1">Autenticación de Acceso</h2>
                </div>
              </div>

              {/* Asistente Demo */}
              <div className="mt-4 p-2.5 bg-[#06152B] border border-edu-border/50 rounded-xl flex items-center justify-between">
                <span className="text-[11px] text-slate-400">Credenciales oficiales asignadas</span>
                <button
                  type="button"
                  onClick={handleFillDemo}
                  className="px-2.5 py-1 bg-edu-surface2 hover:bg-edu-electric hover:text-white text-edu-cyan text-[11px] font-semibold rounded-lg border border-edu-border transition flex items-center gap-1"
                >
                  <KeyRound className="w-3 h-3" />
                  Rellenar demo
                </button>
              </div>

              {/* Formulario */}
              <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1.5">
                    Correo Electrónico
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={ROLE_METADATA[selectedRole].email}
                      className="w-full bg-[#06152B] border border-edu-border rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-edu-cyan transition"
                      required
                    />
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1.5">
                    Contraseña
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Escribe tu contraseña"
                      className="w-full bg-[#06152B] border border-edu-border rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-edu-cyan transition"
                      required
                    />
                    <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  </div>
                </div>

                {errorMsg && (
                  <div className="p-2.5 bg-red-500/15 border border-red-500/30 rounded-lg text-[11px] text-red-300 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 text-white font-bold rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-xl shadow-edu-electric/25"
                  style={{ backgroundColor: ROLE_METADATA[selectedRole].color }}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      Validando credenciales...
                    </span>
                  ) : (
                    <>
                      <span>Iniciar Sesión en el Dashboard</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          )}
        </main>
      </div>

      {/* FOOTER DISCRETO */}
      <footer className="text-center text-[11px] text-slate-500 pb-3 z-10 flex flex-wrap items-center justify-center gap-3">
        <span>EduMaster.ai Enterprise v1.4.2</span>
        <span>•</span>
        <span>Servidor Azure: 40.116.69.29 (Ubuntu 24.04 LTS)</span>
      </footer>
    </div>
  );
};

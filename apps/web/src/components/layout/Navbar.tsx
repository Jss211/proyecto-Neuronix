import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Search, Bell, LogOut } from 'lucide-react';

interface Props {
  onLogout: () => void;
}

export const Navbar: React.FC<Props> = ({ onLogout }) => {
  const { user } = useAuth();

  return (
    <header className="h-16 bg-[#0A1F3D] border-b border-edu-border px-4 md:px-6 flex items-center justify-between sticky top-0 z-30 shadow-md">
      {/* Lado Izquierdo: Puntuacion Global */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1 bg-[#06152B] rounded-full border border-edu-border/40 text-xs">
          <span className="text-slate-400">Puntuación Global:</span>
          <span className="text-edu-cyan font-bold font-mono">92.6%</span>
        </div>
      </div>

      {/* Controles de la Derecha: Buscador, Notificaciones y Perfil */}
      <div className="flex items-center gap-3 md:gap-4">
        {/* Buscador */}
        <button className="p-2 text-slate-400 hover:text-white hover:bg-edu-surface2 rounded-lg transition" title="Buscar">
          <Search className="w-4 h-4" />
        </button>

        {/* Notificaciones */}
        <div className="relative">
          <button className="p-2 text-slate-400 hover:text-white hover:bg-edu-surface2 rounded-lg transition" title="Notificaciones">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-edu-cyan animate-pulse"></span>
          </button>
        </div>

        {/* Perfil del Usuario Activo */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-edu-border/50">
          <img
            src={user?.avatar_url}
            alt={user?.name}
            className="w-8 h-8 rounded-full border border-edu-cyan/50 object-cover"
          />
          <div className="hidden md:block text-left text-xs">
            <span className="text-white font-semibold block leading-tight">{user?.name}</span>
            <span className="text-[10px] text-slate-400 block leading-tight truncate max-w-[130px]">
              {user?.title}
            </span>
          </div>

          {/* Boton Cerrar Sesion */}
          <button
            onClick={onLogout}
            className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition ml-1 flex items-center gap-1 text-xs"
            title="Cerrar Sesión"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden xl:inline text-[11px]">Salir</span>
          </button>
        </div>
      </div>
    </header>
  );
};

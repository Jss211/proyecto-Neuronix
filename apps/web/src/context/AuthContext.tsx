import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Role } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, role: Role) => void;
  logout: () => void;
  switchRole: (role: Role) => void;
}

const DEFAULT_USERS: Record<Role, User> = {
  ADMIN: {
    id: 'usr-admin-001',
    email: 'admin@edumaster.ai',
    name: 'Dr. Segura',
    role: 'ADMIN',
    title: 'Director Académico & Administrador General',
    avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150'
  },
  DOCENTE: {
    id: 'usr-docente-002',
    email: 'docente@edumaster.ai',
    name: 'Profesor Carlos Zambrano',
    role: 'DOCENTE',
    title: 'Instructor Principal IA',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
  },
  ESTUDIANTE: {
    id: 'usr-student-003',
    email: 'estudiante@edumaster.ai',
    name: 'Jordan Rojas',
    role: 'ESTUDIANTE',
    title: 'Estudiante de Inteligencia Artificial',
    avatar_url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150'
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('edumaster_user');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Garantizamos que tome el nombre actualizado según el rol
        const role = (parsed.role as Role) || 'ADMIN';
        const updated = { ...DEFAULT_USERS[role], ...parsed, name: DEFAULT_USERS[role].name };
        localStorage.setItem('edumaster_user', JSON.stringify(updated));
        return updated;
      }
    } catch (e) {}
    return DEFAULT_USERS.ADMIN;
  });

  const login = (_email: string, role: Role) => {
    const selectedUser = DEFAULT_USERS[role];
    setUser(selectedUser);
    localStorage.setItem('edumaster_user', JSON.stringify(selectedUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('edumaster_user');
  };

  const switchRole = (role: Role) => {
    login('', role);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

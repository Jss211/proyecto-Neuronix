import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  getCommunityMessages, 
  sendCommunityMessage, 
  subscribeToCommunityMessages 
} from '../../services/supabase';
import { 
  Users2, MessageSquare, Send, ShieldCheck, GraduationCap, 
  User, CheckCheck, Circle, Search, ArrowRight, Lock, 
  Sparkles, Clock, Phone, Video, RefreshCw, UserCheck 
} from 'lucide-react';

interface DirectContact {
  id: string;             // Identificador unico del contacto
  threadId: string;       // ID CANONICO COMPARTIDO del hilo (ej: thread_admin_estudiante)
  name: string;
  role: 'ADMIN' | 'DOCENTE' | 'ESTUDIANTE' | 'SOPORTE';
  email: string;
  title: string;
  online: boolean;
  unreadCount: number;
}

interface DirectMessage {
  id: string;
  threadId: string;
  senderName: string;
  senderRole: 'ADMIN' | 'DOCENTE' | 'ESTUDIANTE' | 'SOPORTE';
  senderEmail: string;
  content: string;
  timestamp: string;
}

const STORAGE_KEY = 'edumaster_direct_conversations_v4';

// Sembrado inicial de conversaciones canónicas (compartidas entre ambos extremos)
const DEFAULT_CONVERSATIONS: Record<string, DirectMessage[]> = {
  // Hilo compartido entre ADMIN (Dr. Segura) y ESTUDIANTE (Jordan Rojas)
  'thread_admin_estudiante': [
    {
      id: 'ae-1',
      threadId: 'thread_admin_estudiante',
      senderName: 'Dr. Segura',
      senderRole: 'ADMIN',
      senderEmail: 'admin@edumaster.ai',
      content: 'Estimado Jordan, te confirmamos que tu acceso y credenciales en la máquina virtual Azure (40.116.69.29) han sido validados con éxito.',
      timestamp: 'Ayer 04:30 PM'
    },
    {
      id: 'ae-2',
      threadId: 'thread_admin_estudiante',
      senderName: 'Jordan Rojas',
      senderRole: 'ESTUDIANTE',
      senderEmail: 'estudiante@edumaster.ai',
      content: 'Recibido Dr. Segura. La latencia P99 está en 23.4 ms y los contenedores de inferencia responden sin problemas.',
      timestamp: 'Ayer 04:45 PM'
    },
    {
      id: 'ae-3',
      threadId: 'thread_admin_estudiante',
      senderName: 'Dr. Segura',
      senderRole: 'ADMIN',
      senderEmail: 'admin@edumaster.ai',
      content: 'Excelente. Tu diploma con código QR oficial ya está disponible en la pestaña de Certificados para su verificación pública.',
      timestamp: 'Ayer 05:00 PM'
    }
  ],

  // Hilo compartido entre DOCENTE (Profesor Carlos Zambrano) y ESTUDIANTE (Jordan Rojas)
  'thread_docente_estudiante': [
    {
      id: 'de-1',
      threadId: 'thread_docente_estudiante',
      senderName: 'Profesor Carlos Zambrano',
      senderRole: 'DOCENTE',
      senderEmail: 'docente@edumaster.ai',
      content: 'Buenas tardes Jordan. He revisado tu entrega del modelo multitarea en PyTorch. La regularización Dropout está muy bien calibrada.',
      timestamp: '10:15 AM'
    },
    {
      id: 'de-2',
      threadId: 'thread_docente_estudiante',
      senderName: 'Jordan Rojas',
      senderRole: 'ESTUDIANTE',
      senderEmail: 'estudiante@edumaster.ai',
      content: 'Muchas gracias profesor. Para la evaluación de mañana, ¿la sustentación incluirá la explicación matemática de la celda GRU?',
      timestamp: '10:18 AM'
    },
    {
      id: 'de-3',
      threadId: 'thread_docente_estudiante',
      senderName: 'Profesor Carlos Zambrano',
      senderRole: 'DOCENTE',
      senderEmail: 'docente@edumaster.ai',
      content: 'Sí, enfócate en cómo las compuertas de reinicio y actualización regulan la memoria temporal antes de la capa densa. Tu código corre excelente.',
      timestamp: '10:20 AM'
    }
  ],

  // Hilo compartido entre ADMIN (Dr. Segura) y DOCENTE (Profesor Carlos Zambrano)
  'thread_admin_docente': [
    {
      id: 'ad-1',
      threadId: 'thread_admin_docente',
      senderName: 'Dr. Segura',
      senderRole: 'ADMIN',
      senderEmail: 'admin@edumaster.ai',
      content: 'Profesor Carlos, ¿ya fueron enviadas las actas finales con calificaciones para emitir las certificaciones criptográficas?',
      timestamp: 'Ayer 02:00 PM'
    },
    {
      id: 'ad-2',
      threadId: 'thread_admin_docente',
      senderName: 'Profesor Carlos Zambrano',
      senderRole: 'DOCENTE',
      senderEmail: 'docente@edumaster.ai',
      content: 'Sí Dr. Segura. Las notas están cerradas con Jordan Rojas en 19.5/20 y promedio general de cohorte en 17.8. Proceda con la firma digital.',
      timestamp: 'Ayer 02:15 PM'
    }
  ],

  // Hilo de SOPORTE TÉCNICO
  'thread_soporte_azure': [
    {
      id: 'sp-1',
      threadId: 'thread_soporte_azure',
      senderName: 'Soporte Azure & MLOps',
      senderRole: 'SOPORTE',
      senderEmail: 'soporte@edumaster.ai',
      content: 'El clúster de base de datos Supabase PostgreSQL y los WebSockets de tiempo real se encuentran con 99.98% de disponibilidad.',
      timestamp: '09:00 AM'
    }
  ]
};

export const CommunityChat: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [inputText, setInputText] = useState('');
  
  // Carga inicial persistente de localStorage con fallback a DEFAULT_CONVERSATIONS
  const [conversations, setConversations] = useState<Record<string, DirectMessage[]>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Mezclamos con defaults para que ningún hilo quede vacío
        return { ...DEFAULT_CONVERSATIONS, ...parsed };
      }
    } catch (e) {}
    return DEFAULT_CONVERSATIONS;
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Lista de contactos personalizada según el rol del usuario actual
  // NOTA CRÍTICA: Cada contacto tiene un "threadId" CANÓNICO idéntico para ambas partes.
  const getContactsForRole = (): DirectContact[] => {
    if (user?.role === 'ESTUDIANTE') {
      return [
        {
          id: 'contact-admin',
          threadId: 'thread_admin_estudiante', // Mismo hilo que usa el Admin
          name: 'Dr. Segura',
          role: 'ADMIN',
          email: 'admin@edumaster.ai',
          title: 'Director Académico & Administrador General',
          online: true,
          unreadCount: 0
        },
        {
          id: 'contact-docente',
          threadId: 'thread_docente_estudiante', // Mismo hilo que usa el Docente
          name: 'Profesor Carlos Zambrano',
          role: 'DOCENTE',
          email: 'docente@edumaster.ai',
          title: 'Instructor Principal de Inteligencia Artificial',
          online: true,
          unreadCount: 0
        },
        {
          id: 'contact-soporte',
          threadId: 'thread_soporte_azure',
          name: 'Soporte Azure & MLOps',
          role: 'SOPORTE',
          email: 'soporte@edumaster.ai',
          title: 'Mesa de Ayuda Cloud (40.116.69.29)',
          online: true,
          unreadCount: 0
        }
      ];
    } else if (user?.role === 'DOCENTE') {
      return [
        {
          id: 'contact-estudiante',
          threadId: 'thread_docente_estudiante', // Mismo hilo que usa el Estudiante
          name: 'Jordan Rojas',
          role: 'ESTUDIANTE',
          email: 'estudiante@edumaster.ai',
          title: 'Estudiante de Inteligencia Artificial (Promedio: 19.5)',
          online: true,
          unreadCount: 0
        },
        {
          id: 'contact-admin',
          threadId: 'thread_admin_docente', // Mismo hilo que usa el Admin
          name: 'Dr. Segura',
          role: 'ADMIN',
          email: 'admin@edumaster.ai',
          title: 'Director Académico',
          online: true,
          unreadCount: 0
        },
        {
          id: 'contact-soporte',
          threadId: 'thread_soporte_azure',
          name: 'Soporte Azure & MLOps',
          role: 'SOPORTE',
          email: 'soporte@edumaster.ai',
          title: 'Infraestructura Cloud',
          online: true,
          unreadCount: 0
        }
      ];
    } else {
      // ADMIN
      return [
        {
          id: 'contact-estudiante',
          threadId: 'thread_admin_estudiante', // EXACTAMENTE EL MISMO HILO QUE LEE EL ESTUDIANTE
          name: 'Jordan Rojas',
          role: 'ESTUDIANTE',
          email: 'estudiante@edumaster.ai',
          title: 'Estudiante de Inteligencia Artificial (Jordan Rojas)',
          online: true,
          unreadCount: 0
        },
        {
          id: 'contact-docente',
          threadId: 'thread_admin_docente', // EXACTAMENTE EL MISMO HILO QUE LEE EL DOCENTE
          name: 'Profesor Carlos Zambrano',
          role: 'DOCENTE',
          email: 'docente@edumaster.ai',
          title: 'Instructor Principal de IA',
          online: true,
          unreadCount: 0
        },
        {
          id: 'contact-soporte',
          threadId: 'thread_soporte_azure',
          name: 'Soporte Azure & MLOps',
          role: 'SOPORTE',
          email: 'soporte@edumaster.ai',
          title: 'Infraestructura Cloud (40.116.69.29)',
          online: true,
          unreadCount: 0
        }
      ];
    }
  };

  const contacts = getContactsForRole();
  const [selectedContact, setSelectedContact] = useState<DirectContact>(contacts[0]);

  // Si cambia el rol del usuario, selecciona el primer contacto de ese rol
  useEffect(() => {
    const newContacts = getContactsForRole();
    if (newContacts.length > 0) {
      setSelectedContact(newContacts[0]);
    }
  }, [user?.role]);

  const activeThreadId = selectedContact.threadId;
  const activeMessages = conversations[activeThreadId] || [];

  // 1. Cargar mensajes remotos de Supabase al montar o al cambiar de hilo
  useEffect(() => {
    let isSubscribed = true;

    const fetchRemoteMessages = async () => {
      try {
        const remoteMsgs = await getCommunityMessages(activeThreadId);
        if (remoteMsgs && remoteMsgs.length > 0 && isSubscribed) {
          setConversations((prev) => {
            const currentThread = prev[activeThreadId] || [];
            const existingIds = new Set(currentThread.map((m) => m.id));
            
            const formattedRemote: DirectMessage[] = remoteMsgs
              .filter((rm: any) => !existingIds.has(rm.id))
              .map((rm: any) => ({
                id: rm.id,
                threadId: activeThreadId,
                senderName: rm.sender_name,
                senderRole: rm.sender_role,
                senderEmail: rm.sender_email || '',
                content: rm.content,
                timestamp: new Date(rm.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              }));

            if (formattedRemote.length === 0) return prev;

            const updated = {
              ...prev,
              [activeThreadId]: [...currentThread, ...formattedRemote]
            };
            try {
              localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            } catch (e) {}
            return updated;
          });
        }
      } catch (err) {}
    };

    fetchRemoteMessages();

    // 2. Suscripción en tiempo real con Supabase WebSockets
    const unsubscribe = subscribeToCommunityMessages(activeThreadId, (newPayload: any) => {
      if (!isSubscribed || !newPayload) return;

      const incomingMsg: DirectMessage = {
        id: newPayload.id || `m-rt-${Date.now()}`,
        threadId: activeThreadId,
        senderName: newPayload.sender_name,
        senderRole: newPayload.sender_role,
        senderEmail: newPayload.sender_email || '',
        content: newPayload.content,
        timestamp: new Date(newPayload.created_at || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setConversations((prev) => {
        const currentThread = prev[activeThreadId] || [];
        if (currentThread.some((m) => m.id === incomingMsg.id || (m.content === incomingMsg.content && m.senderName === incomingMsg.senderName))) {
          return prev;
        }
        const updated = {
          ...prev,
          [activeThreadId]: [...currentThread, incomingMsg]
        };
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        } catch (e) {}
        return updated;
      });
    });

    return () => {
      isSubscribed = false;
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, [activeThreadId]);

  // Scroll automático al último mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeMessages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const text = inputText.trim();
    setInputText('');

    const newMsg: DirectMessage = {
      id: `m-${Date.now()}`,
      threadId: activeThreadId,
      senderName: user?.name || 'Usuario',
      senderRole: (user?.role as any) || 'ADMIN',
      senderEmail: user?.email || '',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Actualización inmediata en estado local y persistencia en localStorage
    setConversations((prev) => {
      const updated = {
        ...prev,
        [activeThreadId]: [...(prev[activeThreadId] || []), newMsg]
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (err) {}
      return updated;
    });

    // Envío a Supabase PostgreSQL para sincronización multi-navegador / tiempo real
    try {
      await sendCommunityMessage({
        channel_id: activeThreadId,
        sender_name: user?.name || 'Usuario',
        sender_role: (user?.role as any) || 'ADMIN',
        sender_email: user?.email || '',
        content: text
      });
    } catch (err) {
      console.warn('Mensaje guardado localmente en hilo institucional:', activeThreadId);
    }
  };

  const filteredContacts = contacts.filter((c) => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-[#0A1F3D] border border-edu-border rounded-xl shadow-xl overflow-hidden flex flex-col h-[calc(100vh-170px)] min-h-[580px] animate-in fade-in select-none">
      {/* Barra Superior con Identificación de Sesión e Hilo Activo */}
      <div className="p-4 border-b border-edu-border/50 bg-[#06152B]/90 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-edu-electric/20 border border-edu-electric/40 rounded-xl text-edu-cyan">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-extrabold text-white text-base tracking-wide flex items-center gap-2">
              Mensajería Institucional 1 a 1
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-edu-teal/20 text-edu-teal border border-edu-teal/30">
                Sincronización Bidireccional
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Canal privado directo entre <strong>{user?.name} ({user?.role})</strong> y <strong>{selectedContact.name} ({selectedContact.role})</strong>.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="bg-[#0A1F3D] px-3 py-1.5 rounded-lg border border-edu-border text-slate-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-edu-teal animate-pulse"></span>
            Canal Cifrado: <strong className="text-edu-cyan font-mono">{activeThreadId}</strong>
          </span>
        </div>
      </div>

      {/* Cuerpo: Panel Izquierdo de Contactos + Panel Derecho de Conversación */}
      <div className="flex-1 flex overflow-hidden">
        {/* Panel Izquierdo: Lista de Personas / Contactos */}
        <div className="w-80 border-r border-edu-border/50 bg-[#06152B]/60 flex flex-col justify-between shrink-0">
          <div className="p-3 border-b border-edu-border/40">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar contacto..."
                className="w-full bg-[#0A1F3D] border border-edu-border rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-edu-cyan transition"
              />
            </div>
          </div>

          {/* Lista de Chats Individuales */}
          <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider px-2 block my-1">
              Personas Disponibles
            </span>

            {filteredContacts.map((contact) => {
              const isSelected = selectedContact.id === contact.id;
              const contactThreadMsgs = conversations[contact.threadId] || [];
              const lastMsg = contactThreadMsgs[contactThreadMsgs.length - 1];

              return (
                <div
                  key={contact.id}
                  onClick={() => setSelectedContact(contact)}
                  className={`p-3 rounded-xl cursor-pointer transition flex items-start gap-3 ${
                    isSelected
                      ? 'bg-edu-electric/20 border-2 border-edu-cyan shadow-md shadow-edu-cyan/15'
                      : 'hover:bg-[#0A1F3D] border border-transparent'
                  }`}
                >
                  {/* Avatar con Estado En Línea */}
                  <div className="relative shrink-0">
                    <div className="w-10 h-10 rounded-full bg-edu-surface2 border border-edu-cyan/40 flex items-center justify-center font-bold text-white text-xs shadow">
                      {contact.name.slice(0, 2).toUpperCase()}
                    </div>
                    {contact.online && (
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-edu-teal border-2 border-[#06152B]"></span>
                    )}
                  </div>

                  {/* Información del Contacto */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className={`text-xs font-bold truncate ${isSelected ? 'text-edu-cyan' : 'text-white'}`}>
                        {contact.name}
                      </span>
                      {lastMsg && (
                        <span className="text-[9px] text-slate-500 font-mono shrink-0 ml-1">
                          {lastMsg.timestamp}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 mb-1">
                      {contact.role === 'ADMIN' && (
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-edu-electric/25 text-edu-cyan font-mono flex items-center gap-0.5">
                          <ShieldCheck className="w-2.5 h-2.5" /> ADMIN
                        </span>
                      )}
                      {contact.role === 'DOCENTE' && (
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-edu-violet/25 text-edu-violet font-mono flex items-center gap-0.5">
                          <GraduationCap className="w-2.5 h-2.5" /> DOCENTE
                        </span>
                      )}
                      {contact.role === 'ESTUDIANTE' && (
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-edu-teal/25 text-edu-teal font-mono flex items-center gap-0.5">
                          <User className="w-2.5 h-2.5" /> ESTUDIANTE
                        </span>
                      )}
                    </div>

                    <p className="text-[11px] text-slate-400 truncate">
                      {lastMsg ? lastMsg.content : 'Sin mensajes previos'}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3 border-t border-edu-border/40 text-[10px] text-slate-400 font-mono flex items-center justify-between bg-[#06152B]">
            <span>Persistencia: LocalStorage + Supabase</span>
            <span className="text-edu-teal font-bold">Activo</span>
          </div>
        </div>

        {/* Panel Derecho: Área de Conversación Directa */}
        <div className="flex-1 flex flex-col justify-between overflow-hidden bg-[#0A1F3D]/30">
          {/* Header del Chat Seleccionado */}
          <div className="p-3.5 px-5 bg-[#06152B]/80 border-b border-edu-border/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-edu-surface2 border border-edu-cyan/40 flex items-center justify-center font-bold text-white text-xs">
                  {selectedContact.name.slice(0, 2).toUpperCase()}
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-edu-teal border-2 border-[#06152B]"></span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-white">{selectedContact.name}</h3>
                  <span className="text-[10px] px-2 py-0.2 rounded bg-edu-electric/20 text-edu-cyan font-mono font-bold">
                    {selectedContact.role}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">{selectedContact.title}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-slate-400">
              <span className="text-xs text-edu-teal font-mono flex items-center gap-1.5">
                <Circle className="w-2 h-2 fill-edu-teal animate-pulse" /> En Línea
              </span>
            </div>
          </div>

          {/* Mensajes del Hilo Compartido */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
            <div className="text-center my-2">
              <span className="px-3.5 py-1 rounded-full text-[10px] font-mono bg-[#06152B] border border-edu-border/70 text-slate-400">
                Hilo seguro y sincronizado con {selectedContact.name} ({activeMessages.length} mensajes)
              </span>
            </div>

            {activeMessages.map((msg) => {
              const isMe = msg.senderName === user?.name || msg.senderRole === user?.role;

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-bold text-slate-300">
                      {isMe ? 'Tú' : msg.senderName}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">{msg.timestamp}</span>
                  </div>

                  <div
                    className={`max-w-[75%] p-3.5 rounded-2xl text-xs leading-relaxed shadow-lg ${
                      isMe
                        ? 'bg-edu-electric text-white rounded-br-xs shadow-edu-electric/20 font-medium'
                        : 'bg-[#06152B] border border-edu-border/80 text-slate-200 rounded-bl-xs'
                    }`}
                  >
                    <p className="break-words whitespace-pre-wrap">{msg.content}</p>
                  </div>

                  {isMe && (
                    <span className="flex items-center gap-1 text-[10px] text-edu-teal mt-1 font-mono">
                      <CheckCheck className="w-3.5 h-3.5" /> Entregado y Sincronizado
                    </span>
                  )}
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Formulario de Envío de Mensaje */}
          <div className="p-3.5 bg-[#06152B] border-t border-edu-border/50">
            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={`Escribe a ${selectedContact.name}... (Presiona Enter para enviar)`}
                className="flex-1 bg-[#0A1F3D] border border-edu-border rounded-xl px-4 py-3 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-edu-cyan transition"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="px-5 py-3 bg-edu-electric hover:bg-edu-electric/90 disabled:opacity-50 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-lg shadow-edu-electric/25"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Enviar</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

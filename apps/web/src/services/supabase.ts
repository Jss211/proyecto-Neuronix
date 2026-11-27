import { createClient } from '@supabase/supabase-js';

const env = (import.meta as any).env || {};
const supabaseUrl = env.VITE_SUPABASE_URL || 'https://qfzbduwwpearrvubfjbd.supabase.co';
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_BT7zgBegwITRQT3kfx9BLw_MKWDJKNI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
});

export const isSupabaseConnected = () => {
  return Boolean(supabaseUrl && supabaseAnonKey);
};

// Helper para suscripcion en tiempo real a eventos de aprendizaje
export const subscribeToLearningEvents = (onEvent: (payload: any) => void) => {
  const channel = supabase
    .channel('learning_events_realtime')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'learning_events' },
      (payload) => {
        onEvent(payload.new);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
};

// Helper para suscripcion a alertas de abandono del docente
export const subscribeToDropoutAlerts = (onAlert: (payload: any) => void) => {
  const channel = supabase
    .channel('dropout_alerts_realtime')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'dropout_alerts' },
      (payload) => {
        onAlert(payload.new);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
};


// Helper para suscripcion y envio de mensajes de chat en tiempo real
export const getCommunityMessages = async (channelId: string) => {
  const { data, error } = await supabase
    .from('community_messages')
    .select('*')
    .eq('channel_id', channelId)
    .order('created_at', { ascending: true })
    .limit(50);

  if (error) {
    console.warn('Error fetching community messages from Supabase:', error);
    return [];
  }
  return data || [];
};

export const sendCommunityMessage = async (msg: {
  channel_id: string;
  sender_name: string;
  sender_role: 'ADMIN' | 'DOCENTE' | 'ESTUDIANTE';
  sender_email?: string;
  content: string;
}) => {
  const { data, error } = await supabase
    .from('community_messages')
    .insert([msg])
    .select()
    .single();

  if (error) {
    console.warn('Error sending message to Supabase:', error);
    throw error;
  }
  return data;
};

export const subscribeToCommunityMessages = (
  channelId: string,
  onMessage: (msg: any) => void
) => {
  const channel = supabase
    .channel(`community_${channelId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'community_messages',
        filter: `channel_id=eq.${channelId}`
      },
      (payload) => {
        onMessage(payload.new);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
};

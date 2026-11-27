-- ==============================================================================
-- EDUMASTER.AI - ESQUEMA DE BASE DE DATOS Y TIEMPO REAL (SUPABASE POSTGRESQL)
-- ==============================================================================

-- 1. Tabla de Perfiles y Roles (RBAC)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('ADMIN', 'DOCENTE', 'ESTUDIANTE')),
    title TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Tabla de Eventos de Aprendizaje (Learning Tracking en Tiempo Real)
CREATE TABLE IF NOT EXISTS public.learning_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_type TEXT NOT NULL,
    student_name TEXT NOT NULL,
    course TEXT NOT NULL,
    occurred_at TIMESTAMPTZ DEFAULT NOW(),
    payload JSONB DEFAULT '{}'::jsonb
);

-- 3. Tabla de Alertas de Desercion / Abandono (Cabeza C de la Red Neuronal)
CREATE TABLE IF NOT EXISTS public.dropout_alerts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_name TEXT NOT NULL,
    course TEXT NOT NULL,
    risk_score NUMERIC(4, 2) NOT NULL,
    risk_level TEXT NOT NULL CHECK (risk_level IN ('CRITICO', 'MODERADO', 'BAJO')),
    inactive_days INTEGER NOT NULL,
    missing_assignments INTEGER NOT NULL,
    suggested_action TEXT,
    status TEXT DEFAULT 'PENDIENTE' CHECK (status IN ('PENDIENTE', 'INTERVENIDO')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Tabla de Recomendaciones del Tutor IA (Cabeza D)
CREATE TABLE IF NOT EXISTS public.recommendations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    reason TEXT NOT NULL,
    estimated_effort TEXT,
    impact TEXT CHECK (impact IN ('Critico', 'Alto', 'Medio', 'Informativo')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- ACTIVACION DE CANAL REALTIME EN SUPABASE
-- ==============================================================================
ALTER PUBLICATION supabase_realtime ADD TABLE public.learning_events;
ALTER PUBLICATION supabase_realtime ADD TABLE public.dropout_alerts;
ALTER PUBLICATION supabase_realtime ADD TABLE public.recommendations;

-- ==============================================================================
-- DATOS INICIALES DEMO (PRE-SEMBRADO OFICIAL)
-- ==============================================================================
INSERT INTO public.profiles (email, name, role, title) VALUES
('admin@edumaster.ai', 'Dr. Segura', 'ADMIN', 'Director Académico'),
('docente@edumaster.ai', 'Profesor Carlos Zambrano', 'DOCENTE', 'Instructor Principal IA'),
('estudiante@edumaster.ai', 'Jordan Rojas', 'ESTUDIANTE', 'Estudiante de Inteligencia Artificial')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.dropout_alerts (student_name, course, risk_score, risk_level, inactive_days, missing_assignments, suggested_action) VALUES
('Luis Alberto García', 'Deep Learning y Redes Convolucionales', 0.78, 'CRITICO', 12, 2, 'Enviar recordatorio y sesión de tutoría 1 a 1'),
('Mariana Paredes Soto', 'Machine Learning para Negocios', 0.64, 'MODERADO', 8, 1, 'Revisar dudas en el foro de discusión'),
('Jorge Huamán Castro', 'Arquitectura Cloud y MLOps', 0.45, 'BAJO', 5, 0, 'Monitoreo regular')
ON CONFLICT DO NOTHING;

INSERT INTO public.recommendations (title, category, reason, estimated_effort, impact) VALUES
('Repasa: Inteligencia Artificial Avanzada', 'Inteligencia Artificial', 'Detectamos brecha en la evaluación de backpropagation del Módulo 4', '45 min', 'Alto'),
('Completa: Machine Learning Básico', 'Machine Learning', 'Prerrequisito para desbloquear el examen de certificación', '20 min', 'Medio'),
('Sigue: Ruta de Ciencia de Datos', 'Ciencia de Datos', 'Alineado a tu meta académica de especialización', '1h 30m', 'Alto'),
('Realiza: Proyecto Final de Python', 'Desarrollo Web', 'Evidencia requerida para el certificado oficial de la cohorte', '2 horas', 'Critico');


-- ==============================================================================
-- 5. TABLA DE CHAT Y COMUNIDAD EN TIEMPO REAL
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.community_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    channel_id VARCHAR(50) NOT NULL DEFAULT 'general',
    sender_name VARCHAR(100) NOT NULL,
    sender_role VARCHAR(20) NOT NULL CHECK (sender_role IN ('ADMIN', 'DOCENTE', 'ESTUDIANTE')),
    sender_email VARCHAR(120),
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 6. TABLA DE CERTIFICADOS VERIFICABLES
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.certificates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    certificate_code VARCHAR(50) UNIQUE NOT NULL,
    student_name VARCHAR(120) NOT NULL,
    course_name VARCHAR(150) NOT NULL,
    grade NUMERIC(4, 2) NOT NULL,
    issue_date DATE DEFAULT CURRENT_DATE,
    signature_hash TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'EMITIDO' CHECK (status IN ('EMITIDO', 'REVOCADO')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER PUBLICATION supabase_realtime ADD TABLE public.community_messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.certificates;

-- Sembrado inicial de mensajes de chat
INSERT INTO public.community_messages (channel_id, sender_name, sender_role, sender_email, content) VALUES
('anuncios', 'Dr. Segura', 'ADMIN', 'admin@edumaster.ai', 'Bienvenidos a la plataforma EduMaster.ai. El clúster de inferencia con PyTorch y Azure B2als_v2 se encuentra 100% operativo.'),
('anuncios', 'Profesor Carlos Zambrano', 'DOCENTE', 'docente@edumaster.ai', 'Recordatorio: Mañana es la entrega final del proyecto de Redes Neuronales Multitarea. Revisen los módulos antes de la medianoche.'),
('general', 'Jordan Rojas', 'ESTUDIANTE', 'estudiante@edumaster.ai', 'Buenas noches profesor, la visualización de los axones y tensores de la red GRU está corriendo fluida en tiempo real.'),
('general', 'Profesor Carlos Zambrano', 'DOCENTE', 'docente@edumaster.ai', 'Excelente Jordan. Te sugiero revisar la matriz de confusión y el reporte de pérdida antes de la evaluación.'),
('tutoria-ia', 'Jordan Rojas', 'ESTUDIANTE', 'estudiante@edumaster.ai', 'Profesor, ¿la función de pérdida utiliza BCEWithLogitsLoss para la cabeza de riesgo de abandono?'),
('tutoria-ia', 'Profesor Carlos Zambrano', 'DOCENTE', 'docente@edumaster.ai', 'Correcto, para la Cabeza C usamos BCEWithLogitsLoss combinada con pesos balanceados contra desbalance de clases.')
ON CONFLICT DO NOTHING;

-- Sembrado inicial de certificados
INSERT INTO public.certificates (certificate_code, student_name, course_name, grade, signature_hash) VALUES
('CERT-2026-X94B2', 'Jordan Rojas', 'Arquitectura de Redes Neuronales y Deep Learning con PyTorch', 19.50, 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'),
('CERT-2026-M81C9', 'Jordan Rojas', 'Machine Learning Empresarial y Análisis Predictivo', 18.80, '8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4')
ON CONFLICT DO NOTHING;

export type Role = 'ADMIN' | 'DOCENTE' | 'ESTUDIANTE';

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  title: string;
  avatar_url: string;
}

export type ModelState = 
  | 'DETENIDO' 
  | 'CARGANDO' 
  | 'ENTRENANDO' 
  | 'VALIDANDO' 
  | 'PUBLICADO' 
  | 'INFERENCIA_ACTIVA' 
  | 'ERROR';

export interface NeuronNode {
  id: string;
  label: string;
  activation: number;
}

export interface NeuralLayer {
  id: string;
  name: string;
  color: string;
  neurons: NeuronNode[];
}

export interface KPIItem {
  valor: number | string;
  variacion: string;
  periodo?: string;
  moneda?: string;
}

export interface RecommendationItem {
  id: string;
  title: string;
  category: string;
  reason: string;
  estimated_effort: string;
  impact: 'Critico' | 'Alto' | 'Medio' | 'Informativo';
}

export interface DropoutAlert {
  id: string;
  student_name: string;
  course: string;
  risk_score: number;
  risk_level: 'CRITICO' | 'MODERADO' | 'BAJO';
  inactive_days: number;
  missing_assignments: number;
  suggested_action: string;
}

from fastapi import APIRouter

router = APIRouter(prefix="/analytics", tags=["Analítica y Competencias"])

@router.get("/skill-mastery")
async def get_skill_mastery():
    """
    Retorna la matriz de dominio de competencias (Heatmap)
    Niveles: Aprender, Practicar, Aplicar, Avanzado, Experto
    """
    return {
        "levels": ["Aprender", "Practicar", "Aplicar", "Avanzado", "Experto"],
        "categories": [
            {
                "name": "Inteligencia Artificial",
                "scores": [95, 88, 82, 74, 60] # Intensidad porcentual 0-100%
            },
            {
                "name": "Machine Learning",
                "scores": [92, 85, 78, 70, 52]
            },
            {
                "name": "Ciencia de Datos",
                "scores": [88, 80, 75, 65, 45]
            },
            {
                "name": "Desarrollo Web",
                "scores": [90, 84, 80, 72, 58]
            },
            {
                "name": "Nube y DevOps",
                "scores": [85, 76, 68, 55, 40]
            }
        ]
    }

@router.get("/recommendations")
async def get_recommendations():
    """
    Recomendaciones generadas por la Cabeza D de la red neuronal
    con explicabilidad transparente segun la seccion 4.5
    """
    return [
        {
            "id": "rec-01",
            "title": "Repasa: Inteligencia Artificial Avanzada",
            "category": "Inteligencia Artificial",
            "reason": "Detectamos brecha en la evaluación de backpropagation del Módulo 4",
            "estimated_effort": "45 min",
            "impact": "Alto"
        },
        {
            "id": "rec-02",
            "title": "Completa: Machine Learning Básico",
            "category": "Machine Learning",
            "reason": "Prerrequisito para desbloquear el examen de certificación",
            "estimated_effort": "20 min",
            "impact": "Medio"
        },
        {
            "id": "rec-03",
            "title": "Sigue: Ruta de Ciencia de Datos",
            "category": "Ciencia de Datos",
            "reason": "Alineado a tu meta académica de especialización",
            "estimated_effort": "1h 30m",
            "impact": "Alto"
        },
        {
            "id": "rec-04",
            "title": "Realiza: Proyecto Final de Python",
            "category": "Desarrollo Web",
            "reason": "Evidencia requerida para el certificado oficial de la cohorte",
            "estimated_effort": "2 horas",
            "impact": "Critico"
        },
        {
            "id": "rec-05",
            "title": "Explora: Nuevos Cursos en IA",
            "category": "Inteligencia Artificial",
            "reason": "Basado en tu alto percentil de progreso en cálculo tensorial",
            "estimated_effort": "15 min",
            "impact": "Informativo"
        }
    ]

@router.get("/teacher/alerts")
async def get_teacher_dropout_alerts():
    """
    Alertas tempranas de riesgo de abandono para el panel del Docente
    calculadas por la Cabeza C de la red neuronal
    """
    return [
        {
            "id": "alt-01",
            "student_name": "Luis Alberto García",
            "course": "Deep Learning y Redes Convolucionales",
            "risk_score": 0.78,
            "risk_level": "CRITICO",
            "inactive_days": 12,
            "missing_assignments": 2,
            "suggested_action": "Enviar recordatorio y sesión de tutoría 1 a 1"
        },
        {
            "id": "alt-02",
            "student_name": "Mariana Paredes Soto",
            "course": "Machine Learning para Negocios",
            "risk_score": 0.64,
            "risk_level": "MODERADO",
            "inactive_days": 8,
            "missing_assignments": 1,
            "suggested_action": "Revisar dudas en el foro de discusión"
        },
        {
            "id": "alt-03",
            "student_name": "Jorge Huamán Castro",
            "course": "Arquitectura Cloud y MLOps",
            "risk_score": 0.45,
            "risk_level": "BAJO",
            "inactive_days": 5,
            "missing_assignments": 0,
            "suggested_action": "Monitoreo regular"
        }
    ]

@router.get("/activity-feed")
async def get_activity_feed():
    """Feed de actividad reciente mostrado en el dashboard"""
    return [
        {"id": "act-1", "title": "Curso de Python completado", "time": "Hace 2 h", "type": "course"},
        {"id": "act-2", "title": "Certificado emitido correctamente", "time": "Hace 3 h", "type": "certificate"},
        {"id": "act-3", "title": "Nuevo curso iniciado", "time": "Hace 5 h", "type": "course"},
        {"id": "act-4", "title": "Examen de Machine Learning aprobado", "time": "Hace 1 día", "type": "assessment"},
        {"id": "act-5", "title": "Meta de aprendizaje alcanzada (90%)", "time": "Hace 1 día", "type": "goal"}
    ]

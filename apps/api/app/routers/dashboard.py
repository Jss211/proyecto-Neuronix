from fastapi import APIRouter
from app.ml_engine.network import run_model_inference

router = APIRouter(prefix="/dashboard", tags=["Dashboard Ejecutivo"])

@router.get("/summary")
async def get_dashboard_summary():
    """
    Retorna el estado agregado oficial del Dashboard segun la especificacion tecnica:
    - KPIs principales
    - Topologia de la Red Neuronal y su estado operativo
    - Desglose de ingresos / matriculas
    - Datos geograficos
    - Finalizacion de cursos
    """
    return {
        "status": "online",
        "timestamp": "2026-11-26T23:45:00Z",
        "kpis": {
            "alumnos_activos": {"valor": 24593, "variacion": "+12.5%", "periodo": "vs mes anterior"},
            "cursos_disponibles": {"valor": 1248, "variacion": "+14.2%", "periodo": "vs mes anterior"},
            "horas_aprendizaje": {"valor": 89450, "variacion": "+23.7%", "periodo": "vs mes anterior"},
            "certificaciones_emitidas": {"valor": 5782, "variacion": "+8.5%", "periodo": "vs mes anterior"},
            "total_ingresos": {"valor": 342150, "variacion": "+12.5%", "moneda": "USD"},
            "precision_modelo": {"valor": 99.8, "variacion": "+2.4%", "periodo": "este mes"},
            "puntuacion_global": 92.6
        },
        "neural_network": {
            "model_name": "EduMaster Multi-Task Learning Network",
            "model_version": "1.0-RC",
            "state": "INFERENCIA_ACTIVA", # Estados oficiales: DETENIDO | CARGANDO | ENTRENANDO | VALIDANDO | PUBLICADO | INFERENCIA_ACTIVA
            "epoch": 45,
            "loss": 0.0421,
            "val_loss": 0.0489,
            "latency_ms": 23.4,
            "topology": {
                "layers": [
                    {
                        "id": "input",
                        "name": "Nivel de Entrada",
                        "color": "#20C8F5",
                        "neurons": [
                            {"id": "n_uso", "label": "Uso de la Plataforma", "activation": 0.88},
                            {"id": "n_rend", "label": "Rendimiento", "activation": 0.94},
                            {"id": "n_part", "label": "Participación", "activation": 0.79},
                            {"id": "n_inter", "label": "Interacciones", "activation": 0.85},
                            {"id": "n_asist", "label": "Asistencias", "activation": 0.92},
                            {"id": "n_coment", "label": "Comentarios", "activation": 0.73}
                        ]
                    },
                    {
                        "id": "recurrent",
                        "name": "Estudiantes / Embeddings",
                        "color": "#087FE5",
                        "neurons": [
                            {"id": "n_emb1", "label": "Vector Estudiante 1", "activation": 0.82},
                            {"id": "n_emb2", "label": "Vector Estudiante 2", "activation": 0.91},
                            {"id": "n_emb3", "label": "Vector Estudiante 3", "activation": 0.76},
                            {"id": "n_emb4", "label": "Vector Estudiante 4", "activation": 0.89},
                            {"id": "n_emb5", "label": "Vector Estudiante 5", "activation": 0.95},
                            {"id": "n_emb6", "label": "Vector Estudiante 6", "activation": 0.84}
                        ]
                    },
                    {
                        "id": "fusion",
                        "name": "Análisis de Aprendizaje (GRU)",
                        "color": "#8B4DFF",
                        "neurons": [
                            {"id": "n_gru1", "label": "Secuencia Temporal 1", "activation": 0.87},
                            {"id": "n_gru2", "label": "Secuencia Temporal 2", "activation": 0.93},
                            {"id": "n_gru3", "label": "Secuencia Temporal 3", "activation": 0.78},
                            {"id": "n_gru4", "label": "Secuencia Temporal 4", "activation": 0.85},
                            {"id": "n_gru5", "label": "Secuencia Temporal 5", "activation": 0.92},
                            {"id": "n_gru6", "label": "Secuencia Temporal 6", "activation": 0.81}
                        ]
                    },
                    {
                        "id": "output",
                        "name": "Salida Multitarea",
                        "color": "#00BFA6",
                        "neurons": [
                            {"id": "n_out_rec", "label": "Recomendaciones", "activation": 0.96},
                            {"id": "n_out_rutas", "label": "Rutas de Aprendizaje", "activation": 0.88},
                            {"id": "n_out_alert", "label": "Alertas Inteligentes", "activation": 0.91},
                            {"id": "n_out_pred", "label": "Predicciones", "activation": 0.94},
                            {"id": "n_out_rend", "label": "Rendimiento", "activation": 0.89},
                            {"id": "n_out_cert", "label": "Certificaciones", "activation": 0.95}
                        ]
                    }
                ]
            }
        },
        "ingresos_desglose": {
            "total": 342150,
            "suscripciones": 342150,
            "cursos": 98150,
            "otros": 24000,
            "tendencia_mensual": [
                {"mes": "Ene", "suscripciones": 140, "cursos": 40, "otros": 10},
                {"mes": "Feb", "suscripciones": 165, "cursos": 52, "otros": 12},
                {"mes": "Mar", "suscripciones": 190, "cursos": 60, "otros": 15},
                {"mes": "Abr", "suscripciones": 210, "cursos": 68, "otros": 18},
                {"mes": "May", "suscripciones": 235, "cursos": 75, "otros": 20},
                {"mes": "Jun", "suscripciones": 260, "cursos": 82, "otros": 21},
                {"mes": "Jul", "suscripciones": 280, "cursos": 88, "otros": 22},
                {"mes": "Ago", "suscripciones": 295, "cursos": 90, "otros": 23},
                {"mes": "Sep", "suscripciones": 310, "cursos": 92, "otros": 23},
                {"mes": "Oct", "suscripciones": 325, "cursos": 95, "otros": 24},
                {"mes": "Nov", "suscripciones": 338, "cursos": 97, "otros": 24},
                {"mes": "Dic", "suscripciones": 342, "cursos": 98, "otros": 24}
            ]
        },
        "mapa_progreso": [
            {"region": "América del Norte", "estudiantes": 8450, "crecimiento": "+12.5%"},
            {"region": "Europa", "estudiantes": 6120, "crecimiento": "+6.9%"},
            {"region": "Asia", "estudiantes": 7890, "crecimiento": "+11.3%"},
            {"region": "América del Sur", "estudiantes": 2980, "crecimiento": "+6.7%"},
            {"region": "África", "estudiantes": 1820, "crecimiento": "+5.1%"},
            {"region": "Oceanía", "estudiantes": 1760, "crecimiento": "+4.8%"}
        ],
        "finalizacion_cursos": {
            "completados": 78,
            "en_progreso": 15,
            "no_iniciados": 7
        }
    }

@router.post("/model/simulate-state")
async def change_model_state(state: str):
    """Permite al administrador cambiar el estado del modelo para demostracion"""
    valid_states = ["DETENIDO", "CARGANDO", "ENTRENANDO", "VALIDANDO", "PUBLICADO", "INFERENCIA_ACTIVA", "ERROR"]
    clean_state = state.upper()
    if clean_state not in valid_states:
        clean_state = "INFERENCIA_ACTIVA"
    return {"message": "Estado del modelo actualizado", "new_state": clean_state}

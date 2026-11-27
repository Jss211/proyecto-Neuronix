import asyncio
import json
import random
from datetime import datetime
from fastapi import APIRouter
from fastapi.responses import StreamingResponse

router = APIRouter(prefix="/events", tags=["Eventos en Tiempo Real"])

async def event_generator():
    """
    Generador SSE para simular eventos de dominio en tiempo real
    segun el contrato: event_id, event_type, occurred_at, payload
    """
    event_types = [
        ("learning.progress.updated", "Progreso de estudiante actualizado en lección tensorial"),
        ("assessment.submitted", "Nueva entrega de laboratorio evaluativo registrada"),
        ("recommendation.created", "Nueva recomendación calculada por el motor de inferencia"),
        ("model.training.progress", "Época de calibración completada con loss = 0.041")
    ]
    
    while True:
        event_choice = random.choice(event_types)
        data = {
            "event_id": f"evt-{random.randint(100000, 999999)}",
            "event_type": event_choice[0],
            "occurred_at": datetime.utcnow().isoformat() + "Z",
            "message": event_choice[1],
            "active_users": 1248 + random.randint(-5, 12)
        }
        yield f"data: {json.dumps(data)}\n\n"
        await asyncio.sleep(4)

@router.get("/stream")
async def stream_events():
    return StreamingResponse(
        event_generator(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "Access-Control-Allow-Origin": "*"
        }
    )

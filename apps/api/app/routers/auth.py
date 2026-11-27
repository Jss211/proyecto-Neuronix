from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, EmailStr
from app.core.security import create_access_token

router = APIRouter(prefix="/auth", tags=["Autenticacion"])

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class UserProfile(BaseModel):
    id: str
    email: str
    name: str
    role: str
    title: str
    avatar_url: str

class LoginResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserProfile

# Usuarios oficiales preconfigurados para la demostracion
USERS_DB = {
    "admin@edumaster.ai": {
        "id": "usr-admin-001",
        "password": "Admin2026!",
        "name": "Dra. López",
        "role": "ADMIN",
        "title": "Administrador General",
        "avatar_url": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150"
    },
    "docente@edumaster.ai": {
        "id": "usr-docente-002",
        "password": "Docente2026!",
        "name": "Prof. Carlos Mendoza",
        "role": "DOCENTE",
        "title": "Instructor Principal de Inteligencia Artificial",
        "avatar_url": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
    },
    "estudiante@edumaster.ai": {
        "id": "usr-student-003",
        "password": "Estudiante2026!",
        "name": "Jordan Ramos",
        "role": "ESTUDIANTE",
        "title": "Estudiante de Redes Neuronales y Machine Learning",
        "avatar_url": "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150"
    }
}

@router.post("/login", response_model=LoginResponse)
async def login(credentials: LoginRequest):
    email_clean = credentials.email.lower().strip()
    user_record = USERS_DB.get(email_clean)
    
    if not user_record or user_record["password"] != credentials.password:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciales incorrectas. Verifique correo o contrasena."
        )
    
    token = create_access_token(
        subject=user_record["id"],
        role=user_record["role"]
    )
    
    return LoginResponse(
        access_token=token,
        user=UserProfile(
            id=user_record["id"],
            email=email_clean,
            name=user_record["name"],
            role=user_record["role"],
            title=user_record["title"],
            avatar_url=user_record["avatar_url"]
        )
    )

@router.get("/demo-accounts")
async def get_demo_accounts():
    """Retorna las credenciales de prueba para el selector rapido en la UI"""
    return [
        {
            "role": "ADMIN",
            "email": "admin@edumaster.ai",
            "password": "Admin2026!",
            "label": "Administrador (Dra. López)",
            "description": "Acceso total, topologia neuronal y metricas ejecutivas"
        },
        {
            "role": "DOCENTE",
            "email": "docente@edumaster.ai",
            "password": "Docente2026!",
            "label": "Docente (Prof. Carlos Mendoza)",
            "description": "Seguimiento de cohortes y alertas tempranas de abandono"
        },
        {
            "role": "ESTUDIANTE",
            "email": "estudiante@edumaster.ai",
            "password": "Estudiante2026!",
            "label": "Estudiante (Jordan Ramos)",
            "description": "Rutas de aprendizaje personalizadas y certificados QR"
        }
    ]

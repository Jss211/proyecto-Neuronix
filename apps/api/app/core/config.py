from pydantic import BaseModel
from typing import List

class Settings(BaseModel):
    PROJECT_NAME: str = "EduMaster.ai Enterprise API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = "edumaster-enterprise-secure-secret-key-2026-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 12 # 12 hours
    CORS_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "http://40.116.69.29",
        "http://40.116.69.29:80",
        "http://40.116.69.29:3000",
        "*"
    ]

settings = Settings()

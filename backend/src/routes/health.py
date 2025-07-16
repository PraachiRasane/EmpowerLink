from fastapi import APIRouter
from datetime import datetime

router = APIRouter(prefix="/health", tags=["health"])

@router.get("/")
def health_check():
    return {"status": "healthy", "timestamp": datetime.utcnow()} 
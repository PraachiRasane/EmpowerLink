from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from ..database import get_session
from ..models import User
from ..schemas import LoginRequest, LoginResponse, UserResponse
from ..auth import create_access_token

router = APIRouter(prefix="/auth", tags=["authentication"])

@router.post("/login", response_model=LoginResponse)
def login(request: LoginRequest, session: Session = Depends(get_session)):
    # Mock authentication - in real app, verify password
    user = session.exec(select(User).where(User.username == request.username)).first()
    
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    # In real app, verify password here
    if request.password != "password":  # Mock password
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    access_token = create_access_token(data={"sub": user.id})
    return LoginResponse(
        access_token=access_token,
        user=UserResponse(
            id=user.id,
            username=user.username,
            email=user.email,
            full_name=user.full_name,
            role=user.role,
            city=user.city,
            created_at=user.created_at
        )
    ) 
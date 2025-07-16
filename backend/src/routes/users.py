from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from typing import List
from ..database import get_session
from ..models import User, FacultyBeneficiaryAssignment
from ..schemas import UserResponse
from ..auth import get_current_user

router = APIRouter(prefix="/users", tags=["users"])

@router.get("/", response_model=List[UserResponse])
def get_users(
    current_user: User = Depends(get_current_user), 
    session: Session = Depends(get_session)
):
    if current_user.role == "faculty":
        # Faculty can only see their assigned beneficiaries
        assignments = session.exec(
            select(FacultyBeneficiaryAssignment).where(
                FacultyBeneficiaryAssignment.faculty_id == current_user.id
            )
        ).all()
        
        assigned_beneficiary_ids = [assignment.beneficiary_id for assignment in assignments]
        
        # Get assigned beneficiaries and other faculty members
        users = session.exec(
            select(User).where(
                (User.id.in_(assigned_beneficiary_ids)) | 
                (User.role == "faculty")
            )
        ).all()
    else:
        # Beneficiaries can see all users
        users = session.exec(select(User)).all()
    
    return [
        UserResponse(
            id=user.id,
            username=user.username,
            email=user.email,
            full_name=user.full_name,
            role=user.role,
            city=user.city,
            created_at=user.created_at
        ) for user in users
    ]

@router.get("/me", response_model=UserResponse)
def get_current_user_info(current_user: User = Depends(get_current_user)):
    return UserResponse(
        id=current_user.id,
        username=current_user.username,
        email=current_user.email,
        full_name=current_user.full_name,
        role=current_user.role,
        city=current_user.city,
        created_at=current_user.created_at
    ) 
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from typing import List, Optional
from datetime import datetime
from ..database import get_session
from ..models import Beneficiary, FacultyBeneficiaryAssignment, User
from ..schemas import BeneficiaryResponse, BeneficiaryCreate
from ..auth import get_current_user

router = APIRouter(prefix="/beneficiaries", tags=["beneficiaries"])

@router.get("/", response_model=List[BeneficiaryResponse])
def get_beneficiaries(
    city: Optional[str] = None,
    category: Optional[str] = None,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    query = select(Beneficiary)
    if current_user.role == "faculty":
        # Faculty can only see beneficiaries assigned to them
        assignments = session.exec(
            select(FacultyBeneficiaryAssignment).where(
                FacultyBeneficiaryAssignment.faculty_id == current_user.id
            )
        ).all()
        
        assigned_beneficiary_ids = [assignment.beneficiary_id for assignment in assignments]
        
        # Get assigned beneficiaries from User table
        assigned_users = session.exec(
            select(User).where(
                (User.id.in_(assigned_beneficiary_ids)) & 
                (User.role == "beneficiary")
            )
        ).all()
        
        # Filter beneficiaries by assigned user names
        assigned_names = [user.full_name for user in assigned_users]
        query = query.where(Beneficiary.name.in_(assigned_names))
    
    if city and city != "All":
        query = query.where(Beneficiary.city == city)
    
    if category and category != "All":
        query = query.where(Beneficiary.category == category)
    
    beneficiaries = session.exec(query).all()
    
    return [
        BeneficiaryResponse(
            id=b.id,
            name=b.name,
            gender=b.gender,
            category=b.category,
            city=b.city,
            venture_status=b.venture_status,
            training_date=b.training_date,
            last_follow_up=b.last_follow_up
        ) for b in beneficiaries
    ]

@router.post("/", response_model=BeneficiaryResponse)
def create_beneficiary(
    beneficiary_data: BeneficiaryCreate,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    # Only faculty can create beneficiaries
    if current_user.role != "faculty":
        raise HTTPException(status_code=403, detail="Only faculty can create beneficiaries")
    
    # Create the beneficiary
    beneficiary = Beneficiary(
        name=beneficiary_data.name,
        gender=beneficiary_data.gender,
        category=beneficiary_data.category,
        city=beneficiary_data.city,
        venture_status=beneficiary_data.venture_status,
        training_date=beneficiary_data.training_date,  # Already converted to datetime by validator
        last_follow_up=beneficiary_data.last_follow_up  # Already converted to datetime by validator
    )
    
    session.add(beneficiary)
    session.commit()
    session.refresh(beneficiary)
    
    return BeneficiaryResponse(
        id=beneficiary.id,
        name=beneficiary.name,
        gender=beneficiary.gender,
        category=beneficiary.category,
        city=beneficiary.city,
        venture_status=beneficiary.venture_status,
        training_date=beneficiary.training_date,
        last_follow_up=beneficiary.last_follow_up
    ) 
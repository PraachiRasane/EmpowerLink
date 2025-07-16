from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from typing import List, Optional
from ..database import get_session
from ..models import Venture, Beneficiary, FacultyBeneficiaryAssignment, User
from ..schemas import VentureResponse
from ..auth import get_current_user

router = APIRouter(prefix="/ventures", tags=["ventures"])

@router.get("/", response_model=List[VentureResponse])
def get_ventures(
    city: Optional[str] = None,
    status: Optional[str] = None,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    query = select(Venture)
    
    if current_user.role == "faculty":
        # Faculty can only see ventures of their assigned beneficiaries
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
        
        # Filter ventures by assigned user names (matching beneficiary names)
        assigned_names = [user.full_name for user in assigned_users]
        query = query.join(Beneficiary).where(Beneficiary.name.in_(assigned_names))
    
    if city and city != "All":
        query = query.where(Venture.city == city)
    
    if status and status != "All":
        query = query.where(Venture.status == status)
    
    ventures = session.exec(query).all()
    
    result = []
    for venture in ventures:
        beneficiary = session.get(Beneficiary, venture.beneficiary_id)
        result.append(VentureResponse(
            id=venture.id,
            name=venture.name,
            beneficiary_id=venture.beneficiary_id,
            beneficiary_name=beneficiary.name if beneficiary else "Unknown",
            city=venture.city,
            venture_type=venture.venture_type,
            status=venture.status,
            income=venture.income
        ))
    
    return result 
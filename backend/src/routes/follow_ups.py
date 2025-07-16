from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from typing import List, Optional
from ..database import get_session
from ..models import FollowUp, Beneficiary, FacultyBeneficiaryAssignment, User
from ..schemas import FollowUpResponse
from ..auth import get_current_user

router = APIRouter(prefix="/follow-ups", tags=["follow-ups"])

@router.get("/", response_model=List[FollowUpResponse])
def get_follow_ups(
    city: Optional[str] = None,
    status: Optional[str] = None,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    query = select(FollowUp)
    
    if current_user.role == "faculty":
        # Faculty can only see follow-ups of their assigned beneficiaries
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
        
        # Filter follow-ups by assigned user names (matching beneficiary names)
        assigned_names = [user.full_name for user in assigned_users]
        query = query.join(Beneficiary).where(Beneficiary.name.in_(assigned_names))
    
    if city and city != "All":
        query = query.where(FollowUp.city == city)
    
    if status and status != "All":
        query = query.where(FollowUp.status == status)
    
    follow_ups = session.exec(query).all()
    
    result = []
    for follow_up in follow_ups:
        beneficiary = session.get(Beneficiary, follow_up.beneficiary_id)
        result.append(FollowUpResponse(
            id=follow_up.id,
            beneficiary_id=follow_up.beneficiary_id,
            beneficiary_name=beneficiary.name if beneficiary else "Unknown",
            city=follow_up.city,
            venture=follow_up.venture,
            last_follow_up=follow_up.last_follow_up,
            next_follow_up=follow_up.next_follow_up,
            status=follow_up.status,
            remarks=follow_up.remarks
        ))
    
    return result 
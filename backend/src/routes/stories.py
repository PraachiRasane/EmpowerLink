from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from typing import List, Optional
from ..database import get_session
from ..models import Story, Beneficiary, FacultyBeneficiaryAssignment, User
from ..schemas import StoryResponse
from ..auth import get_current_user

router = APIRouter(prefix="/stories", tags=["stories"])

@router.get("/", response_model=List[StoryResponse])
def get_stories(
    city: Optional[str] = None,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    query = select(Story)
    
    if current_user.role == "faculty":
        # Faculty can only see stories of their assigned beneficiaries
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
        
        # Filter stories by assigned user names (matching beneficiary names)
        assigned_names = [user.full_name for user in assigned_users]
        query = query.join(Beneficiary).where(Beneficiary.name.in_(assigned_names))
    
    if city and city != "All":
        query = query.where(Story.city == city)
    
    stories = session.exec(query).all()
    
    result = []
    for story in stories:
        beneficiary = session.get(Beneficiary, story.beneficiary_id)
        result.append(StoryResponse(
            id=story.id,
            title=story.title,
            beneficiary_id=story.beneficiary_id,
            beneficiary_name=beneficiary.name if beneficiary else "Unknown",
            city=story.city,
            summary=story.summary,
            likes=story.likes
        ))
    
    return result

@router.post("/{story_id}/like")
def like_story(
    story_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    story = session.get(Story, story_id)
    if not story:
        raise HTTPException(status_code=404, detail="Story not found")
    
    story.likes += 1
    session.commit()
    return {"message": "Story liked successfully"} 
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from typing import List
import json
from ..database import get_session
from ..models import Community, UserCommunity, User
from ..schemas import CommunityResponse
from ..auth import get_current_user

router = APIRouter(prefix="/communities", tags=["communities"])

@router.get("/", response_model=List[CommunityResponse])
def get_communities(
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    communities = session.exec(select(Community)).all()
    
    # Get user's joined communities
    user_communities = session.exec(
        select(UserCommunity).where(UserCommunity.user_id == current_user.id)
    ).all()
    joined_community_ids = {uc.community_id for uc in user_communities}
    
    return [
        CommunityResponse(
            id=community.id,
            name=community.name,
            description=community.description,
            member_count=community.member_count,
            tags=json.loads(community.tags),
            icon=community.icon,
            created_at=community.created_at,
            is_joined=community.id in joined_community_ids
        ) for community in communities
    ]

@router.post("/{community_id}/join")
def join_community(
    community_id: int,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    # Check if community exists
    community = session.get(Community, community_id)
    if not community:
        raise HTTPException(status_code=404, detail="Community not found")
    
    # Check if already joined
    existing = session.exec(
        select(UserCommunity).where(
            UserCommunity.user_id == current_user.id,
            UserCommunity.community_id == community_id
        )
    ).first()
    
    if existing:
        raise HTTPException(status_code=400, detail="Already joined this community")
    
    # Join community
    user_community = UserCommunity(
        user_id=current_user.id,
        community_id=community_id
    )
    session.add(user_community)
    
    # Update member count
    community.member_count += 1
    
    session.commit()
    return {"message": "Successfully joined community"}

@router.delete("/{community_id}/leave")
def leave_community(
    community_id: int,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    # Find the user-community relationship
    user_community = session.exec(
        select(UserCommunity).where(
            UserCommunity.user_id == current_user.id,
            UserCommunity.community_id == community_id
        )
    ).first()
    
    if not user_community:
        raise HTTPException(status_code=400, detail="Not a member of this community")
    
    # Remove from community
    session.delete(user_community)
    
    # Update member count
    community = session.get(Community, community_id)
    if community:
        community.member_count = max(0, community.member_count - 1)
    
    session.commit()
    return {"message": "Successfully left community"} 
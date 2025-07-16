from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from typing import List, Optional
from ..database import get_session
from ..models import Message, User, UserCommunity
from ..schemas import MessageCreate, MessageResponse
from ..auth import get_current_user

router = APIRouter(prefix="/messages", tags=["messages"])

@router.get("/", response_model=List[MessageResponse])
def get_messages(
    receiver_id: Optional[int] = None,
    community_id: Optional[int] = None,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    if receiver_id:
        # Direct messages
        messages = session.exec(
            select(Message).where(
                ((Message.sender_id == current_user.id) & (Message.receiver_id == receiver_id)) |
                ((Message.sender_id == receiver_id) & (Message.receiver_id == current_user.id))
            ).order_by(Message.created_at)
        ).all()
    elif community_id:
        # Community messages
        messages = session.exec(
            select(Message).where(Message.community_id == community_id)
            .order_by(Message.created_at)
        ).all()
    else:
        raise HTTPException(status_code=400, detail="Must specify receiver_id or community_id")
    
    # Get sender names
    result = []
    for message in messages:
        sender = session.get(User, message.sender_id)
        result.append(MessageResponse(
            id=message.id,
            sender_id=message.sender_id,
            receiver_id=message.receiver_id,
            community_id=message.community_id,
            content=message.content,
            message_type=message.message_type,
            created_at=message.created_at,
            sender_name=sender.full_name if sender else "Unknown"
        ))
    
    return result

@router.post("/", response_model=MessageResponse)
def create_message(
    message_data: MessageCreate,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    # Validate that either receiver_id or community_id is provided
    if not message_data.receiver_id and not message_data.community_id:
        raise HTTPException(status_code=400, detail="Must specify receiver_id or community_id")
    
    # If community message, verify user is member
    if message_data.community_id:
        membership = session.exec(
            select(UserCommunity).where(
                UserCommunity.user_id == current_user.id,
                UserCommunity.community_id == message_data.community_id
            )
        ).first()
        if not membership:
            raise HTTPException(status_code=403, detail="Not a member of this community")
    
    message = Message(
        sender_id=current_user.id,
        receiver_id=message_data.receiver_id,
        community_id=message_data.community_id,
        content=message_data.content,
        message_type=message_data.message_type
    )
    
    session.add(message)
    session.commit()
    session.refresh(message)
    
    return MessageResponse(
        id=message.id,
        sender_id=message.sender_id,
        receiver_id=message.receiver_id,
        community_id=message.community_id,
        content=message.content,
        message_type=message.message_type,
        created_at=message.created_at,
        sender_name=current_user.full_name
    ) 
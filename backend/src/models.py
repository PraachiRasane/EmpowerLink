from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime

class User(SQLModel, table=True):
    id: Optional[int] = None
    username: str = Field(unique=True, index=True)
    email: str = Field(unique=True, index=True)
    full_name: str
    role: str = "faculty"  # faculty, beneficiary, admin
    city: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

class FacultyBeneficiaryAssignment(SQLModel, table=True):
    id: Optional[int] = None
    faculty_id: int = Field(foreign_key="user.id")
    beneficiary_id: int = Field(foreign_key="user.id")
    assigned_at: datetime = Field(default_factory=datetime.utcnow)

class Community(SQLModel, table=True):
    id: Optional[int] = None
    name: str = Field(unique=True, index=True)
    description: str
    member_count: int = 0
    tags: str  # JSON string of tags
    icon: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

class UserCommunity(SQLModel, table=True):
    id: Optional[int] = None
    user_id: int = Field(foreign_key="user.id")
    community_id: int = Field(foreign_key="community.id")
    joined_at: datetime = Field(default_factory=datetime.utcnow)

class Message(SQLModel, table=True):
    id: Optional[int] = None
    sender_id: int = Field(foreign_key="user.id")
    receiver_id: Optional[int] = Field(foreign_key="user.id", default=None)
    community_id: Optional[int] = Field(foreign_key="community.id", default=None)
    content: str
    message_type: str = "text"  # text, image, file
    created_at: datetime = Field(default_factory=datetime.utcnow)

class Beneficiary(SQLModel, table=True):
    id: Optional[int] = None
    name: str
    gender: str
    category: str  # Women, Youth, Tribal, PWD, Rural
    city: str
    venture_status: str  # Active, Paused, Closed
    training_date: datetime
    last_follow_up: datetime
    created_at: datetime = Field(default_factory=datetime.utcnow)

class Venture(SQLModel, table=True):
    id: Optional[int] = None
    name: str
    beneficiary_id: int = Field(foreign_key="beneficiary.id")
    city: str
    venture_type: str
    status: str  # Active, Paused, Closed
    income: float = 0.0
    created_at: datetime = Field(default_factory=datetime.utcnow)

class Story(SQLModel, table=True):
    id: Optional[int] = None
    title: str
    beneficiary_id: int = Field(foreign_key="beneficiary.id")
    city: str
    summary: str
    likes: int = 0
    created_at: datetime = Field(default_factory=datetime.utcnow)

class FollowUp(SQLModel, table=True):
    id: Optional[int] = None
    beneficiary_id: int = Field(foreign_key="beneficiary.id")
    city: str
    venture: str
    last_follow_up: datetime
    next_follow_up: datetime
    status: str  # Completed, Pending, Missed
    remarks: str
    created_at: datetime = Field(default_factory=datetime.utcnow) 
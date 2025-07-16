from pydantic import BaseModel, field_validator
from typing import List, Optional, Dict, Any
from datetime import datetime

class UserCreate(BaseModel):
    username: str
    email: str
    full_name: str
    role: str = "faculty"
    city: str

class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    full_name: str
    role: str
    city: str
    created_at: datetime

class LoginRequest(BaseModel):
    username: str
    password: str

class LoginResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse

class MessageCreate(BaseModel):
    content: str
    receiver_id: Optional[int] = None
    community_id: Optional[int] = None

class MessageResponse(BaseModel):
    id: int
    sender_id: int
    receiver_id: Optional[int]
    community_id: Optional[int]
    content: str
    message_type: str
    created_at: datetime
    sender_name: str

class CommunityResponse(BaseModel):
    id: int
    name: str
    description: str
    member_count: int
    tags: List[str]
    icon: str
    created_at: datetime
    is_joined: bool = False

class BeneficiaryCreate(BaseModel):
    name: str
    gender: str
    category: str
    city: str
    venture_status: str = "Active"
    training_date: str
    last_follow_up: str

    @field_validator('training_date', 'last_follow_up')
    @classmethod
    def validate_dates(cls, v):
        try:
            return datetime.fromisoformat(v.replace('Z', '+00:00'))
        except ValueError:
            raise ValueError('Invalid date format. Use ISO format (YYYY-MM-DDTHH:MM:SS.sssZ)')

class BeneficiaryResponse(BaseModel):
    id: int
    name: str
    gender: str
    category: str
    city: str
    venture_status: str
    training_date: datetime
    last_follow_up: datetime

class VentureResponse(BaseModel):
    id: int
    name: str
    beneficiary_id: int
    beneficiary_name: str
    city: str
    venture_type: str
    status: str
    income: float

class StoryResponse(BaseModel):
    id: int
    title: str
    beneficiary_id: int
    beneficiary_name: str
    city: str
    summary: str
    likes: int

class FollowUpResponse(BaseModel):
    id: int
    beneficiary_id: int
    beneficiary_name: str
    city: str
    venture: str
    last_follow_up: datetime
    next_follow_up: datetime
    status: str
    remarks: str

class DashboardStats(BaseModel):
    total_students: int
    total_active: int
    total_follow_ups: int
    city_data: List[Dict[str, Any]]

class FacultyBeneficiaryAssignmentCreate(BaseModel):
    faculty_id: int
    beneficiary_id: int

class FacultyBeneficiaryAssignmentResponse(BaseModel):
    id: int
    faculty_id: int
    faculty_name: str
    beneficiary_id: int
    beneficiary_name: str
    assigned_at: datetime 
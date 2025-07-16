from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlmodel import SQLModel, Session, select, create_engine, Field
from typing import List, Optional, Dict, Any
from datetime import datetime, timedelta
import jwt
from pydantic import BaseModel
import json

# Database setup
DATABASE_URL = "sqlite:///database.db"
engine = create_engine(DATABASE_URL, echo=True)

# JWT Configuration
SECRET_KEY = "your-secret-key-change-in-production"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Security
security = HTTPBearer()

# FastAPI app
app = FastAPI(title="ICECD Backend API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],  # React dev servers
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============================================================================
# SQLModel Database Models
# ============================================================================

class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    username: str = Field(unique=True, index=True)
    email: str = Field(unique=True, index=True)
    full_name: str
    role: str = "faculty"  # faculty, beneficiary, admin
    city: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

class Community(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(unique=True, index=True)
    description: str
    member_count: int = 0
    tags: str  # JSON string of tags
    icon: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

class UserCommunity(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id")
    community_id: int = Field(foreign_key="community.id")
    joined_at: datetime = Field(default_factory=datetime.utcnow)

class Message(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    sender_id: int = Field(foreign_key="user.id")
    receiver_id: Optional[int] = Field(foreign_key="user.id", default=None)
    community_id: Optional[int] = Field(foreign_key="community.id", default=None)
    content: str
    message_type: str = "text"  # text, image, file
    created_at: datetime = Field(default_factory=datetime.utcnow)

class Beneficiary(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    gender: str
    category: str  # Women, Youth, Tribal, PWD, Rural
    city: str
    venture_status: str  # Active, Paused, Closed
    training_date: datetime
    last_follow_up: datetime
    created_at: datetime = Field(default_factory=datetime.utcnow)

class Venture(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    beneficiary_id: int = Field(foreign_key="beneficiary.id")
    city: str
    venture_type: str
    status: str  # Active, Paused, Closed
    income: float = 0.0
    created_at: datetime = Field(default_factory=datetime.utcnow)

class Story(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    beneficiary_id: int = Field(foreign_key="beneficiary.id")
    city: str
    summary: str
    likes: int = 0
    created_at: datetime = Field(default_factory=datetime.utcnow)

class FollowUp(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    beneficiary_id: int = Field(foreign_key="beneficiary.id")
    city: str
    venture: str
    last_follow_up: datetime
    next_follow_up: datetime
    status: str  # Completed, Pending, Missed
    remarks: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

# ============================================================================
# Pydantic Models for API
# ============================================================================

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

# ============================================================================
# Database Functions
# ============================================================================

def get_session():
    with Session(engine) as session:
        yield session

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: int = payload.get("sub")
        if user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )
        return user_id
    except jwt.PyJWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

def get_current_user(user_id: int = Depends(verify_token), session: Session = Depends(get_session)):
    user = session.get(User, user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user

# ============================================================================
# Database Initialization
# ============================================================================

def init_db():
    SQLModel.metadata.create_all(engine)
    
    # Create session for seeding
    with Session(engine) as session:
        # Check if data already exists
        if session.exec(select(User)).first():
            return
        
        # Seed Users
        users = [
            User(
                username="dr_nisha",
                email="nisha@icecd.edu",
                full_name="Dr. Nisha Sharma",
                role="faculty",
                city="Ahmedabad"
            ),
            User(
                username="dr_priya",
                email="priya@icecd.edu",
                full_name="Dr. Priya Sharma",
                role="faculty",
                city="Surat"
            ),
            User(
                username="amit_patel",
                email="amit@example.com",
                full_name="Amit Patel",
                role="beneficiary",
                city="Ahmedabad"
            ),
            User(
                username="sara_roomie",
                email="sara@example.com",
                full_name="Sara Roomie",
                role="beneficiary",
                city="Jaipur"
            )
        ]
        
        for user in users:
            session.add(user)
        session.commit()
        
        # Seed Communities
        communities = [
            Community(
                name="Startup Founders",
                description="A community for entrepreneurs who are building their first or next startup. Share experiences, get advice, and connect with fellow founders.",
                member_count=1240,
                tags=json.dumps(["Startup", "Entrepreneurship", "Networking"]),
                icon="SF"
            ),
            Community(
                name="Tech Innovators",
                description="For entrepreneurs in the technology space. Discuss latest trends, share technical challenges, and collaborate on innovative solutions.",
                member_count=856,
                tags=json.dumps(["Technology", "Innovation", "AI/ML"]),
                icon="TI"
            ),
            Community(
                name="Women Entrepreneurs",
                description="Empowering women in business. A supportive space for female entrepreneurs to share stories, challenges, and celebrate successes.",
                member_count=642,
                tags=json.dumps(["Women", "Empowerment", "Leadership"]),
                icon="WE"
            ),
            Community(
                name="Social Impact Ventures",
                description="For entrepreneurs focused on creating positive social change. Discuss impact measurement, funding, and sustainable business models.",
                member_count=523,
                tags=json.dumps(["Social Impact", "Sustainability", "NGO"]),
                icon="SI"
            ),
            Community(
                name="FinTech Founders",
                description="Financial technology entrepreneurs discussing regulations, innovations, and market opportunities in the finance sector.",
                member_count=445,
                tags=json.dumps(["FinTech", "Finance", "Banking"]),
                icon="FF"
            ),
            Community(
                name="AgriTech Innovators",
                description="Revolutionizing agriculture through technology. Connect with entrepreneurs working on farming solutions and food security.",
                member_count=378,
                tags=json.dumps(["Agriculture", "Technology", "Sustainability"]),
                icon="AI"
            ),
            Community(
                name="E-Commerce Builders",
                description="For entrepreneurs in the e-commerce space. Share strategies, discuss platforms, and learn about digital marketing.",
                member_count=789,
                tags=json.dumps(["E-Commerce", "Digital Marketing", "Retail"]),
                icon="EB"
            ),
            Community(
                name="HealthTech Innovators",
                description="Healthcare entrepreneurs working on medical devices, health apps, and improving patient outcomes through technology.",
                member_count=567,
                tags=json.dumps(["Healthcare", "MedTech", "Digital Health"]),
                icon="HI"
            )
        ]
        
        for community in communities:
            session.add(community)
        session.commit()
        
        # Seed Beneficiaries
        beneficiaries = [
            Beneficiary(
                name="Sunita Patel",
                gender="Female",
                category="Women",
                city="Ahmedabad",
                venture_status="Active",
                training_date=datetime(2023, 12, 10),
                last_follow_up=datetime(2024, 4, 1)
            ),
            Beneficiary(
                name="Ravi Mehta",
                gender="Male",
                category="Youth",
                city="Surat",
                venture_status="Paused",
                training_date=datetime(2024, 1, 20),
                last_follow_up=datetime(2024, 5, 10)
            ),
            Beneficiary(
                name="Maya Sharma",
                gender="Female",
                category="Tribal",
                city="Jaipur",
                venture_status="Closed",
                training_date=datetime(2023, 11, 5),
                last_follow_up=datetime(2024, 2, 15)
            ),
            Beneficiary(
                name="Nilesh Das",
                gender="Male",
                category="PWD",
                city="Guwahati",
                venture_status="Active",
                training_date=datetime(2024, 3, 1),
                last_follow_up=datetime(2024, 6, 10)
            ),
            Beneficiary(
                name="Asha Bai",
                gender="Female",
                category="Rural",
                city="Bhopal",
                venture_status="Active",
                training_date=datetime(2024, 2, 15),
                last_follow_up=datetime(2024, 6, 20)
            )
        ]
        
        for beneficiary in beneficiaries:
            session.add(beneficiary)
        session.commit()
        
        # Seed Ventures
        ventures = [
            Venture(
                name="Sunita Tailoring",
                beneficiary_id=1,
                city="Ahmedabad",
                venture_type="Tailoring",
                status="Active",
                income=4500.0
            ),
            Venture(
                name="Ravi Kirana Store",
                beneficiary_id=2,
                city="Surat",
                venture_type="Retail",
                status="Paused",
                income=2000.0
            ),
            Venture(
                name="Maya Snacks Corner",
                beneficiary_id=3,
                city="Jaipur",
                venture_type="Food Processing",
                status="Closed",
                income=0.0
            )
        ]
        
        for venture in ventures:
            session.add(venture)
        session.commit()
        
        # Seed Stories
        stories = [
            Story(
                title="Sunita's Tailoring Journey",
                beneficiary_id=1,
                city="Ahmedabad",
                summary="After training with ICECD, Sunita started her own tailoring unit from home. In 6 months, she began earning ₹5000 per month and hired one assistant.",
                likes=2
            ),
            Story(
                title="Ravi's Kirana Store Revival",
                beneficiary_id=2,
                city="Surat",
                summary="With ICECD's mentorship, Ravi turned his struggling shop into a profitable venture. He now serves 3 nearby slum areas.",
                likes=5
            ),
            Story(
                title="Maya's Snack Stall",
                beneficiary_id=3,
                city="Jaipur",
                summary="Maya used her cooking skills to start a roadside snack stall. Her venture inspired 2 other women in her colony.",
                likes=3
            )
        ]
        
        for story in stories:
            session.add(story)
        session.commit()
        
        # Seed Follow-ups
        follow_ups = [
            FollowUp(
                beneficiary_id=1,
                city="Ahmedabad",
                venture="Tailoring",
                last_follow_up=datetime(2024, 6, 1),
                next_follow_up=datetime(2024, 8, 1),
                status="Completed",
                remarks="Doing well. Increased monthly income."
            ),
            FollowUp(
                beneficiary_id=2,
                city="Surat",
                venture="Retail Shop",
                last_follow_up=datetime(2024, 5, 15),
                next_follow_up=datetime(2024, 7, 15),
                status="Pending",
                remarks="Needs help with inventory planning."
            ),
            FollowUp(
                beneficiary_id=3,
                city="Jaipur",
                venture="Snack Corner",
                last_follow_up=datetime(2024, 4, 10),
                next_follow_up=datetime(2024, 7, 10),
                status="Missed",
                remarks="Couldn't be reached last time."
            )
        ]
        
        for follow_up in follow_ups:
            session.add(follow_up)
        session.commit()
        
        # Seed some initial messages
        messages = [
            Message(
                sender_id=1,
                receiver_id=3,
                content="Hi Dr. Priya, could you help me with the funding process?",
                message_type="text"
            ),
            Message(
                sender_id=2,
                receiver_id=3,
                content="Of course! Let's schedule a call.",
                message_type="text"
            ),
            Message(
                sender_id=4,
                receiver_id=1,
                content="Hey, want to join my AgriTech project group?",
                message_type="text"
            ),
            Message(
                sender_id=4,
                community_id=1,
                content="Welcome to all new women founders!",
                message_type="text"
            ),
            Message(
                sender_id=4,
                community_id=6,
                content="Let's share AgriTech resources here.",
                message_type="text"
            )
        ]
        
        for message in messages:
            session.add(message)
        session.commit()

# ============================================================================
# API Routes
# ============================================================================

@app.on_event("startup")
async def startup_event():
    init_db()

# Authentication
@app.post("/login", response_model=LoginResponse)
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

# Users
@app.get("/users", response_model=List[UserResponse])
def get_users(current_user: User = Depends(get_current_user), session: Session = Depends(get_session)):
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

@app.get("/users/me", response_model=UserResponse)
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

# Communities
@app.get("/communities", response_model=List[CommunityResponse])
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

@app.post("/communities/{community_id}/join")
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

@app.delete("/communities/{community_id}/leave")
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

# Messages
@app.get("/messages", response_model=List[MessageResponse])
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

@app.post("/messages", response_model=MessageResponse)
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

# Beneficiaries
@app.get("/beneficiaries", response_model=List[BeneficiaryResponse])
def get_beneficiaries(
    city: Optional[str] = None,
    category: Optional[str] = None,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    query = select(Beneficiary)
    
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

# Ventures
@app.get("/ventures", response_model=List[VentureResponse])
def get_ventures(
    city: Optional[str] = None,
    status: Optional[str] = None,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    query = select(Venture)
    
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

# Stories
@app.get("/stories", response_model=List[StoryResponse])
def get_stories(
    city: Optional[str] = None,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    query = select(Story)
    
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

@app.post("/stories/{story_id}/like")
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

# Follow-ups
@app.get("/follow-ups", response_model=List[FollowUpResponse])
def get_follow_ups(
    city: Optional[str] = None,
    status: Optional[str] = None,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    query = select(FollowUp)
    
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

# Dashboard
@app.get("/dashboard", response_model=DashboardStats)
def get_dashboard_stats(
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    # Get all beneficiaries
    beneficiaries = session.exec(select(Beneficiary)).all()
    
    # Get all ventures
    ventures = session.exec(select(Venture)).all()
    
    # Get all follow-ups
    follow_ups = session.exec(select(FollowUp)).all()
    
    # Calculate totals
    total_students = len(beneficiaries)
    total_active = len([v for v in ventures if v.status == "Active"])
    total_follow_ups = len([f for f in follow_ups if f.status == "Pending"])
    
    # Group by city
    city_data = {}
    for beneficiary in beneficiaries:
        city = beneficiary.city
        if city not in city_data:
            city_data[city] = {"students": 0, "active": 0, "followUps": 0}
        city_data[city]["students"] += 1
    
    for venture in ventures:
        if venture.status == "Active":
            city = venture.city
            if city in city_data:
                city_data[city]["active"] += 1
    
    for follow_up in follow_ups:
        if follow_up.status == "Pending":
            city = follow_up.city
            if city in city_data:
                city_data[city]["followUps"] += 1
    
    # Convert to list format
    city_list = [
        {
            "name": city,
            "students": data["students"],
            "active": data["active"],
            "followUps": data["followUps"]
        }
        for city, data in city_data.items()
    ]
    
    return DashboardStats(
        total_students=total_students,
        total_active=total_active,
        total_follow_ups=total_follow_ups,
        city_data=city_list
    )

# Health check
@app.get("/health")
def health_check():
    return {"status": "healthy", "timestamp": datetime.utcnow()}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001) 
from sqlmodel import Session, select
from datetime import datetime
import json
from .models import *
from .database import engine

def seed_database():
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
            ),
            User(
                username="rajesh_kumar",
                email="rajesh@example.com",
                full_name="Rajesh Kumar",
                role="beneficiary",
                city="Ahmedabad"
            ),
            User(
                username="priya_verma",
                email="priya.v@example.com",
                full_name="Priya Verma",
                role="beneficiary",
                city="Surat"
            )
        ]
        
        for user in users:
            session.add(user)
        session.commit()
        
        # Seed Faculty-Beneficiary Assignments
        assignments = [
            FacultyBeneficiaryAssignment(
                faculty_id=1,  # Dr. Nisha Sharma
                beneficiary_id=3  # Amit Patel
            ),
            FacultyBeneficiaryAssignment(
                faculty_id=1,  # Dr. Nisha Sharma
                beneficiary_id=5  # Rajesh Kumar
            ),
            FacultyBeneficiaryAssignment(
                faculty_id=2,  # Dr. Priya Sharma
                beneficiary_id=4  # Sara Roomie
            ),
            FacultyBeneficiaryAssignment(
                faculty_id=2,  # Dr. Priya Sharma
                beneficiary_id=6  # Priya Verma
            )
        ]
        
        for assignment in assignments:
            session.add(assignment)
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
        
        # Seed Beneficiaries (separate from Users)
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
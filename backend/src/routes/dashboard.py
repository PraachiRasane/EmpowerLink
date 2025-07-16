from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from typing import List, Dict, Any
from ..database import get_session
from ..models import Beneficiary, Venture, FollowUp, FacultyBeneficiaryAssignment, User
from ..schemas import DashboardStats
from ..auth import get_current_user

router = APIRouter(prefix="/dashboard", tags=["dashboard"])

@router.get("/", response_model=DashboardStats)
def get_dashboard_stats(
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    if current_user.role == "faculty":
        # Faculty can only see stats for their assigned beneficiaries
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
        
        # Filter by assigned user names (matching beneficiary names)
        assigned_names = [user.full_name for user in assigned_users]
        
        beneficiaries = session.exec(
            select(Beneficiary).where(Beneficiary.name.in_(assigned_names))
        ).all()
        
        ventures = session.exec(
            select(Venture).join(Beneficiary).where(Beneficiary.name.in_(assigned_names))
        ).all()
        
        follow_ups = session.exec(
            select(FollowUp).join(Beneficiary).where(Beneficiary.name.in_(assigned_names))
        ).all()
    else:
        # Beneficiaries can see all stats
        beneficiaries = session.exec(select(Beneficiary)).all()
        ventures = session.exec(select(Venture)).all()
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
#!/usr/bin/env python3

try:
    from src.models import *
    from src.schemas import *
    from src.database import *
    from src.auth import *
    from src.seed_data import *
    print("✅ All imports successful!")
    
    # Test database initialization
    init_db()
    print("✅ Database initialization successful!")
    
    # Test seeding
    seed_database()
    print("✅ Database seeding successful!")
    
    print("\n🎉 Backend structure is working correctly!")
    
except Exception as e:
    print(f"❌ Error: {e}")
    import traceback
    traceback.print_exc() 
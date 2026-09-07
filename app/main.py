from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Import Routers
from app.api.domain import router as domain_router
from app.api.company import router as company_router
from app.api.user import router as user_router
from app.api import role_skill
from app.api import technology_path
from app.models.technology_path_model import TechnologyPath
from app.models.path_skill_model import PathSkill
from app.api import skill
from app.api import search
from app.models.progress_model import SkillProgress
from app.api.skill import router as skill_router
from app.api.role import router as role_router
from app.models.course_model import Course
from app.api.course import router as course_router
from app.models.saved_role_model import SavedRole
from app.api.roadmap import router as roadmap_router
from app.api.dashboard import router as dashboard_router
from app.api.saved_role import router as saved_role_router
from app.api.progress import router as progress_router
from app.api.gemini import router as gemini_router
from app.api.skill_gap import router as skill_gap_router

# Database
from app.database.db import engine, Base

from app.models.roadmap_model import Roadmap
from app.api.recommendation import router as recommendation_router

# Models
from app.models.company_model import Company
from app.models.user_model import User
from app.models.domain_model import Domain
from app.models.roles_model import Role
from app.models.skill_model import Skill
from app.models.role_skill_model import RoleSkill


# Create all tables
Base.metadata.create_all(bind=engine)


# Create FastAPI App
app = FastAPI(
    title="Career Navigator AI",
    description="Google Maps for Tech Careers",
    version="1.0.0",
    debug=True
)


# CORS
app.add_middleware(
    CORSMiddleware,

    allow_origins=[
        # Local development
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",

        # Production frontend
        "https://career-navigator-ai-nine.vercel.app",
    ],

    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Register Routers
app.include_router(domain_router)

app.include_router(company_router)

app.include_router(user_router)

app.include_router(skill_router)

app.include_router(role_skill.router)

app.include_router(role_router)

app.include_router(course_router)

app.include_router(roadmap_router)

app.include_router(dashboard_router)

app.include_router(saved_role_router)

app.include_router(recommendation_router)

app.include_router(search.router)

app.include_router(progress_router)

app.include_router(gemini_router)

app.include_router(skill_gap_router)

app.include_router(technology_path.router)


# Home API
@app.get("/")
def home():
    return {
        "message": "Welcome to Career Navigator AI 🚀",
        "status": "Running Successfully"
    }
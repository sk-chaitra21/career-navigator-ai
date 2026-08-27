from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.services.dashboard_service import get_dashboard_data

router = APIRouter(
    tags=["Dashboard"]
)


@router.get(
    "/dashboard",
    summary="Get dashboard statistics"
)
def read_dashboard(
    db: Session = Depends(get_db)
):
    return get_dashboard_data(db)
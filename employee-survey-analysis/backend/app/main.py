from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import inspect, select, text
from sqlalchemy.orm import Session

from app.config import get_settings
from app.database import Base, SessionLocal, engine
from app.models import (
    DashboardMetric,
    DashboardSnapshot,
    FeedbackTheme,
    FocusArea,
    SentimentSegment,
    TrendPoint,
    VolumePoint,
)
from app.routers.auth import router as auth_router
from app.routers.dashboard import router as dashboard_router


settings = get_settings()


def seed_dashboard_data(db: Session):
    existing_snapshot = db.scalar(select(DashboardSnapshot).limit(1))
    if existing_snapshot:
        return

    snapshot = DashboardSnapshot(
        title="Employee Engagement Dashboard",
        subtitle="Q4 2026 survey analysis with 2,847 responses collected across teams.",
        alert_title="Attention Required",
        alert_text=(
            "Support satisfaction is down 12% in the last 30 days and Sales negative "
            "sentiment has risen by 18% this quarter."
        ),
    )
    db.add(snapshot)
    db.flush()

    db.add_all(
        [
            DashboardMetric(
                snapshot_id=snapshot.id,
                title="Overall Satisfaction",
                value="6.8/10",
                detail="vs 7.1 last quarter",
                trend="-4.2%",
                tone="down",
                icon="chart",
                sort_order=1,
            ),
            DashboardMetric(
                snapshot_id=snapshot.id,
                title="Negative Sentiment",
                value="28.4%",
                detail="vs 24.1% last quarter",
                trend="17.8%",
                tone="alert",
                icon="chart",
                sort_order=2,
            ),
            DashboardMetric(
                snapshot_id=snapshot.id,
                title="Total Responses",
                value="2,847",
                detail="82% response rate",
                trend="+12%",
                tone="up",
                icon="users",
                sort_order=3,
            ),
            DashboardMetric(
                snapshot_id=snapshot.id,
                title="Topics Detected",
                value="8",
                detail="3 worsening trends",
                trend="+2 new",
                tone="up",
                icon="trend",
                sort_order=4,
            ),
        ]
    )

    db.add_all(
        [
            SentimentSegment(snapshot_id=snapshot.id, label="Positive", value=42, color="#2da56a", sort_order=1),
            SentimentSegment(snapshot_id=snapshot.id, label="Neutral", value=30, color="#8a9ab2", sort_order=2),
            SentimentSegment(snapshot_id=snapshot.id, label="Negative", value=28, color="#e04f44", sort_order=3),
        ]
    )

    db.add_all(
        [
            TrendPoint(snapshot_id=snapshot.id, label="Jan", value=7.4, sort_order=1),
            TrendPoint(snapshot_id=snapshot.id, label="Feb", value=7.2, sort_order=2),
            TrendPoint(snapshot_id=snapshot.id, label="Mar", value=7.0, sort_order=3),
            TrendPoint(snapshot_id=snapshot.id, label="Apr", value=6.5, sort_order=4),
            TrendPoint(snapshot_id=snapshot.id, label="May", value=6.3, sort_order=5),
            TrendPoint(snapshot_id=snapshot.id, label="Jun", value=6.7, sort_order=6),
            TrendPoint(snapshot_id=snapshot.id, label="Jul", value=7.0, sort_order=7),
            TrendPoint(snapshot_id=snapshot.id, label="Aug", value=7.2, sort_order=8),
            TrendPoint(snapshot_id=snapshot.id, label="Sep", value=7.1, sort_order=9),
            TrendPoint(snapshot_id=snapshot.id, label="Oct", value=6.8, sort_order=10),
            TrendPoint(snapshot_id=snapshot.id, label="Nov", value=6.5, sort_order=11),
            TrendPoint(snapshot_id=snapshot.id, label="Dec", value=7.0, sort_order=12),
        ]
    )

    db.add_all(
        [
            FocusArea(
                snapshot_id=snapshot.id,
                team="Support",
                note="Satisfaction score down 12% in the last 30 days.",
                tone="alert",
                sort_order=1,
            ),
            FocusArea(
                snapshot_id=snapshot.id,
                team="Sales",
                note="Negative sentiment is up 18% this quarter.",
                tone="danger",
                sort_order=2,
            ),
            FocusArea(
                snapshot_id=snapshot.id,
                team="Engineering",
                note="Manager trust improved after the latest policy update.",
                tone="positive",
                sort_order=3,
            ),
        ]
    )

    db.add_all(
        [
            FeedbackTheme(
                snapshot_id=snapshot.id,
                title="Workload spikes",
                description="Employees are linking burnout risk to end-of-quarter delivery pressure.",
                trend="Worsening",
                sort_order=1,
            ),
            FeedbackTheme(
                snapshot_id=snapshot.id,
                title="Manager communication",
                description="Clearer weekly updates are improving trust in leadership decisions.",
                trend="Improving",
                sort_order=2,
            ),
            FeedbackTheme(
                snapshot_id=snapshot.id,
                title="Career growth",
                description="Internal mobility and mentorship remain the most requested HR action items.",
                trend="Stable",
                sort_order=3,
            ),
        ]
    )

    db.add_all(
        [
            VolumePoint(snapshot_id=snapshot.id, label="W1", value=72, sort_order=1),
            VolumePoint(snapshot_id=snapshot.id, label="W2", value=54, sort_order=2),
            VolumePoint(snapshot_id=snapshot.id, label="W3", value=68, sort_order=3),
            VolumePoint(snapshot_id=snapshot.id, label="W4", value=41, sort_order=4),
            VolumePoint(snapshot_id=snapshot.id, label="W5", value=83, sort_order=5),
            VolumePoint(snapshot_id=snapshot.id, label="W6", value=63, sort_order=6),
        ]
    )

    db.commit()


def run_startup_migrations():
    Base.metadata.create_all(bind=engine)


    # Remove Google auth migration logic (google_sub column/index)

    with SessionLocal() as db:
        seed_dashboard_data(db)


@asynccontextmanager
async def lifespan(_: FastAPI):
    run_startup_migrations()
    yield


app = FastAPI(title=settings.project_name, lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_origin],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix=settings.api_v1_prefix)
app.include_router(dashboard_router, prefix=settings.api_v1_prefix)


@app.get("/")
def read_root():
    return {"message": "PulsePoint API is running."}


@app.get("/health")
def read_health():
    return {"status": "ok"}

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import (
    DashboardMetric,
    DashboardSnapshot,
    FeedbackTheme,
    FocusArea,
    SentimentSegment,
    TrendPoint,
    User,
    VolumePoint,
)
from app.schemas import (
    DashboardMetricResponse,
    DashboardOverviewResponse,
    FeedbackThemeResponse,
    FocusAreaResponse,
    SentimentSegmentResponse,
    TrendPointResponse,
    VolumePointResponse,
)
from app.security import get_current_user


router = APIRouter(prefix="/dashboard", tags=["dashboard"])


@router.get("/overview", response_model=DashboardOverviewResponse)
def get_dashboard_overview(
    _: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    snapshot = db.scalar(
        select(DashboardSnapshot).order_by(DashboardSnapshot.created_at.desc())
    )
    if not snapshot:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Dashboard data has not been configured yet.",
        )

    metrics = db.scalars(
        select(DashboardMetric)
        .where(DashboardMetric.snapshot_id == snapshot.id)
        .order_by(DashboardMetric.sort_order)
    ).all()
    sentiment_segments = db.scalars(
        select(SentimentSegment)
        .where(SentimentSegment.snapshot_id == snapshot.id)
        .order_by(SentimentSegment.sort_order)
    ).all()
    trend_points = db.scalars(
        select(TrendPoint)
        .where(TrendPoint.snapshot_id == snapshot.id)
        .order_by(TrendPoint.sort_order)
    ).all()
    focus_areas = db.scalars(
        select(FocusArea)
        .where(FocusArea.snapshot_id == snapshot.id)
        .order_by(FocusArea.sort_order)
    ).all()
    feedback_themes = db.scalars(
        select(FeedbackTheme)
        .where(FeedbackTheme.snapshot_id == snapshot.id)
        .order_by(FeedbackTheme.sort_order)
    ).all()
    volume_points = db.scalars(
        select(VolumePoint)
        .where(VolumePoint.snapshot_id == snapshot.id)
        .order_by(VolumePoint.sort_order)
    ).all()

    return DashboardOverviewResponse(
        title=snapshot.title,
        subtitle=snapshot.subtitle,
        alert_title=snapshot.alert_title,
        alert_text=snapshot.alert_text,
        metrics=[
            DashboardMetricResponse(
                title=item.title,
                value=item.value,
                detail=item.detail,
                trend=item.trend,
                tone=item.tone,
                icon=item.icon,
            )
            for item in metrics
        ],
        sentiment_segments=[
            SentimentSegmentResponse(label=item.label, value=item.value, color=item.color)
            for item in sentiment_segments
        ],
        trend_points=[
            TrendPointResponse(label=item.label, value=item.value) for item in trend_points
        ],
        focus_areas=[
            FocusAreaResponse(team=item.team, note=item.note, tone=item.tone)
            for item in focus_areas
        ],
        feedback_themes=[
            FeedbackThemeResponse(
                title=item.title,
                description=item.description,
                trend=item.trend,
            )
            for item in feedback_themes
        ],
        volume_points=[
            VolumePointResponse(label=item.label, value=item.value) for item in volume_points
        ],
    )

from datetime import datetime

from sqlalchemy import DateTime, Float, ForeignKey, Integer, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    full_name: Mapped[str] = mapped_column(String(120), nullable=False)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    google_sub: Mapped[str | None] = mapped_column(String(255), unique=True, index=True, nullable=True)
    hashed_password: Mapped[str] = mapped_column(String(255), nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )


class DashboardSnapshot(Base):
    __tablename__ = "dashboard_snapshots"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(160), nullable=False)
    subtitle: Mapped[str] = mapped_column(String(255), nullable=False)
    alert_title: Mapped[str] = mapped_column(String(120), nullable=False)
    alert_text: Mapped[str] = mapped_column(Text, nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

    metrics: Mapped[list["DashboardMetric"]] = relationship(
        back_populates="snapshot", cascade="all, delete-orphan"
    )
    sentiment_segments: Mapped[list["SentimentSegment"]] = relationship(
        back_populates="snapshot", cascade="all, delete-orphan"
    )
    trend_points: Mapped[list["TrendPoint"]] = relationship(
        back_populates="snapshot", cascade="all, delete-orphan"
    )
    focus_areas: Mapped[list["FocusArea"]] = relationship(
        back_populates="snapshot", cascade="all, delete-orphan"
    )
    feedback_themes: Mapped[list["FeedbackTheme"]] = relationship(
        back_populates="snapshot", cascade="all, delete-orphan"
    )
    volume_points: Mapped[list["VolumePoint"]] = relationship(
        back_populates="snapshot", cascade="all, delete-orphan"
    )


class DashboardMetric(Base):
    __tablename__ = "dashboard_metrics"

    id: Mapped[int] = mapped_column(primary_key=True)
    snapshot_id: Mapped[int] = mapped_column(ForeignKey("dashboard_snapshots.id"), nullable=False)
    title: Mapped[str] = mapped_column(String(120), nullable=False)
    value: Mapped[str] = mapped_column(String(80), nullable=False)
    detail: Mapped[str] = mapped_column(String(160), nullable=False)
    trend: Mapped[str] = mapped_column(String(40), nullable=False)
    tone: Mapped[str] = mapped_column(String(20), nullable=False)
    icon: Mapped[str] = mapped_column(String(30), nullable=False)
    sort_order: Mapped[int] = mapped_column(Integer, nullable=False)

    snapshot: Mapped["DashboardSnapshot"] = relationship(back_populates="metrics")


class SentimentSegment(Base):
    __tablename__ = "sentiment_segments"

    id: Mapped[int] = mapped_column(primary_key=True)
    snapshot_id: Mapped[int] = mapped_column(ForeignKey("dashboard_snapshots.id"), nullable=False)
    label: Mapped[str] = mapped_column(String(40), nullable=False)
    value: Mapped[int] = mapped_column(Integer, nullable=False)
    color: Mapped[str] = mapped_column(String(20), nullable=False)
    sort_order: Mapped[int] = mapped_column(Integer, nullable=False)

    snapshot: Mapped["DashboardSnapshot"] = relationship(back_populates="sentiment_segments")


class TrendPoint(Base):
    __tablename__ = "trend_points"

    id: Mapped[int] = mapped_column(primary_key=True)
    snapshot_id: Mapped[int] = mapped_column(ForeignKey("dashboard_snapshots.id"), nullable=False)
    label: Mapped[str] = mapped_column(String(20), nullable=False)
    value: Mapped[float] = mapped_column(Float, nullable=False)
    sort_order: Mapped[int] = mapped_column(Integer, nullable=False)

    snapshot: Mapped["DashboardSnapshot"] = relationship(back_populates="trend_points")


class FocusArea(Base):
    __tablename__ = "focus_areas"

    id: Mapped[int] = mapped_column(primary_key=True)
    snapshot_id: Mapped[int] = mapped_column(ForeignKey("dashboard_snapshots.id"), nullable=False)
    team: Mapped[str] = mapped_column(String(80), nullable=False)
    note: Mapped[str] = mapped_column(Text, nullable=False)
    tone: Mapped[str] = mapped_column(String(20), nullable=False)
    sort_order: Mapped[int] = mapped_column(Integer, nullable=False)

    snapshot: Mapped["DashboardSnapshot"] = relationship(back_populates="focus_areas")


class FeedbackTheme(Base):
    __tablename__ = "feedback_themes"

    id: Mapped[int] = mapped_column(primary_key=True)
    snapshot_id: Mapped[int] = mapped_column(ForeignKey("dashboard_snapshots.id"), nullable=False)
    title: Mapped[str] = mapped_column(String(120), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    trend: Mapped[str] = mapped_column(String(30), nullable=False)
    sort_order: Mapped[int] = mapped_column(Integer, nullable=False)

    snapshot: Mapped["DashboardSnapshot"] = relationship(back_populates="feedback_themes")


class VolumePoint(Base):
    __tablename__ = "volume_points"

    id: Mapped[int] = mapped_column(primary_key=True)
    snapshot_id: Mapped[int] = mapped_column(ForeignKey("dashboard_snapshots.id"), nullable=False)
    label: Mapped[str] = mapped_column(String(20), nullable=False)
    value: Mapped[int] = mapped_column(Integer, nullable=False)
    sort_order: Mapped[int] = mapped_column(Integer, nullable=False)

    snapshot: Mapped["DashboardSnapshot"] = relationship(back_populates="volume_points")

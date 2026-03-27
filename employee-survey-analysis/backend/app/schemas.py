from datetime import datetime

from pydantic import BaseModel, EmailStr, Field


class SignupRequest(BaseModel):
    full_name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)


class LoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)


class GoogleAuthRequest(BaseModel):
    credential: str = Field(min_length=20)


class UserResponse(BaseModel):
    id: int
    full_name: str
    email: EmailStr
    created_at: datetime

    model_config = {"from_attributes": True}


class AuthResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    message: str
    user: UserResponse


class DashboardMetricResponse(BaseModel):
    title: str
    value: str
    detail: str
    trend: str
    tone: str
    icon: str


class SentimentSegmentResponse(BaseModel):
    label: str
    value: int
    color: str


class TrendPointResponse(BaseModel):
    label: str
    value: float


class FocusAreaResponse(BaseModel):
    team: str
    note: str
    tone: str


class FeedbackThemeResponse(BaseModel):
    title: str
    description: str
    trend: str


class VolumePointResponse(BaseModel):
    label: str
    value: int


class DashboardOverviewResponse(BaseModel):
    title: str
    subtitle: str
    alert_title: str
    alert_text: str
    metrics: list[DashboardMetricResponse]
    sentiment_segments: list[SentimentSegmentResponse]
    trend_points: list[TrendPointResponse]
    focus_areas: list[FocusAreaResponse]
    feedback_themes: list[FeedbackThemeResponse]
    volume_points: list[VolumePointResponse]

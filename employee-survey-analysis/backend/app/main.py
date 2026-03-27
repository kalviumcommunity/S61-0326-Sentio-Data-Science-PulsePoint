from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import inspect, text

from app.config import get_settings
from app.database import Base, engine
from app.routers.auth import router as auth_router


settings = get_settings()


def run_startup_migrations():
    Base.metadata.create_all(bind=engine)

    with engine.begin() as connection:
        inspector = inspect(connection)
        if not inspector.has_table("users"):
            return

        column_names = {column["name"] for column in inspector.get_columns("users")}
        if "google_sub" not in column_names:
            connection.execute(text("ALTER TABLE users ADD COLUMN google_sub VARCHAR(255)"))

        connection.execute(
            text("CREATE UNIQUE INDEX IF NOT EXISTS ix_users_google_sub ON users (google_sub)")
        )


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


@app.get("/")
def read_root():
    return {"message": "PulsePoint API is running."}


@app.get("/health")
def read_health():
    return {"status": "ok"}

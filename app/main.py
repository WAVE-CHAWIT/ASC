from fastapi import FastAPI

from app.api.health import router as health_router

app = FastAPI(
    title="E-budget project API",
    description="FastAPI backend for the E-budget project.",
    version="0.1.0",
)

app.include_router(health_router)

from dataclasses import dataclass
import os


@dataclass(frozen=True)
class Settings:
    """Application settings loaded from environment variables."""

    database_url: str = ""
    openai_api_key: str = ""


def get_settings() -> Settings:
    """Read settings from the process environment without hard-coded secrets."""
    return Settings(
        database_url=os.getenv("DATABASE_URL", ""),
        openai_api_key=os.getenv("OPENAI_API_KEY", ""),
    )

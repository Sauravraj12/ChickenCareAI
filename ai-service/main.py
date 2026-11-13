"""FastAPI integration boundary for future ChickenCare AI models.

The endpoints intentionally return only demo/placeholder content. No model is
loaded and image bytes are never interpreted as veterinary findings.
"""

from typing import Literal
from fastapi import FastAPI
from pydantic import BaseModel, Field

app = FastAPI(
    title="ChickenCare AI Integration API",
    version="0.1.0",
    description="Future model adapter boundary; demo responses are explicitly simulated.",
)


class ObservationRequest(BaseModel):
    posture: str = Field(max_length=120)
    movement: str = Field(max_length=120)
    notes: str = Field(default="", max_length=500)


class WellnessRequest(BaseModel):
    mood: Literal["Happy", "Calm", "Okay", "Anxious", "Low"]
    sleep: float = Field(ge=0, le=24)
    activity: int = Field(ge=0, le=1440)
    stress: int = Field(ge=1, le=5)
    social: int = Field(ge=1, le=5)


@app.get("/health")
def health():
    return {"status": "ok", "mode": "demo", "model_connected": False}


@app.post("/v1/vision/observations")
def vision_observations(request: ObservationRequest):
    return {
        "mode": "simulated",
        "image_analyzed": False,
        "report": (
            "No image model is connected. These are user-entered observations only: "
            f"posture={request.posture!r}, movement={request.movement!r}. "
            "This is not a veterinary finding. Contact a qualified veterinarian "
            "about persistent or urgent concerns."
        ),
    }


@app.post("/v1/wellness/recommendations")
def wellness_recommendations(request: WellnessRequest):
    ideas = []
    if request.sleep < 7:
        ideas.append("Consider a calm wind-down routine and a consistent bedtime.")
    if request.activity < 30:
        ideas.append("A short, comfortable stretch or walk may be a manageable step.")
    if request.stress >= 4:
        ideas.append("Consider a brief pause or sharing how you feel with someone you trust.")
    if request.social <= 2:
        ideas.append("A low-pressure message to someone you trust may feel supportive.")
    if request.mood in ("Low", "Anxious"):
        ideas.append("If difficult feelings continue, consider speaking with a qualified health professional.")
    if not ideas:
        ideas.append("Notice how you feel and choose one gentle activity that you enjoy.")
    return {"mode": "rule-based demo", "clinical_score": None, "suggestions": ideas}

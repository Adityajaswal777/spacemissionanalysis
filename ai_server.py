from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from google import genai
from dotenv import load_dotenv
import os

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AskRequest(BaseModel):
    mission: str
    question: str


@app.post("/ask")
def ask_ai(data: AskRequest):

    prompt = f"""
You are Space AI.

Mission:
{data.mission}

Question:
{data.question}

Rules:
- Answer accurately.
- Keep answers concise.
- Use headings and bullet points.
"""

    try:

        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=prompt
        )

        return {
            "answer": response.text
        }

    except Exception as e:

        return {
            "error": str(e)
        }
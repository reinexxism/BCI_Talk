from fastapi import FastAPI, Request
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="BCI-Chatbot Backend(minimal)")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

class ChatReq(BaseModel):
    message: str
    
@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/chat")
async def chat(req: ChatReq):
    text = req.message.lower()
    if "피곤" in text or "졸려" in text:
        reply = "현재 상태에서는 5분 스트레칭을 추천드려요. 짧은 리프레시가 필요해요!"
    elif "집중" in text:
        reply = "아주 좋습니다! 집중을 유지하려면 25분 집중 + 5분 휴식 방법을 추천해요."
    else:
        reply = f"메시지 잘 받았습니다: {req.message}"
    
    return {"reply": reply}
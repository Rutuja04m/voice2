#main.py

from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from voice_utils import recognize_speech, speak_text
from gemini_utils import ask_gemini
from doc_handler import save_doc, ask_from_document
from pathlib import Path

app = FastAPI()

# Allow frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5175"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

# Endpoint: Voice Listening
@app.get("/listen/")
def listen():
    try:
        user_input = recognize_speech()
        with open("history.txt", "a") as f:
            f.write(f"User: {user_input}\n")
        return {"success": True, "user_input": user_input}
    except Exception as e:
        return {"success": False, "error": str(e)}

# Endpoint: Ask Gemini
@app.post("/ask-gemini/")
def ask_gemini_endpoint(question: str = Form(...)):
    try:
        response = ask_gemini(question)
        speak_text(response)
        with open("history.txt", "a") as f:
            f.write(f"Bot: {response}\n---\n")
        return {"success": True, "response": response}
    except Exception as e:
        return {"success": False, "error": str(e)}

# Endpoint: Upload Document
@app.post("/upload-doc/")
async def upload_doc(file: UploadFile = File(...)):
    try:
        content = await file.read()
        save_doc(file.filename, content)
        return {"success": True, "message": f"{file.filename} uploaded"}
    except Exception as e:
        return {"success": False, "error": str(e)}

# Endpoint: Ask from Document
@app.post("/ask-doc/")
def ask_document(question: str = Form(...)):
    try:
        answer = ask_from_document(question)
        speak_text(answer)
        with open("history.txt", "a") as f:
            f.write(f"User: {question}\nBot (Doc): {answer}\n---\n")
        return {"success": True, "response": answer}
    except Exception as e:
        return {"success": False, "error": str(e)}

# Run app
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

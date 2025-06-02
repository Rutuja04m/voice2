import google.generativeai as genai
import os

# Load your Gemini API key
genai.configure(api_key=os.getenv("AIzaSyA7IeiCEbIxcf7PGFt1Ahik-QzapLZ3gJk"))

model = genai.GenerativeModel("gemini-1.5-flash")

def ask_gemini(prompt: str) -> str:
    try:
        response = model.generate_content(prompt)
        return response.text.strip()
    except Exception as e:
        raise Exception(f"Gemini API Error: {e}")

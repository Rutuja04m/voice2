// src/utils/api.js

const BASE_URL = "http://localhost:8000"; // Make sure FastAPI is running on this

export async function uploadAndAnalyze(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${BASE_URL}/upload-analyze/`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("File upload failed.");
  }

  return response.json();
}

export async function askGemini(question) {
  const response = await fetch(`${BASE_URL}/ask`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question }),
  });

  if (!response.ok) {
    throw new Error("Failed to get response from Gemini.");
  }

  return response.json();
}

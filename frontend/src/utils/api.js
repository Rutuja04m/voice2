const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

/**
 * Ask a question to the Gemini backend (via FastAPI).
 * Sends `question` as FormData (not JSON).
 */
export async function askGemini(question) {
  const formData = new FormData();
  formData.append("question", question);

  const response = await fetch(`${BACKEND_URL}/ask-gemini/`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.error || "Gemini request failed");
  }

  return { answer: data.response };
}

/**
 * Upload a document to the backend.
 * Sends the file as FormData to `/upload-doc/`.
 */
export async function uploadDocument(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${BACKEND_URL}/upload-doc/`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.error || "Upload failed");
  }

  return data;
}

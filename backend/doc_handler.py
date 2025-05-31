import os
import docx
import PyPDF2
from langdetect import detect

DOC_FOLDER = "uploads"
os.makedirs(DOC_FOLDER, exist_ok=True)

# Save uploaded document
def save_doc(filename, content):
    with open(os.path.join(DOC_FOLDER, filename), "wb") as f:
        f.write(content)

# Extract text from files
def extract_text_from_file(filepath):
    if filepath.endswith(".txt"):
        with open(filepath, "r", encoding="utf-8") as f:
            return f.read()
    elif filepath.endswith(".pdf"):
        with open(filepath, "rb") as f:
            reader = PyPDF2.PdfReader(f)
            return "\n".join(page.extract_text() for page in reader.pages if page.extract_text())
    elif filepath.endswith(".docx"):
        doc = docx.Document(filepath)
        return "\n".join(paragraph.text for paragraph in doc.paragraphs)
    else:
        raise Exception("Unsupported file format")

# Simple keyword match QA
def ask_from_document(question):
    # Find the most recent uploaded document
    files = sorted(os.listdir(DOC_FOLDER), key=lambda x: os.path.getmtime(os.path.join(DOC_FOLDER, x)), reverse=True)
    if not files:
        raise Exception("No document uploaded yet.")

    filepath = os.path.join(DOC_FOLDER, files[0])
    doc_text = extract_text_from_file(filepath)
    lang = detect(doc_text)

    prompt = (
        f"You are an expert assistant. "
        f"Based ONLY on the following document text, answer the question:\n\n"
        f"{doc_text[:8000]}\n\n"  # Gemini limit safety
        f"Question: {question}"
    )

    from gemini_utils import ask_gemini
    return ask_gemini(prompt)

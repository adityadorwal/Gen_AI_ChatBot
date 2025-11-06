from fastapi import FastAPI, Request, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from PyPDF2 import PdfReader
import google.generativeai as genai
import os
from typing import List, Dict

# 🔹 Setup Gemini
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
model = genai.GenerativeModel("gemini-2.0-flash-exp")

app = FastAPI()

# 🔹 Enable CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🔹 Global state
chat_sessions = {}  # Store chat history per session
pdf_contents = {}   # Store PDF content per session


@app.get("/")
def home():
    return {"message": "✅ Gen_AI Chatbot Backend is running!", "status": "healthy"}


@app.post("/upload_pdf")
async def upload_pdf(file: UploadFile = File(...)):
    """Handle PDF upload, extract text, and generate automatic summary"""
    
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Please upload a valid PDF file")

    try:
        pdf_reader = PdfReader(file.file)
        text = ""
        for page in pdf_reader.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"

        if not text.strip():
            raise HTTPException(status_code=400, detail="PDF appears to be empty or unreadable")

        # Store PDF content
        session_id = "default"
        pdf_contents[session_id] = text.strip()

        # 🔥 AUTO-GENERATE SUMMARY using Gemini
        summary_prompt = f"""Analyze this document and provide a concise summary covering:
1. Main topic/subject
2. Key points (3-5 bullet points)
3. Document type/purpose

Document content:
{text[:4000]}

Keep the summary clear and under 150 words."""

        try:
            summary_response = model.generate_content(summary_prompt)
            summary = summary_response.text.strip()
        except Exception as e:
            print(f"Summary generation error: {e}")
            summary = "✅ PDF uploaded successfully! The document has been processed and is ready for questions."

        return {
            "message": "success",
            "pages": len(pdf_reader.pages),
            "summary": summary,  # 🔥 Return AI-generated summary
            "characters": len(text)
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing PDF: {str(e)}")


@app.post("/chat")
async def chat(request: Request):
    """Main chat endpoint with PDF context support"""
    
    try:
        data = await request.json()
        user_prompt = data.get("prompt", "").strip()
        use_pdf = data.get("use_pdf", True)  # Toggle PDF context
        session_id = "default"

        if not user_prompt:
            raise HTTPException(status_code=400, detail="Prompt cannot be empty")

        # Initialize session if doesn't exist
        if session_id not in chat_sessions:
            chat_sessions[session_id] = []

        # Add user message to history
        chat_sessions[session_id].append({
            "role": "user", 
            "content": user_prompt
        })

        # Build context for Gemini
        context_parts = []
        
        # Add PDF context if available and enabled
        if use_pdf and session_id in pdf_contents:
            pdf_text = pdf_contents[session_id]
            # Limit PDF context to ~3000 characters to leave room for conversation
            context_parts.append(f"=== DOCUMENT CONTEXT ===\n{pdf_text[:3000]}\n=== END DOCUMENT ===\n")
        
        # Add recent conversation history (last 5 exchanges = 10 messages)
        recent_history = chat_sessions[session_id][-10:]
        for msg in recent_history:
            role = "User" if msg["role"] == "user" else "Assistant"
            context_parts.append(f"{role}: {msg['content']}")
        
        full_context = "\n".join(context_parts)

        # Generate response from Gemini
        response = model.generate_content(full_context)
        bot_reply = response.text.strip()

        # Add bot response to history
        chat_sessions[session_id].append({
            "role": "assistant",
            "content": bot_reply
        })

        return {
            "response": bot_reply,
            "has_pdf": session_id in pdf_contents,
            "history_length": len(chat_sessions[session_id])
        }

    except HTTPException:
        raise
    except Exception as e:
        print(f"❌ Error in chat endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail="Error generating response. Please try again.")


@app.get("/history")
def get_history():
    """Get chat history"""
    session_id = "default"
    history = chat_sessions.get(session_id, [])
    return {
        "history": history,
        "has_pdf": session_id in pdf_contents
    }


@app.post("/reset")
async def reset_conversation():
    """Reset chat history and PDF content"""
    session_id = "default"
    
    # Clear chat history
    if session_id in chat_sessions:
        del chat_sessions[session_id]
    
    # Clear PDF content
    if session_id in pdf_contents:
        del pdf_contents[session_id]
    
    return {
        "message": "✅ Conversation reset successfully",
        "history_cleared": True,
        "pdf_cleared": True
    }


@app.delete("/clear_pdf")
async def clear_pdf():
    """Clear only the PDF content, keep chat history"""
    session_id = "default"
    
    if session_id in pdf_contents:
        del pdf_contents[session_id]
        return {"message": "✅ PDF cleared successfully"}
    
    return {"message": "ℹ️ No PDF to clear"}


# Health check endpoint
@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "active_sessions": len(chat_sessions),
        "pdfs_loaded": len(pdf_contents)
    }
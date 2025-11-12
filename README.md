# 🤖 Gen AI Chatbot - PDF Q&A Application

A full-stack AI-powered chatbot application that enables intelligent conversations and document analysis using Google's Gemini 2.0 Flash model. Upload PDFs, get instant summaries, and ask contextual questions about your documents.

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://gen-ai-chat-bot-seven.vercel.app/)
[![Backend API](https://img.shields.io/badge/API-active-blue)](https://gen-ai-chatbot-pw26.onrender.com)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

## 🌐 Live Deployment

| Service | URL | Status |
|---------|-----|--------|
| **Frontend** | [https://gen-ai-chat-bot-seven.vercel.app/](https://gen-ai-chat-bot-seven.vercel.app/) | ✅ Active |
| **Backend API** | [https://gen-ai-chatbot-pw26.onrender.com](https://gen-ai-chatbot-pw26.onrender.com) | ✅ Active |
| **API Health Check** | [/health](https://gen-ai-chatbot-pw26.onrender.com/health) | ✅ Monitoring |

> **Note**: Backend uses Render's free tier. First request after 15 minutes of inactivity may take 30-50 seconds (cold start). This is expected behavior.

---

## ✨ Key Features

### 🎯 Core Functionality
- **💬 AI Chat Interface**: Real-time conversations with Google Gemini 2.0 model
- **📄 PDF Upload & Analysis**: Upload documents and get AI-powered insights instantly
- **🔍 Context-Aware Q&A**: Ask questions about uploaded PDFs with intelligent, contextual responses
- **📊 Auto-Summary Generation**: Automatic document summarization upon upload
- **💾 Chat History**: Persistent conversation history across sessions
- **🔄 Conversation Management**: Reset chat or clear PDF context anytime

### 🎨 User Experience
- **Modern Gradient UI**: Clean, intuitive interface with smooth animations
- **⚡ Real-time Responses**: Fast AI-powered replies with loading indicators
- **📱 Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **⌨️ Smart Input**: Auto-focus and keyboard shortcuts for better productivity
- **🕒 Timestamps**: Every message tagged with time for reference
- **🎯 Session Management**: Unique session IDs for multi-user support

---

## 🛠️ Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-18.x-blue?logo=react)
![Axios](https://img.shields.io/badge/Axios-1.x-purple)
![CSS3](https://img.shields.io/badge/CSS3-Gradients-pink?logo=css3)

- **React.js** - Component-based UI framework
- **Axios** - Promise-based HTTP client for API communication
- **LocalStorage** - Client-side state persistence
- **CSS3** - Modern styling with gradients, animations, and transitions

### Backend
![FastAPI](https://img.shields.io/badge/FastAPI-0.104-green?logo=fastapi)
![Python](https://img.shields.io/badge/Python-3.11-blue?logo=python)
![Gemini](https://img.shields.io/badge/Gemini-2.0_Flash-orange)

- **FastAPI** - High-performance Python web framework
- **Google Generative AI (Gemini 2.0 Flash Exp)** - State-of-the-art LLM
- **PyPDF2** - PDF text extraction and processing
- **Python-dotenv** - Environment variable management
- **CORS Middleware** - Secure cross-origin resource sharing

### Deployment & Infrastructure
- **Vercel** - Frontend hosting with automatic deployments
- **Render** - Backend hosting with built-in SSL
- **GitHub** - Version control and CI/CD pipeline

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:
- **Python 3.8+** ([Download](https://www.python.org/downloads/))
- **Node.js 14+** ([Download](https://nodejs.org/))
- **npm** or **yarn**
- **Google API Key** ([Get one here](https://makersuite.google.com/app/apikey))

### Installation

#### 1️⃣ Clone the Repository
```bash
git clone https://github.com/adityadorwal/Gen_AI_ChatBot.git
cd Gen_AI_ChatBot
```

#### 2️⃣ Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
echo "GOOGLE_API_KEY=your_google_api_key_here" > .env

# Run the backend server
uvicorn main:app --reload
```

Backend will start at **http://127.0.0.1:8000**

#### 3️⃣ Frontend Setup

```bash
# Open new terminal and navigate to frontend
cd frontend

# Install dependencies
npm install

# Create .env file (optional for local dev)
echo "REACT_APP_API_URL=http://127.0.0.1:8000" > .env

# Start development server
npm start
```

Frontend will start at **http://localhost:3000**

---

## 🔑 Getting Google API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click **"Create API Key"**
4. Copy the generated key
5. Add it to `backend/.env` file:
   ```env
   GOOGLE_API_KEY=your_actual_api_key_here
   ```

---

## 📁 Project Structure

```
Gen_AI_ChatBot/
├── backend/
│   ├── main.py                 # FastAPI application & API endpoints
│   ├── .env                    # Environment variables (not in git)
│   ├── .gitignore             # Python gitignore
│   └── requirements.txt        # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── App.js             # Main React component
│   │   ├── App.css            # Application styling
│   │   ├── index.js           # React entry point
│   │   └── index.css          # Global styles
│   ├── public/
│   │   └── index.html         # HTML template
│   ├── package.json           # Node dependencies
│   └── .gitignore             # Node gitignore
├── README.md                   # Project documentation
└── requirements.txt            # Backend dependencies
```

---

## 🔌 API Endpoints

### Backend API Documentation

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | API information and status |
| `GET` | `/health` | Health check endpoint |
| `POST` | `/upload_pdf` | Upload and process PDF document |
| `POST` | `/chat` | Send message and get AI response |
| `GET` | `/history/{session_id}` | Retrieve chat history |
| `POST` | `/reset/{session_id}` | Reset conversation history |
| `DELETE` | `/clear_pdf/{session_id}` | Clear PDF context |

### Example API Calls

#### Upload PDF
```bash
curl -X POST "https://gen-ai-chatbot-pw26.onrender.com/upload_pdf" \
  -F "file=@document.pdf" \
  -F "session_id=your_session_id"
```

#### Send Chat Message
```bash
curl -X POST "https://gen-ai-chatbot-pw26.onrender.com/chat" \
  -H "Content-Type: application/json" \
  -d '{"message": "What is this document about?", "session_id": "your_session_id"}'
```

#### Health Check
```bash
curl "https://gen-ai-chatbot-pw26.onrender.com/health"
```

---

## 💡 How It Works

### PDF Upload & Analysis Flow
```
1. User uploads PDF → 
2. FastAPI receives file → 
3. PyPDF2 extracts text → 
4. Text sent to Gemini AI → 
5. AI generates summary → 
6. Summary displayed to user → 
7. PDF context stored in session
```

### Chat & Q&A Flow
```
1. User types question → 
2. Frontend sends to backend → 
3. Backend adds PDF context (if available) → 
4. Prompt sent to Gemini AI → 
5. AI generates contextual response → 
6. Response returned to user → 
7. Chat history updated
```

---

## 🎯 Features in Detail

### 🔐 Security Features
- ✅ API key stored in environment variables (never exposed)
- ✅ File size validation (10MB max)
- ✅ File type validation (PDF only)
- ✅ Input sanitization and validation
- ✅ CORS protection with allowed origins
- ✅ Session-based isolation (multi-user support)

### 📊 Session Management
- Each user gets a unique session ID
- PDF context isolated per session
- Chat history separated by session
- Prevents data leakage between users

### ⚡ Performance Optimizations
- Auto-scroll to latest messages
- Input field auto-focus for better UX
- Loading indicators during API calls
- Progressive rendering of chat messages
- Efficient state management with React hooks

---

## 🎨 UI/UX Highlights

- **Gradient Design**: Modern purple-pink gradient theme
- **Message Animations**: Smooth slide-in animations for messages
- **Typing Indicators**: Three-dot animation while AI generates response
- **Timestamp Display**: All messages tagged with time
- **File Upload Icon**: Intuitive paperclip icon for PDF uploads
- **Status Messages**: Clear feedback for all user actions
- **Error Handling**: User-friendly error messages with auto-dismiss

---

## 🐛 Troubleshooting

### Common Issues & Solutions

#### ❌ "Module not found: google.generativeai"
```bash
pip install google-generativeai
```

#### ❌ "GOOGLE_API_KEY not found"
- Ensure `.env` file exists in `backend/` directory
- Verify API key is correct and active
- Restart the backend server after adding the key

#### ❌ "CORS Error" in Browser Console
- Check backend is running on port 8000
- Verify CORS middleware is configured in `main.py`
- Ensure frontend URL is in allowed origins list

#### ❌ "Cannot connect to server"
- Confirm backend is running: `uvicorn main:app --reload`
- Check backend URL in `App.js` matches your setup
- For production: Update `REACT_APP_API_URL` environment variable

#### ⚠️ Backend Takes Long to Respond (First Request)
- This is normal for Render free tier (cold start)
- Server spins down after 15 minutes of inactivity
- First request wakes it up (~30-50 seconds)
- Subsequent requests are fast

---

## 📈 Future Enhancements

### Planned Features
- [ ] **Streaming Responses** - Real-time token-by-token AI responses
- [ ] **User Authentication** - JWT-based login/signup system
- [ ] **Multi-File Support** - Upload and manage multiple PDFs
- [ ] **Dark Mode Toggle** - User preference for light/dark theme
- [ ] **Export Chat History** - Download conversations as PDF/TXT
- [ ] **Voice Input** - Speech-to-text for accessibility
- [ ] **Markdown Rendering** - Format code blocks and tables in responses
- [ ] **Message Editing** - Edit and resend messages
- [ ] **File Type Support** - Add DOCX, TXT, CSV support

### Performance Improvements
- [ ] Redis caching for frequently asked questions
- [ ] WebSocket integration for real-time updates
- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] CDN for faster static asset delivery
- [ ] Server-side pagination for chat history

---

## 🧪 Testing

### Manual Testing Checklist
- [ ] Upload PDF (< 10MB)
- [ ] Verify auto-summary generation
- [ ] Ask 3-5 questions about PDF
- [ ] Test chat without PDF
- [ ] Reset conversation
- [ ] Clear PDF context
- [ ] Refresh page (history persists?)
- [ ] Try invalid file upload
- [ ] Test with large message (>2000 chars)

### API Testing with Curl
```bash
# Health check
curl https://gen-ai-chatbot-pw26.onrender.com/health

# Chat endpoint
curl -X POST https://gen-ai-chatbot-pw26.onrender.com/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello!", "session_id": "test123"}'
```

---

## 👨‍💻 Development

### Running in Development Mode

**Backend** (with auto-reload):
```bash
cd backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

**Frontend** (with hot reload):
```bash
cd frontend
npm start
```

### Environment Variables

#### Backend (`backend/.env`)
```env
GOOGLE_API_KEY=your_google_api_key_here
PORT=8000
```

#### Frontend (`frontend/.env`)
```env
REACT_APP_API_URL=http://127.0.0.1:8000
```

---

## 🚢 Deployment Guide

### Deploy Backend to Render

1. Create account at [render.com](https://render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn backend.main:app --host 0.0.0.0 --port $PORT`
5. Add environment variable: `GOOGLE_API_KEY`
6. Deploy

### Deploy Frontend to Vercel

1. Create account at [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Create React App
   - **Root Directory**: `frontend`
5. Add environment variable: `REACT_APP_API_URL` (your Render backend URL)
6. Deploy

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Google Gemini AI** - For powering the chatbot intelligence
- **FastAPI** - For the excellent backend framework
- **React** - For the powerful frontend library
- **Vercel & Render** - For reliable hosting platforms
- **Inzint** - For the learning opportunity through this assignment

---

## 📞 Contact & Links

- **Live Demo**: [https://gen-ai-chat-bot-seven.vercel.app/](https://gen-ai-chat-bot-seven.vercel.app/)
- **GitHub**: [https://github.com/adityadorwal/Gen_AI_ChatBot](https://github.com/adityadorwal/Gen_AI_ChatBot)
- **Backend API**: [https://gen-ai-chatbot-pw26.onrender.com](https://gen-ai-chatbot-pw26.onrender.com)
- **Developer**: Aditya Dorwal
- **Email**: 18dorwaladitya@gmail.com

---

## 🌟 Project Status

This project was created as part of the **AIML/Full Stack Take-Home Assignment for Inzint**.

**Status**: ✅ Complete and Deployed

**Assignment Completion**:
- ✅ All must-have requirements implemented
- ✅ Bonus: Full deployment (Frontend + Backend)
- ✅ Bonus: Chat history maintenance
- ✅ Bonus: Conversation reset functionality
- ✅ Professional documentation
- ✅ Clean, maintainable code

---

<div align="center">

**Made with ❤️ using React, FastAPI, and Google Gemini AI**

⭐ **Star this repo if you find it helpful!** ⭐

</div>

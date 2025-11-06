# 🤖 Gen AI Chatbot - PDF Q&A Application

A full-stack web application that allows users to chat with an AI and ask questions about uploaded PDF documents using Google's Gemini AI.

![Project Demo](https://via.placeholder.com/800x400?text=Add+Your+Screenshot+Here)

## 🌟 Features

- **AI Chat Interface**: Interactive chat with Google's Gemini 2.0 Flash model
- **PDF Upload & Analysis**: Upload PDFs and get instant AI-generated summaries
- **Context-Aware Q&A**: Ask questions about uploaded documents with intelligent responses
- **Chat History**: Maintains conversation history with timestamps
- **PDF Context Toggle**: Enable/disable PDF context in conversations
- **Conversation Reset**: Clear chat history and start fresh
- **Responsive Design**: Modern, gradient UI that works on all devices
- **Auto-Summary Generation**: Automatic PDF summarization upon upload

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI framework
- **Axios** - HTTP client
- **CSS3** - Modern styling with gradients and animations

### Backend
- **FastAPI** - High-performance Python web framework
- **Google Generative AI (Gemini)** - LLM for chat and PDF analysis
- **PyPDF2** - PDF text extraction
- **CORS Middleware** - Cross-origin resource sharing

### AI/ML
- **Google Gemini 2.0 Flash Exp** - Latest Gemini model for fast responses

## 📋 Prerequisites

Before running this project, make sure you have:

- Python 3.8 or higher
- Node.js 14 or higher
- npm or yarn
- Google API Key (for Gemini AI)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/gemini-chatbot.git
cd gemini-chatbot
```

### 2. Backend Setup

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
pip install fastapi uvicorn python-multipart PyPDF2 google-generativeai

# Create .env file and add your Google API Key
echo "GOOGLE_API_KEY=your_api_key_here" > .env

# Run the backend server
uvicorn main:app --reload
```

The backend will start at `http://127.0.0.1:8000`

### 3. Frontend Setup

```bash
# Open new terminal and navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
```

The frontend will start at `http://localhost:3000`

## 🔑 Getting Your Google API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Create API Key"
3. Copy your API key
4. Add it to your backend `.env` file

## 📁 Project Structure

```
gemini-chatbot/
├── backend/
│   ├── main.py              # FastAPI backend server
│   ├── requirements.txt     # Python dependencies
│   └── .env                 # Environment variables (not in git)
├── frontend/
│   ├── src/
│   │   ├── App.js          # Main React component
│   │   ├── App.css         # Styling
│   │   └── index.js        # Entry point
│   ├── package.json        # Node dependencies
│   └── public/
└── README.md
```

## 🎯 How It Works

1. **PDF Upload**: User uploads a PDF document
2. **Text Extraction**: PyPDF2 extracts text from the PDF
3. **Auto-Summary**: Gemini AI generates a concise summary
4. **Contextual Chat**: User asks questions about the PDF
5. **AI Response**: Gemini processes the question with PDF context and chat history
6. **Display**: Response shown in chat interface with timestamps

## 🔌 API Endpoints

### Backend Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check |
| POST | `/upload_pdf` | Upload and process PDF |
| POST | `/chat` | Send chat message |
| GET | `/history` | Get chat history |
| POST | `/reset` | Reset conversation |
| DELETE | `/clear_pdf` | Clear PDF context |
| GET | `/health` | Server health status |

## 💡 Key Features Explained

### 1. Auto-Focus Input
The input field automatically maintains focus, allowing continuous typing without clicking.

### 2. Smart Scrolling
Chat window intelligently scrolls to show recent messages while leaving space for bot replies.

### 3. PDF Context Management
Users can toggle PDF context on/off to control whether the AI uses document information.

### 4. Persistent Chat History
Chat history is saved in browser localStorage and survives page refreshes.

## 🎨 UI/UX Highlights

- **Gradient Design**: Modern purple gradient theme
- **Message Animations**: Smooth slide-in animations for messages
- **Loading Indicators**: Three-dot animation while bot responds
- **Timestamps**: All messages include timestamps
- **File Upload**: Intuitive paperclip icon for PDF uploads
- **Responsive Layout**: Works seamlessly on mobile and desktop

## 🐛 Troubleshooting

### Backend Issues

**Problem**: `ModuleNotFoundError: No module named 'google.generativeai'`
```bash
pip install google-generativeai
```

**Problem**: `GOOGLE_API_KEY not found`
- Make sure you created `.env` file in backend directory
- Verify the API key is correct

### Frontend Issues

**Problem**: `CORS error`
- Ensure backend is running on port 8000
- Check CORS middleware is enabled in `main.py`

**Problem**: Cannot connect to server
- Verify backend URL in `App.js` matches your backend port

## 🚀 Deployment

### Backend (Render/Railway)
1. Push code to GitHub
2. Connect repository to Render/Railway
3. Add `GOOGLE_API_KEY` environment variable
4. Deploy

### Frontend (Vercel/Netlify)
1. Update `API_BASE_URL` in `App.js` to your deployed backend URL
2. Push code to GitHub
3. Connect repository to Vercel/Netlify
4. Deploy

## 🎓 Challenges Faced & Solutions

1. **Challenge**: Managing PDF context with chat history
   - **Solution**: Implemented session-based storage with context limits

2. **Challenge**: Maintaining input focus after sending messages
   - **Solution**: Added auto-focus effect with interval checking

3. **Challenge**: Generating meaningful PDF summaries
   - **Solution**: Crafted specific prompts for Gemini to analyze document structure

## 🤝 Future Enhancements

- [ ] Add streaming responses for real-time token generation
- [ ] Support multiple file formats (DOCX, TXT, etc.)
- [ ] User authentication and session management
- [ ] Export chat history to PDF/Text
- [ ] Dark mode toggle
- [ ] Multiple concurrent PDF uploads
- [ ] Voice input/output support

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Your Name - [GitHub](https://github.com/yourusername) | [LinkedIn](https://linkedin.com/in/yourprofile)

## 🙏 Acknowledgments

- Google Gemini AI for powering the chatbot
- FastAPI for excellent backend framework
- React community for amazing frontend tools

---

**Note**: This project was created as part of the AIML/Full Stack Take-Home Assignment for Inzint.

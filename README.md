# AI-Powered Deepfake Scam Risk Analyzer

A comprehensive platform that helps users identify suspicious voice and video content that may be manipulated or synthetically generated. Our system analyzes audio/video samples using media signal processing techniques and provides intelligent scam risk assessments.

![Deepfake Analyzer](https://via.placeholder.com/800x400/0ea5e9/ffffff?text=Deepfake+Scam+Risk+Analyzer)

## Features

### Core Capabilities
- **Audio Analysis**: Advanced spectral analysis to detect synthetic voice patterns
- **Video Analysis**: Frame-by-frame examination for visual inconsistencies
- **Risk Scoring**: Hybrid engine that calculates manipulation probability
- **AI Explanations**: Human-readable explanations of analysis results

### Technical Features
- Fast Python-based media analysis (Librosa, OpenCV)
- FastAPI backend for high performance
- React frontend with TypeScript
- Responsive design with Tailwind CSS
- Framer Motion animations

## Tech Stack

### Backend
- Python 3.9+
- FastAPI
- Librosa (Audio Analysis)
- OpenCV (Video Analysis)
- NumPy & Scikit-learn

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- React Router

## Project Structure

```
deepfake-analyzer/
├── backend/
│   ├── main.py              # FastAPI application
│   ├── requirements.txt     # Python dependencies
│   └── analysis/
│       ├── audio_analyzer.py
│       ├── video_analyzer.py
│       ├── risk_scorer.py
│       └── report_generator.py
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Layout/
    │   │   │   ├── Header.tsx
    │   │   │   └── Footer.tsx
    │   │   └── UI/
    │   │       ├── UploadZone.tsx
    │   │       └── RiskMeter.tsx
    │   ├── pages/
    │   │   ├── HomePage.tsx
    │   │   ├── AnalyzePage.tsx
    │   │   ├── ResultsPage.tsx
    │   │   ├── HistoryPage.tsx
    │   │   └── LearnPage.tsx
    │   ├── services/
    │   │   └── api.ts
    │   ├── types/
    │   │   └── index.ts
    │   ├── App.tsx
    │   └── index.tsx
    └── package.json
```

## Getting Started

### Prerequisites
- Python 3.9 or higher
- Node.js 18 or higher
- npm or yarn

### Installation

#### Backend Setup
```bash
# Navigate to backend directory
cd deepfake-analyzer/backend

# Create virtual environment (optional but recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install Python dependencies
pip install -r requirements.txt
```

#### Frontend Setup
```bash
# Navigate to frontend directory
cd deepfake-analyzer/frontend

# Install Node.js dependencies
npm install
```

### Running the Application

#### Start Backend
```bash
cd deepfake-analyzer/backend
uvicorn main:app --reload --port 8000
```

The backend will be available at: http://localhost:8000

#### Start Frontend
```bash
cd deepfake-analyzer/frontend
npm start
```

The frontend will be available at: http://localhost:3000

## API Documentation

Once the backend is running, visit:
- Swagger UI: http://localhost:8000/api/docs
- ReDoc: http://localhost:8000/api/redoc

## Supported File Formats

### Audio
- WAV
- MP3
- M4A
- FLAC

### Video
- MP4
- AVI
- MOV
- WebM

## Risk Levels

| Level | Score Range | Description |
|-------|-------------|-------------|
| LOW | 0-30% | Content appears authentic |
| MODERATE | 31-60% | Some anomalies detected |
| HIGH | 61-85% | Multiple manipulation indicators |
| CRITICAL | 86-100% | Strong evidence of manipulation |

## How It Works

1. **Upload**: Drag and drop your audio or video file
2. **Analysis**: Our algorithms examine the content for manipulation markers
3. **Results**: Receive a comprehensive risk assessment report

## Analysis Techniques

### Audio Analysis
- Spectral pattern analysis
- MFCC (Mel-Frequency Cepstral Coefficients)
- Noise pattern detection
- Temporal consistency analysis
- Compression artifact detection

### Video Analysis
- Frame consistency analysis
- Visual artifact detection
- Sharpness and blur detection
- Color consistency analysis
- Edge pattern analysis

## Disclaimer

This tool provides a risk assessment based on technical analysis. It is not a guarantee of authenticity. Always verify important content through additional means.

## License

MIT License

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.


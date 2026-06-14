"""
Deepfake Analyzer - Main FastAPI Application
AI-Powered Deepfake Scam Risk Analyzer
"""

import os
import uuid
from pathlib import Path
from typing import Optional

import uvicorn
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel

from analysis.audio_analyzer import AudioAnalyzer
from analysis.video_analyzer import VideoAnalyzer
from analysis.risk_scorer import RiskScorer
from analysis.report_generator import ReportGenerator

# Initialize FastAPI app
app = FastAPI(
    title="Deepfake Scam Risk Analyzer",
    description="AI-Powered analysis tool to detect manipulated voice and video content",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc"
)

# Configure CORS
allowed_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000,http://127.0.0.1:3000").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create upload directory
UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

# Initialize analyzers
audio_analyzer = AudioAnalyzer()
video_analyzer = VideoAnalyzer()
risk_scorer = RiskScorer()
report_generator = ReportGenerator()


class AnalysisResponse(BaseModel):
    analysis_id: str
    file_type: str
    risk_score: float
    risk_level: str
    indicators: list
    explanation: str
    recommendations: list
    timestamp: str


@app.get("/")
async def root():
    """Root endpoint with API information"""
    return {
        "name": "Deepfake Scam Risk Analyzer API",
        "version": "1.0.0",
        "description": "AI-Powered analysis tool to detect manipulated voice and video content",
        "docs": "/api/docs",
        "endpoints": {
            "analyze": "/api/v1/analyze",
            "health": "/api/v1/health",
            "history": "/api/v1/history"
        }
    }


@app.get("/api/v1/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": "Deepfake Analyzer",
        "version": "1.0.0"
    }


@app.post("/api/v1/analyze")
async def analyze_media(file: UploadFile = File(...)) -> AnalysisResponse:
    """
    Analyze uploaded audio or video file for potential deepfake indicators
    
    Args:
        file: Audio or video file to analyze
        
    Returns:
        AnalysisResponse with risk score and detailed findings
    """
    # Validate file type
    allowed_audio = ['audio/wav', 'audio/mp3', 'audio/mpeg', 'audio/m4a', 'audio/flac']
    allowed_video = ['video/mp4', 'video/avi', 'video/mov', 'video/webm']
    
    content_type = file.content_type
    
    # Generate unique analysis ID
    analysis_id = str(uuid.uuid4())
    file_extension = Path(file.filename).suffix
    file_path = UPLOAD_DIR / f"{analysis_id}{file_extension}"
    
    try:
        # Save uploaded file (streaming to avoid loading full payload into memory)
        with open(file_path, "wb") as f:
            chunk_size = 8 * 1024 * 1024  # 8MB
            while True:
                chunk = await file.read(chunk_size)
                if not chunk:
                    break
                f.write(chunk)
        
        
        # Determine file type and analyze
        if content_type in allowed_audio or file_extension in ['.wav', '.mp3', '.m4a', '.flac']:
            file_type = "audio"
            analysis_results = audio_analyzer.analyze(str(file_path))
        elif content_type in allowed_video or file_extension in ['.mp4', '.avi', '.mov', '.webm']:
            file_type = "video"
            analysis_results = video_analyzer.analyze(str(file_path))
        else:
            raise HTTPException(
                status_code=400,
                detail="Unsupported file type. Please upload audio (wav, mp3, m4a, flac) or video (mp4, avi, mov, webm)"
            )
        
        # Calculate risk score
        risk_result = risk_scorer.calculate_risk(analysis_results, file_type)
        
        # Generate explanation and recommendations
        explanation = report_generator.generate_explanation(risk_result, analysis_results, file_type)
        recommendations = report_generator.generate_recommendations(risk_result)
        
        # Get current timestamp
        from datetime import datetime
        timestamp = datetime.now().isoformat()
        
        return AnalysisResponse(
            analysis_id=analysis_id,
            file_type=file_type,
            risk_score=risk_result["risk_score"],
            risk_level=risk_result["risk_level"],
            indicators=risk_result["indicators"],
            explanation=explanation,
            recommendations=recommendations,
            timestamp=timestamp
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")
    
    finally:
        # Clean up uploaded file
        if file_path.exists():
            file_path.unlink()


@app.get("/api/v1/analysis/{analysis_id}")
async def get_analysis(analysis_id: str):
    """Retrieve a specific analysis result"""
    # In production, this would fetch from database
    return {
        "analysis_id": analysis_id,
        "status": "completed",
        "message": "Analysis result retrieved"
    }


if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )


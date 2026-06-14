"""
Video Analyzer Module
Analyzes video files for potential deepfake/manipulation indicators
"""

import os
import numpy as np
import cv2
from typing import Dict, Any, List, Tuple
from collections import defaultdict


class VideoAnalyzer:
    """Analyzes video files for manipulation indicators"""
    
    def __init__(self):
        self.frame_sample_rate = 10  # Analyze every N frames
        self.min_frames = 30
        
    def analyze(self, file_path: str) -> Dict[str, Any]:
        """
        Perform comprehensive video analysis
        
        Args:
            file_path: Path to video file
            
        Returns:
            Dictionary containing analysis results
        """
        try:
            # Open video file
            cap = cv2.VideoCapture(file_path)
            
            if not cap.isOpened():
                return {
                    "error": "Could not open video file",
                    "frame_analysis": {},
                    "consistency": {},
                    "artifacts": {},
                    "overall": 0
                }
            
            # Get video properties
            fps = cap.get(cv2.CAP_PROP_FPS)
            total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
            width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
            height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
            
            # Analyze frames
            frame_analysis = self._analyze_frames(cap, total_frames)
            
            # Release video
            cap.release()
            
            # Perform consistency analysis
            consistency_analysis = self._analyze_consistency(frame_analysis)
            
            # Detect artifacts
            artifact_analysis = self._detect_artifacts(frame_analysis, width, height)
            
            # Calculate overall score
            overall_score = self._calculate_overall_score(
                frame_analysis, 
                consistency_analysis, 
                artifact_analysis
            )
            
            return {
                "video_info": {
                    "fps": fps,
                    "total_frames": total_frames,
                    "width": width,
                    "height": height,
                    "duration": total_frames / fps if fps > 0 else 0
                },
                "frame_analysis": frame_analysis,
                "consistency": consistency_analysis,
                "artifacts": artifact_analysis,
                "overall": overall_score
            }
            
        except Exception as e:
            return {
                "error": str(e),
                "frame_analysis": {},
                "consistency": {},
                "artifacts": {},
                "overall": 0
            }
    
    def _analyze_frames(self, cap: cv2.VideoCapture, total_frames: int) -> Dict[str, Any]:
        """Analyze individual frames for various features"""
        
        frames_data = []
        frame_indices = list(range(0, total_frames, self.frame_sample_rate))
        
        brightness_values = []
        contrast_values = []
        sharpness_values = []
        face_detection_rates = []
        
        for frame_idx in frame_indices:
            cap.set(cv2.CAP_PROP_POS_FRAMES, frame_idx)
            ret, frame = cap.read()
            
            if not ret:
                continue
            
            # Convert to different color spaces
            gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
            
            # Analyze brightness
            brightness = np.mean(gray)
            brightness_values.append(brightness)
            
            # Analyze contrast (standard deviation)
            contrast = np.std(gray)
            contrast_values.append(contrast)
            
            # Analyze sharpness (Laplacian variance)
            laplacian = cv2.Laplacian(gray, cv2.CV_64F)
            sharpness = laplacian.var()
            sharpness_values.append(sharpness)
            
            # Color analysis
            h_mean = np.mean(hsv[:, :, 0])
            s_mean = np.mean(hsv[:, :, 1])
            v_mean = np.mean(hsv[:, :, 2])
            
            # Edge density
            edges = cv2.Canny(gray, 50, 150)
            edge_density = np.sum(edges > 0) / edges.size
            
            frames_data.append({
                "frame_index": frame_idx,
                "brightness": float(brightness),
                "contrast": float(contrast),
                "sharpness": float(sharpness),
                "hue": float(h_mean),
                "saturation": float(s_mean),
                "value": float(v_mean),
                "edge_density": float(edge_density)
            })
        
        return {
            "frames": frames_data,
            "statistics": {
                "brightness_mean": float(np.mean(brightness_values)) if brightness_values else 0,
                "brightness_std": float(np.std(brightness_values)) if brightness_values else 0,
                "contrast_mean": float(np.mean(contrast_values)) if contrast_values else 0,
                "contrast_std": float(np.std(contrast_values)) if contrast_values else 0,
                "sharpness_mean": float(np.mean(sharpness_values)) if sharpness_values else 0,
                "sharpness_std": float(np.std(sharpness_values)) if sharpness_values else 0,
            }
        }
    
    def _analyze_consistency(self, frame_analysis: Dict) -> Dict[str, Any]:
        """Analyze temporal consistency across frames"""
        
        frames = frame_analysis.get("frames", [])
        
        if len(frames) < 2:
            return {
                "anomalies": [],
                "consistency_score": 100
            }
        
        # Extract time-series data
        brightness = [f["brightness"] for f in frames]
        contrast = [f["contrast"] for f in frames]
        sharpness = [f["sharpness"] for f in frames]
        edge_density = [f["edge_density"] for f in frames]
        
        anomalies = []
        
        # Check brightness consistency
        brightness_cv = np.std(brightness) / (np.mean(brightness) + 1e-10)
        if brightness_cv > 0.5:
            anomalies.append({
                "type": "brightness_inconsistency",
                "description": "Unusual brightness variation detected across frames",
                "severity": "medium"
            })
        
        # Check contrast consistency
        contrast_cv = np.std(contrast) / (np.mean(contrast) + 1e-10)
        if contrast_cv > 0.5:
            anomalies.append({
                "type": "contrast_inconsistency",
                "description": "Unusual contrast variation detected - possible frame manipulation",
                "severity": "medium"
            })
        
        # Check sharpness consistency (blurriness attacks)
        sharpness_cv = np.std(sharpness) / (np.mean(sharpness) + 1e-10)
        if sharpness_cv > 0.8:
            anomalies.append({
                "type": "sharpness_inconsistency",
                "description": "Extreme sharpness variation - possible selective blurring",
                "severity": "high"
            })
        
        # Check edge density consistency
        edge_cv = np.std(edge_density) / (np.mean(edge_density) + 1e-10)
        if edge_cv > 0.5:
            anomalies.append({
                "type": "edge_inconsistency",
                "description": "Inconsistent edge patterns detected",
                "severity": "medium"
            })
        
        # Check for unnatural frame patterns (sign of interpolation)
        if len(frames) >= 10:
            # Check for periodic patterns
            brightness_diff = np.diff(brightness)
            diff_variance = np.var(brightness_diff)
            
            if diff_variance < 0.01:
                anomalies.append({
                    "type": "unnatural_frame_transitions",
                    "description": "Suspiciously smooth frame transitions - possible frame interpolation",
                    "severity": "high"
                })
        
        # Calculate consistency score
        severity_weights = {"high": 3, "medium": 2, "low": 1}
        anomaly_penalty = sum(
            severity_weights.get(a.get("severity", "low"), 1) 
            for a in anomalies
        )
        consistency_score = max(0, 100 - anomaly_penalty * 15)
        
        return {
            "anomalies": anomalies,
            "consistency_score": consistency_score,
            "metrics": {
                "brightness_cv": float(brightness_cv),
                "contrast_cv": float(contrast_cv),
                "sharpness_cv": float(sharpness_cv),
                "edge_cv": float(edge_cv)
            }
        }
    
    def _detect_artifacts(self, frame_analysis: Dict, width: int, height: int) -> Dict[str, Any]:
        """Detect compression and manipulation artifacts"""
        
        frames = frame_analysis.get("frames", [])
        
        artifacts = []
        
        # Check for block artifacts (JPEG compression)
        block_artifact_count = 0
        for frame in frames:
            # Check for block-like patterns
            gray_value = frame.get("brightness", 0)
            if gray_value > 0:
                # Heuristic: very uniform regions might indicate blocks
                if frame.get("contrast", 0) < 5:
                    block_artifact_count += 1
        
        if block_artifact_count > len(frames) * 0.3:
            artifacts.append({
                "type": "block_artifacts",
                "description": "Block-like patterns detected - possible video compression artifacts",
                "severity": "medium"
            })
        
        # Check for unnatural color bleeding
        color_bleeding_detected = False
        for i, frame in enumerate(frames):
            hue = frame.get("hue", 0)
            saturation = frame.get("saturation", 0)
            
            # Unusually high saturation might indicate color manipulation
            if saturation > 200:
                color_bleeding_detected = True
                break
        
        if color_bleeding_detected:
            artifacts.append({
                "type": "color_anomalies",
                "description": "Unusual color saturation detected - possible color manipulation",
                "severity": "low"
            })
        
        # Check for aspect ratio issues
        if width > 0 and height > 0:
            aspect_ratio = width / height
            if aspect_ratio < 0.5 or aspect_ratio > 3.0:
                artifacts.append({
                    "type": "aspect_ratio_issue",
                    "description": "Unusual aspect ratio detected",
                    "severity": "low"
                })
        
        # Check for frame rate anomalies
        if len(frames) > 0:
            # Very low frame count might indicate tampering
            if len(frames) < self.min_frames:
                artifacts.append({
                    "type": "low_frame_count",
                    "description": "Limited number of frames analyzed - results may be less reliable",
                    "severity": "low"
                })
        
        # Check for GAN-specific artifacts (noise patterns)
        noise_patterns_detected = False
        for frame in frames:
            sharpness = frame.get("sharpness", 0)
            # Very high or very low sharpness can indicate synthetic content
            if sharpness > 1000 or sharpness < 10:
                noise_patterns_detected = True
                break
        
        if noise_patterns_detected:
            artifacts.append({
                "type": "unusual_sharpness",
                "description": "Unusual sharpness patterns - possible synthetic content",
                "severity": "medium"
            })
        
        return {
            "artifacts": artifacts,
            "artifact_count": len(artifacts)
        }
    
    def _calculate_overall_score(
        self, 
        frame_analysis: Dict, 
        consistency: Dict, 
        artifacts: Dict
    ) -> float:
        """Calculate overall manipulation score"""
        
        # Consistency score (inverse - lower consistency = higher risk)
        consistency_score = consistency.get("consistency_score", 100)
        consistency_risk = 100 - consistency_score
        
        # Artifact count
        artifact_count = artifacts.get("artifact_count", 0)
        artifact_risk = min(50, artifact_count * 10)
        
        # Calculate weighted risk
        total_risk = (consistency_risk * 0.6) + (artifact_risk * 0.4)
        
        # Normalize to 0-100
        normalized_score = min(100, total_risk)
        
        return round(normalized_score, 2)


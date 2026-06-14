"""
Risk Scorer Module
Calculates risk scores based on analysis results
"""

from typing import Dict, Any, List


class RiskScorer:
    """Calculates risk scores for analyzed media"""
    
    def __init__(self):
        self.risk_thresholds = {
            "low": 30,
            "moderate": 60,
            "high": 85,
            "critical": 100
        }
    
    def calculate_risk(self, analysis_results: Dict[str, Any], file_type: str) -> Dict[str, Any]:
        """
        Calculate overall risk score based on analysis results
        
        Args:
            analysis_results: Results from audio or video analyzer
            file_type: Type of file analyzed ('audio' or 'video')
            
        Returns:
            Dictionary containing risk score, level, and indicators
        """
        # Get base risk score from analysis
        if file_type == "audio":
            risk_score = self._calculate_audio_risk(analysis_results)
        else:
            risk_score = self._calculate_video_risk(analysis_results)
        
        # Determine risk level
        risk_level = self._get_risk_level(risk_score)
        
        # Collect all indicators
        indicators = self._collect_indicators(analysis_results, file_type)
        
        return {
            "risk_score": risk_score,
            "risk_level": risk_level,
            "indicators": indicators,
            "file_type": file_type
        }
    
    def _calculate_audio_risk(self, results: Dict[str, Any]) -> float:
        """Calculate risk score for audio analysis"""
        
        # Get overall score from audio analyzer
        overall_score = results.get("overall", 0)
        
        # Collect all anomalies
        all_anomalies = []
        
        # Spectral anomalies
        spectral = results.get("spectral", {})
        all_anomalies.extend(spectral.get("anomalies", []))
        
        # MFCC anomalies
        mfcc = results.get("mfcc", {})
        all_anomalies.extend(mfcc.get("anomalies", []))
        
        # Noise anomalies
        noise = results.get("noise", {})
        all_anomalies.extend(noise.get("anomalies", []))
        
        # Temporal anomalies
        temporal = results.get("temporal", {})
        all_anomalies.extend(temporal.get("anomalies", []))
        
        # Calculate severity-weighted score
        severity_weights = {
            "high": 1.0,
            "medium": 0.6,
            "low": 0.3
        }
        
        weighted_score = overall_score
        for anomaly in all_anomalies:
            severity = anomaly.get("severity", "low")
            weight = severity_weights.get(severity, 0.3)
            weighted_score += weight * 10
        
        # Normalize to 0-100
        risk_score = min(100, weighted_score)
        
        return round(risk_score, 2)
    
    def _calculate_video_risk(self, results: Dict[str, Any]) -> float:
        """Calculate risk score for video analysis"""
        
        # Get overall score from video analyzer
        overall_score = results.get("overall", 0)
        
        # Get consistency issues
        consistency = results.get("consistency", {})
        consistency_anomalies = consistency.get("anomalies", [])
        
        # Get artifacts
        artifacts = results.get("artifacts", {})
        artifact_list = artifacts.get("artifacts", [])
        
        # Calculate severity-weighted score
        severity_weights = {
            "high": 1.0,
            "medium": 0.6,
            "low": 0.3
        }
        
        weighted_score = overall_score
        
        for anomaly in consistency_anomalies + artifact_list:
            severity = anomaly.get("severity", "low")
            weight = severity_weights.get(severity, 0.3)
            weighted_score += weight * 10
        
        # Normalize to 0-100
        risk_score = min(100, weighted_score)
        
        return round(risk_score, 2)
    
    def _get_risk_level(self, risk_score: float) -> str:
        """Determine risk level based on score"""
        
        if risk_score <= self.risk_thresholds["low"]:
            return "LOW"
        elif risk_score <= self.risk_thresholds["moderate"]:
            return "MODERATE"
        elif risk_score <= self.risk_thresholds["high"]:
            return "HIGH"
        else:
            return "CRITICAL"
    
    def _collect_indicators(self, results: Dict[str, Any], file_type: str) -> List[Dict[str, Any]]:
        """Collect all indicators from analysis results"""
        
        indicators = []
        
        if file_type == "audio":
            # Collect audio indicators
            spectral = results.get("spectral", {})
            for anomaly in spectral.get("anomalies", []):
                indicators.append({
                    "category": "Spectral Analysis",
                    "type": anomaly.get("type", "unknown"),
                    "description": anomaly.get("description", ""),
                    "severity": anomaly.get("severity", "low")
                })
            
            mfcc = results.get("mfcc", {})
            for anomaly in mfcc.get("anomalies", []):
                indicators.append({
                    "category": "MFCC Analysis",
                    "type": anomaly.get("type", "unknown"),
                    "description": anomaly.get("description", ""),
                    "severity": anomaly.get("severity", "low")
                })
            
            noise = results.get("noise", {})
            for anomaly in noise.get("anomalies", []):
                indicators.append({
                    "category": "Noise Analysis",
                    "type": anomaly.get("type", "unknown"),
                    "description": anomaly.get("description", ""),
                    "severity": anomaly.get("severity", "low")
                })
            
            temporal = results.get("temporal", {})
            for anomaly in temporal.get("anomalies", []):
                indicators.append({
                    "category": "Temporal Analysis",
                    "type": anomaly.get("type", "unknown"),
                    "description": anomaly.get("description", ""),
                    "severity": anomaly.get("severity", "low")
                })
        
        else:  # video
            # Collect video indicators
            consistency = results.get("consistency", {})
            for anomaly in consistency.get("anomalies", []):
                indicators.append({
                    "category": "Frame Consistency",
                    "type": anomaly.get("type", "unknown"),
                    "description": anomaly.get("description", ""),
                    "severity": anomaly.get("severity", "low")
                })
            
            artifacts = results.get("artifacts", {})
            for anomaly in artifacts.get("artifacts", []):
                indicators.append({
                    "category": "Artifact Detection",
                    "type": anomaly.get("type", "unknown"),
                    "description": anomaly.get("description", ""),
                    "severity": anomaly.get("severity", "low")
                })
        
        # If no indicators found, add a positive indicator
        if not indicators:
            indicators.append({
                "category": "General",
                "type": "no_anomalies",
                "description": "No significant manipulation indicators detected",
                "severity": "none"
            })
        
        return indicators


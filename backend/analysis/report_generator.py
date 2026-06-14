"""
Report Generator Module
Generates human-readable explanations and recommendations
"""

from typing import Dict, Any, List


class ReportGenerator:
    """Generates analysis reports with explanations and recommendations"""
    
    def __init__(self):
        self.explanations = {
            "LOW": {
                "audio": "The audio analysis shows characteristics consistent with authentic recording. "
                        "Spectral patterns appear natural, with typical variation in frequency content. "
                        "No significant manipulation indicators were detected.",
                "video": "The video analysis shows characteristics consistent with authentic footage. "
                        "Frame consistency and visual patterns appear natural. "
                        "No significant manipulation indicators were detected."
            },
            "MODERATE": {
                "audio": "The audio analysis detected some anomalies that warrant attention. "
                        "Certain spectral characteristics show unusual patterns that could indicate "
                        "processing or manipulation. However, these could also be attributed to "
                        "recording conditions or compression artifacts.",
                "video": "The video analysis detected some inconsistencies in frame patterns. "
                        "There are minor variations in visual characteristics that might indicate "
                        "editing or processing. Further investigation is recommended."
            },
            "HIGH": {
                "audio": "The audio analysis detected multiple indicators of potential manipulation. "
                        "Spectral analysis reveals unusual patterns consistent with synthetic voice "
                        "generation or voice conversion technology. Professional verification is advised.",
                "video": "The video analysis detected significant inconsistencies across frames. "
                        "Multiple artifacts suggest possible deepfake technology or video manipulation. "
                        "High caution is recommended when relying on this content."
            },
            "CRITICAL": {
                "audio": "The audio analysis detected strong indicators of synthetic voice generation. "
                        "Multiple spectral and temporal anomalies are consistent with AI-generated audio. "
                        "This content is highly likely to be manipulated.",
                "video": "The video analysis detected numerous manipulation indicators consistent with "
                        "deepfake technology. Frame inconsistencies, artifact patterns, and visual anomalies "
                        "strongly suggest synthetic content. This content is highly likely to be fake."
            }
        }
        
        self.recommendations_template = {
            "LOW": [
                "Continue exercising normal caution when consuming this content",
                "Verify the source through additional means if important",
                "Share responsibly with appropriate context"
            ],
            "MODERATE": [
                "Exercise caution and verify through additional sources",
                "Cross-check with original or authoritative sources when possible",
                "Consider the context in which the content was shared",
                "Be aware that this content may have been processed"
            ],
            "HIGH": [
                "Treat this content with high skepticism",
                "Do not rely on this content for important decisions",
                "Seek verification from multiple independent sources",
                "Report suspicious content to relevant platforms",
                "Consider consulting with experts if used professionally"
            ],
            "CRITICAL": {
                "audio": [
                    "Do not trust this content for any important purposes",
                    "Assume it is synthetic until proven otherwise",
                    "Report to relevant authorities if used for fraud or deception",
                    "Do not share without appropriate warnings",
                    "Seek professional verification if absolutely necessary"
                ],
                "video": [
                    "Do not trust this content for any important purposes",
                    "Assume it is manipulated until proven otherwise",
                    "Report to relevant platforms if potentially harmful",
                    "Do not share without appropriate warnings about its authenticity",
                    "Consider reporting to authorities if used for fraud or harm"
                ]
            }
        }
    
    def generate_explanation(
        self, 
        risk_result: Dict[str, Any], 
        analysis_results: Dict[str, Any],
        file_type: str
    ) -> str:
        """
        Generate a human-readable explanation of the analysis
        
        Args:
            risk_result: Risk calculation results
            analysis_results: Raw analysis data
            file_type: Type of file analyzed
            
        Returns:
            Human-readable explanation string
        """
        risk_level = risk_result.get("risk_level", "LOW")
        risk_score = risk_result.get("risk_score", 0)
        
        # Get base explanation
        base_explanation = self.explanations.get(risk_level, {}).get(
            file_type, 
            "Analysis completed. Please review the detailed indicators."
        )
        
        # Add indicator summary
        indicators = risk_result.get("indicators", [])
        
        if indicators:
            indicator_summary = self._generate_indicator_summary(indicators)
        else:
            indicator_summary = ""
        
        # Combine into full explanation
        full_explanation = f"{base_explanation}\n\n{indicator_summary}"
        
        return full_explanation
    
    def _generate_indicator_summary(self, indicators: List[Dict[str, Any]]) -> str:
        """Generate a summary of detected indicators"""
        
        if not indicators:
            return "No specific indicators were detected in this analysis."
        
        # Count by severity
        severity_counts = {"high": 0, "medium": 0, "low": 0, "none": 0}
        
        for indicator in indicators:
            severity = indicator.get("severity", "low")
            severity_counts[severity] = severity_counts.get(severity, 0) + 1
        
        summary_parts = []
        
        if severity_counts.get("high", 0) > 0:
            summary_parts.append(f"• {severity_counts['high']} high-severity indicator(s)")
        
        if severity_counts.get("medium", 0) > 0:
            summary_parts.append(f"• {severity_counts['medium']} medium-severity indicator(s)")
        
        if severity_counts.get("low", 0) > 0:
            summary_parts.append(f"• {severity_counts['low']} low-severity observation(s)")
        
        if severity_counts.get("none", 0) > 0:
            summary_parts.append("• No anomalies detected")
        
        return "Detected Indicators:\n" + "\n".join(summary_parts)
    
    def generate_recommendations(self, risk_result: Dict[str, Any]) -> List[str]:
        """
        Generate recommendations based on risk level
        
        Args:
            risk_result: Risk calculation results
            
        Returns:
            List of recommendation strings
        """
        risk_level = risk_result.get("risk_level", "LOW")
        file_type = risk_result.get("file_type", "audio")
        
        # Get recommendations for risk level
        base_recommendations = self.recommendations_template.get(risk_level, [])
        
        # For HIGH and CRITICAL, also get type-specific recommendations
        if risk_level in ["HIGH", "CRITICAL"] and isinstance(base_recommendations, dict):
            type_specific = base_recommendations.get(file_type, [])
            # Combine with general recommendations
            recommendations = type_specific + [
                "Verify through additional independent sources",
                "Exercise extreme caution"
            ]
        else:
            recommendations = base_recommendations if isinstance(base_recommendations, list) else []
        
        return recommendations
    
    def generate_full_report(
        self,
        risk_result: Dict[str, Any],
        analysis_results: Dict[str, Any],
        file_type: str,
        file_name: str
    ) -> Dict[str, Any]:
        """
        Generate a complete analysis report
        
        Args:
            risk_result: Risk calculation results
            analysis_results: Raw analysis data
            file_type: Type of file analyzed
            file_name: Name of analyzed file
            
        Returns:
            Complete report dictionary
        """
        explanation = self.generate_explanation(risk_result, analysis_results, file_type)
        recommendations = self.generate_recommendations(risk_result)
        
        return {
            "file_name": file_name,
            "file_type": file_type,
            "risk_score": risk_result.get("risk_score", 0),
            "risk_level": risk_result.get("risk_level", "UNKNOWN"),
            "explanation": explanation,
            "recommendations": recommendations,
            "indicators": risk_result.get("indicators", []),
            "analysis_details": analysis_results
        }


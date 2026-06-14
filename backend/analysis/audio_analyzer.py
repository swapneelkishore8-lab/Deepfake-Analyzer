"""
Audio Analyzer Module
Analyzes audio files for potential deepfake/manipulation indicators
"""

import os
import numpy as np
import librosa
import soundfile as sf
from typing import Dict, Any, Optional
from scipy import signal
from scipy.stats import entropy


class AudioAnalyzer:
    """Analyzes audio files for manipulation indicators"""
    
    def __init__(self):
        self.sample_rate = 22050
        self.n_mfcc = 13
        self.n_mels = 128
        
    def analyze(self, file_path: str) -> Dict[str, Any]:
        """
        Perform comprehensive audio analysis
        
        Args:
            file_path: Path to audio file
            
        Returns:
            Dictionary containing analysis results
        """
        try:
            # Load audio file
            y, sr = librosa.load(file_path, sr=self.sample_rate)
            
            # Perform various analyses
            spectral_analysis = self._analyze_spectral_features(y, sr)
            mfcc_analysis = self._analyze_mfcc(y, sr)
            noise_analysis = self._analyze_noise_patterns(y, sr)
            consistency_analysis = self._analyze_temporal_consistency(y, sr)
            compression_analysis = self._analyze_compression_artifacts(file_path)
            
            # Combine all results
            results = {
                "spectral": spectral_analysis,
                "mfcc": mfcc_analysis,
                "noise": noise_analysis,
                "temporal": consistency_analysis,
                "compression": compression_analysis,
                "overall": self._calculate_overall_score(
                    spectral_analysis,
                    mfcc_analysis,
                    noise_analysis,
                    consistency_analysis,
                    compression_analysis
                )
            }
            
            return results
            
        except Exception as e:
            return {
                "error": str(e),
                "spectral": {},
                "mfcc": {},
                "noise": {},
                "temporal": {},
                "compression": {},
                "overall": 0
            }
    
    def _analyze_spectral_features(self, y: np.ndarray, sr: int) -> Dict[str, Any]:
        """Analyze spectral features of the audio"""
        
        # Compute STFT
        stft = librosa.stft(y)
        magnitude = np.abs(stft)
        
        # Spectral centroid
        spectral_centroid = librosa.feature.spectral_centroid(y=y, sr=sr)
        
        # Spectral bandwidth
        spectral_bandwidth = librosa.feature.spectral_bandwidth(y=y, sr=sr)
        
        # Spectral rolloff
        spectral_rolloff = librosa.feature.spectral_rolloff(y=y, sr=sr)
        
        # Spectral contrast
        spectral_contrast = librosa.feature.spectral_contrast(y=y, sr=sr)
        
        # Spectral flatness
        spectral_flatness = librosa.feature.spectral_flatness(y=y)
        
        # Zero crossing rate
        zcr = librosa.feature.zero_crossing_rate(y)
        
        # Analyze statistics
        features = {
            "centroid_mean": float(np.mean(spectral_centroid)),
            "centroid_std": float(np.std(spectral_centroid)),
            "bandwidth_mean": float(np.mean(spectral_bandwidth)),
            "rolloff_mean": float(np.mean(spectral_rolloff)),
            "flatness_mean": float(np.mean(spectral_flatness)),
            "zcr_mean": float(np.mean(zcr)),
            "contrast_mean": float(np.mean(spectral_contrast)),
            # Detect anomalies
            "anomalies": self._detect_spectral_anomalies(
                spectral_centroid, spectral_bandwidth, spectral_flatness, zcr
            )
        }
        
        return features
    
    def _detect_spectral_anomalies(
        self, 
        centroid: np.ndarray, 
        bandwidth: np.ndarray, 
        flatness: np.ndarray,
        zcr: np.ndarray
    ) -> list:
        """Detect anomalies in spectral features"""
        anomalies = []
        
        # Check for unusual spectral flatness (possible synthesis)
        if np.mean(flatness) > 0.5:
            anomalies.append({
                "type": "high_spectral_flatness",
                "description": "Unusually high spectral flatness detected - possible synthetic audio",
                "severity": "medium"
            })
        
        # Check for unusual zero crossing patterns
        if np.mean(zcr) > 0.2:
            anomalies.append({
                "type": "high_zero_crossing",
                "description": "Unusually high zero crossing rate - possible digital synthesis",
                "severity": "low"
            })
        
        # Check for very low spectral variation (possible generated)
        if np.std(centroid) < 10:
            anomalies.append({
                "type": "low_spectral_variation",
                "description": "Very low spectral variation - possible AI-generated audio",
                "severity": "high"
            })
        
        return anomalies
    
    def _analyze_mfcc(self, y: np.ndarray, sr: int) -> Dict[str, Any]:
        """Analyze MFCC features"""
        
        # Extract MFCCs
        mfccs = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=self.n_mfcc)
        
        # Extract delta and delta-delta
        mfcc_delta = librosa.feature.delta(mfccs)
        mfcc_delta2 = librosa.feature.delta(mfccs, order=2)
        
        # Calculate statistics for each coefficient
        mfcc_stats = {}
        for i in range(self.n_mfcc):
            mfcc_stats[f"mfcc_{i+1}_mean"] = float(np.mean(mfccs[i]))
            mfcc_stats[f"mfcc_{i+1}_std"] = float(np.std(mfccs[i]))
        
        # Delta statistics
        mfcc_stats["delta_mean"] = float(np.mean(mfcc_delta))
        mfcc_stats["delta_std"] = float(np.std(mfcc_delta))
        
        # Check for MFCC anomalies
        anomalies = self._detect_mfcc_anomalies(mfccs, mfcc_delta)
        
        return {
            "statistics": mfcc_stats,
            "anomalies": anomalies
        }
    
    def _detect_mfcc_anomalies(self, mfccs: np.ndarray, delta: np.ndarray) -> list:
        """Detect anomalies in MFCC patterns"""
        anomalies = []
        
        # Check for unusual MFCC variance
        total_variance = np.sum(np.var(mfccs, axis=1))
        if total_variance < 5:
            anomalies.append({
                "type": "low_mfcc_variance",
                "description": "Unusually low MFCC variance - possible synthetic speech",
                "severity": "medium"
            })
        
        # Check for unnatural delta patterns
        delta_variance = np.var(delta)
        if delta_variance < 0.5:
            anomalies.append({
                "type": "unnatural_transitions",
                "description": "Unnatural MFCC transitions detected",
                "severity": "medium"
            })
        
        return anomalies
    
    def _analyze_noise_patterns(self, y: np.ndarray, sr: int) -> Dict[str, Any]:
        """Analyze noise patterns in the audio"""
        
        # Estimate noise floor
        noise_floor = np.percentile(np.abs(y), 5)
        
        # Signal to noise ratio
        signal_power = np.mean(y**2)
        noise_power = noise_floor**2
        snr = 10 * np.log10(signal_power / (noise_power + 1e-10))
        
        # High frequency content
        high_freq_mask = np.arange(len(y)) > (len(y) * 0.7)
        high_freq_content = np.mean(np.abs(y[high_freq_mask]))
        
        # Analyze background noise characteristics
        # Use silent portions to estimate noise
        frame_length = int(sr * 0.02)  # 20ms frames
        energy = np.array([
            np.mean(y[i:i+frame_length]**2) 
            for i in range(0, len(y)-frame_length, frame_length)
        ])
        
        # Find quiet segments
        quiet_threshold = np.percentile(energy, 20)
        quiet_segments = energy < quiet_threshold
        
        anomalies = []
        
        # Check for digital noise patterns
        if high_freq_content > 0.1:
            anomalies.append({
                "type": "high_frequency_noise",
                "description": "Elevated high-frequency content - possible digital artifact",
                "severity": "low"
            })
        
        # Check for unusual SNR
        if snr < 10:
            anomalies.append({
                "type": "low_snr",
                "description": "Low signal-to-noise ratio - may affect analysis accuracy",
                "severity": "low"
            })
        
        return {
            "noise_floor": float(noise_floor),
            "snr_db": float(snr),
            "high_freq_content": float(high_freq_content),
            "anomalies": anomalies
        }
    
    def _analyze_temporal_consistency(self, y: np.ndarray, sr: int) -> Dict[str, Any]:
        """Analyze temporal consistency of audio"""
        
        # Split into frames
        frame_length = int(sr * 0.025)  # 25ms frames
        hop_length = int(sr * 0.010)    # 10ms hop
        
        frames = librosa.util.frame(y, frame_length=frame_length, hop_length=hop_length)
        
        # Calculate frame energies
        frame_energies = np.array([np.mean(frame**2) for frame in frames.T])
        
        # Analyze energy variation
        energy_cv = np.std(frame_energies) / (np.mean(frame_energies) + 1e-10)
        
        # Pitch consistency (fundamental frequency)
        f0, voiced_flag, voiced_probs = librosa.pyin(
            y, fmin=50, fmax=500, sr=sr
        )
        
        # Filter out unvoiced frames
        f0_voiced = f0[~np.isnan(f0)]
        
        pitch_variance = float(np.var(f0_voiced)) if len(f0_voiced) > 0 else 0
        
        anomalies = []
        
        # Check for unnatural energy patterns
        if energy_cv < 0.1:
            anomalies.append({
                "type": "unnatural_energy_pattern",
                "description": "Very uniform energy distribution - possible synthetic audio",
                "severity": "medium"
            })
        
        if energy_cv > 2.0:
            anomalies.append({
                "type": "extreme_energy_variation",
                "description": "Extreme energy variation detected",
                "severity": "low"
            })
        
        # Check for pitch anomalies
        if pitch_variance < 1.0:
            anomalies.append({
                "type": "monotone_speech",
                "description": "Unnatural pitch consistency - possible voice conversion",
                "severity": "medium"
            })
        
        return {
            "energy_cv": float(energy_cv),
            "pitch_variance": pitch_variance,
            "anomalies": anomalies
        }
    
    def _analyze_compression_artifacts(self, file_path: str) -> Dict[str, Any]:
        """Analyze compression artifacts in audio file"""
        
        file_size = os.path.getsize(file_path)
        file_extension = os.path.splitext(file_path)[1].lower()
        
        # Check file format
        is_compressed = file_extension in ['.mp3', '.m4a', '.flac']
        
        anomalies = []
        
        if is_compressed:
            # Check for MP3-specific artifacts
            if file_extension == '.mp3':
                # Low bitrate indication
                if file_size < 50000:  # Very small file
                    anomalies.append({
                        "type": "low_bitrate",
                        "description": "Possible low bitrate encoding - may affect analysis",
                        "severity": "low"
                    })
        
        return {
            "file_size": file_size,
            "is_compressed": is_compressed,
            "file_format": file_extension,
            "anomalies": anomalies
        }
    
    def _calculate_overall_score(
        self,
        spectral: Dict,
        mfcc: Dict,
        noise: Dict,
        temporal: Dict,
        compression: Dict
    ) -> float:
        """Calculate overall analysis score based on all features"""
        
        # Count anomalies from each category
        anomaly_scores = []
        
        # Spectral anomalies (weight: 0.25)
        spectral_anomalies = spectral.get("anomalies", [])
        spectral_score = len([a for a in spectral_anomalies if a.get("severity") == "high"]) * 0.4 + \
                         len([a for a in spectral_anomalies if a.get("severity") == "medium"]) * 0.2 + \
                         len([a for a in spectral_anomalies if a.get("severity") == "low"]) * 0.1
        anomaly_scores.append(("spectral", spectral_score, 0.25))
        
        # MFCC anomalies (weight: 0.25)
        mfcc_anomalies = mfcc.get("anomalies", [])
        mfcc_score = len([a for a in mfcc_anomalies if a.get("severity") == "high"]) * 0.4 + \
                    len([a for a in mfcc_anomalies if a.get("severity") == "medium"]) * 0.2 + \
                    len([a for a in mfcc_anomalies if a.get("severity") == "low"]) * 0.1
        anomaly_scores.append(("mfcc", mfcc_score, 0.25))
        
        # Noise anomalies (weight: 0.15)
        noise_anomalies = noise.get("anomalies", [])
        noise_score = len([a for a in noise_anomalies if a.get("severity") == "high"]) * 0.4 + \
                     len([a for a in noise_anomalies if a.get("severity") == "medium"]) * 0.2 + \
                     len([a for a in noise_anomalies if a.get("severity") == "low"]) * 0.1
        anomaly_scores.append(("noise", noise_score, 0.15))
        
        # Temporal anomalies (weight: 0.25)
        temporal_anomalies = temporal.get("anomalies", [])
        temporal_score = len([a for a in temporal_anomalies if a.get("severity") == "high"]) * 0.4 + \
                        len([a for a in temporal_anomalies if a.get("severity") == "medium"]) * 0.2 + \
                        len([a for a in temporal_anomalies if a.get("severity") == "low"]) * 0.1
        anomaly_scores.append(("temporal", temporal_score, 0.25))
        
        # Compression (weight: 0.10)
        compression_anomalies = compression.get("anomalies", [])
        compression_score = len([a for a in compression_anomalies]) * 0.1
        anomaly_scores.append(("compression", compression_score, 0.10))
        
        # Calculate weighted score
        total_score = sum(score * weight for _, score, weight in anomaly_scores)
        
        # Normalize to 0-100
        normalized_score = min(100, total_score * 20)
        
        return round(normalized_score, 2)


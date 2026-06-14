import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileAudio, FileVideo, Activity, AlertTriangle, CheckCircle } from 'lucide-react';
import UploadZone from '../components/UI/UploadZone';
import { AnalysisResult } from '../types';
import apiService from '../services/api';

const AnalyzePage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = useCallback((file: File) => {
    setSelectedFile(file);
    setError(null);
  }, []);

  const handleClearFile = useCallback(() => {
    setSelectedFile(null);
    setError(null);
  }, []);

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      const result = await apiService.analyzeMedia(selectedFile);
      
      if (result.error) {
        setError(result.error);
        setIsAnalyzing(false);
        return;
      }

      if (result.data) {
        // Store result in sessionStorage for ResultsPage
        sessionStorage.setItem('analysisResult', JSON.stringify(result.data));
        navigate('/results');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getFileType = (): string => {
    if (!selectedFile) return '';
    return selectedFile.type.startsWith('audio/') ? 'Audio' : 'Video';
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      {/* Background */}
      <div className="fixed inset-0 bg-slate-900 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-900/20 via-slate-900 to-slate-900" />
        <div className="absolute top-40 left-20 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center p-4 bg-primary-500/20 rounded-2xl mb-6">
            {selectedFile ? (
              selectedFile.type.startsWith('audio/') ? (
                <FileAudio className="h-12 w-12 text-primary-400" />
              ) : (
                <FileVideo className="h-12 w-12 text-primary-400" />
              )
            ) : (
              <Upload className="h-12 w-12 text-primary-400" />
            )}
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            {selectedFile ? `Analyze ${getFileType()} File` : 'Upload Media for Analysis'}
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            {selectedFile 
              ? `Ready to analyze "${selectedFile.name}". Click the button below to start.`
              : 'Upload an audio or video file to analyze it for potential deepfake or manipulation indicators.'
            }
          </p>
        </motion.div>

        {/* Upload Zone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <UploadZone
            onFileSelect={handleFileSelect}
            selectedFile={selectedFile}
            onClear={handleClearFile}
            isAnalyzing={isAnalyzing}
          />
        </motion.div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center space-x-3"
            >
              <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0" />
              <p className="text-red-400">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Analyze Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center"
        >
          <button
            onClick={handleAnalyze}
            disabled={!selectedFile || isAnalyzing}
            className={`btn-primary inline-flex items-center space-x-3 text-lg px-8 py-4 ${
              !selectedFile || isAnalyzing ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isAnalyzing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <Activity className="h-5 w-5" />
                <span>Start Analysis</span>
              </>
            )}
          </button>
        </motion.div>

        {/* Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid md:grid-cols-2 gap-6 mt-12"
        >
          <div className="card">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-green-500/20 rounded-xl">
                <CheckCircle className="h-6 w-6 text-green-400" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">What We Analyze</h3>
                <ul className="text-slate-400 text-sm space-y-2">
                  <li>• Spectral patterns and frequency characteristics</li>
                  <li>• Frame consistency and visual artifacts</li>
                  <li>• Audio/video manipulation indicators</li>
                  <li>• Compression artifacts and anomalies</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-yellow-500/20 rounded-xl">
                <AlertTriangle className="h-6 w-6 text-yellow-400" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Important Note</h3>
                <p className="text-slate-400 text-sm">
                  This tool provides a risk assessment based on technical analysis. 
                  It is not a guarantee of authenticity. Always verify important 
                  content through additional means.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Supported Formats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-slate-500 text-sm mb-4">Supported file formats:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {['WAV', 'MP3', 'M4A', 'FLAC', 'MP4', 'AVI', 'MOV', 'WebM'].map((format) => (
              <span
                key={format}
                className="px-3 py-1 bg-slate-800 text-slate-400 text-xs rounded-full border border-slate-700"
              >
                {format}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AnalyzePage;


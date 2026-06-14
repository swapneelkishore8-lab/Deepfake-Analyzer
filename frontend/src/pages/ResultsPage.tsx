import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  FileAudio, 
  FileVideo, 
  AlertTriangle, 
  CheckCircle,
  Info,
  Lightbulb,
  RefreshCw,
  Download,
  Share2
} from 'lucide-react';
import RiskMeter from '../components/UI/RiskMeter';
import { AnalysisResult, RiskLevel, RISK_CONFIG } from '../types';

const ResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState<AnalysisResult | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('analysisResult');
    if (stored) {
      setResult(JSON.parse(stored));
    } else {
      navigate('/analyze');
    }
  }, [navigate]);

  if (!result) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500" />
      </div>
    );
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'text-red-400 bg-red-500/10 border-red-500/30';
      case 'medium':
        return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
      case 'low':
        return 'text-blue-400 bg-blue-500/10 border-blue-500/30';
      default:
        return 'text-green-400 bg-green-500/10 border-green-500/30';
    }
  };

  const getFileIcon = () => {
    return result.file_type === 'audio' ? (
      <FileAudio className="h-6 w-6" />
    ) : (
      <FileVideo className="h-6 w-6" />
    );
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      {/* Background */}
      <div className="fixed inset-0 bg-slate-900 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-900/20 via-slate-900 to-slate-900" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            to="/analyze"
            className="inline-flex items-center space-x-2 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Upload</span>
          </Link>
        </motion.div>

        {/* Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card mb-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-4">
              <div className={`p-4 rounded-2xl ${
                result.risk_level === 'LOW' ? 'bg-green-500/20' :
                result.risk_level === 'MODERATE' ? 'bg-yellow-500/20' :
                result.risk_level === 'HIGH' ? 'bg-red-500/20' : 'bg-red-600/30'
              }`}>
                {result.risk_level === 'LOW' ? (
                  <CheckCircle className="h-8 w-8 text-green-400" />
                ) : (
                  <AlertTriangle className={`h-8 w-8 ${
                    result.risk_level === 'MODERATE' ? 'text-yellow-400' : 'text-red-400'
                  }`} />
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  Analysis Complete
                </h1>
                <p className="text-slate-400 flex items-center space-x-2">
                  {getFileIcon()}
                  <span>{result.file_type === 'audio' ? 'Audio' : 'Video'} Analysis</span>
                  <span className="text-slate-600">•</span>
                  <span>{formatDate(result.timestamp)}</span>
                </p>
              </div>
            </div>

            <div className="flex space-x-3">
              <button className="btn-secondary flex items-center space-x-2">
                <RefreshCw className="h-4 w-4" />
                <span>Analyze Another</span>
              </button>
              <button className="btn-secondary flex items-center space-x-2">
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Risk Score Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card mb-8"
        >
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
            <RiskMeter score={result.risk_score} level={result.risk_level} size="lg" />
            
            <div className="flex-1 max-w-xl">
              <h2 className="text-xl font-semibold text-white mb-4">Analysis Summary</h2>
              <div className="prose prose-invert prose-sm">
                {result.explanation.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="text-slate-300 mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Indicators Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card mb-8"
        >
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center space-x-2">
            <Info className="h-5 w-5 text-primary-400" />
            <span>Detected Indicators</span>
          </h2>
          
          {result.indicators.length === 0 || result.indicators[0].severity === 'none' ? (
            <div className="flex items-center space-x-4 p-6 bg-green-500/10 rounded-xl border border-green-500/30">
              <CheckCircle className="h-6 w-6 text-green-400" />
              <div>
                <p className="text-green-400 font-medium">No Anomalies Detected</p>
                <p className="text-slate-400 text-sm">The analysis did not find any significant manipulation indicators.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {result.indicators.map((indicator, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border ${getSeverityColor(indicator.severity)}`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium capitalize">{indicator.type.replace(/_/g, ' ')}</p>
                      <p className="text-sm opacity-80 mt-1">{indicator.description}</p>
                    </div>
                    <span className="text-xs font-medium uppercase px-2 py-1 rounded bg-black/20">
                      {indicator.severity}
                    </span>
                  </div>
                  <p className="text-xs opacity-60 mt-2">Category: {indicator.category}</p>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Recommendations Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card mb-8"
        >
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center space-x-2">
            <Lightbulb className="h-5 w-5 text-yellow-400" />
            <span>Recommendations</span>
          </h2>
          
          <ul className="space-y-3">
            {result.recommendations.map((rec, idx) => (
              <li key={idx} className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-primary-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary-400 text-sm font-medium">{idx + 1}</span>
                </div>
                <p className="text-slate-300">{rec}</p>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-slate-800/50 rounded-xl p-6 border border-slate-700"
        >
          <div className="flex items-start space-x-4">
            <Info className="h-5 w-5 text-slate-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-white font-medium mb-2">Important Disclaimer</h3>
              <p className="text-slate-400 text-sm">
                This analysis is based on technical indicators and machine learning algorithms. 
                It provides a risk assessment, not a definitive verdict on authenticity. 
                Always consider multiple factors and verify important content through additional means. 
                This tool should be used as one component of a broader media literacy approach.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ResultsPage;


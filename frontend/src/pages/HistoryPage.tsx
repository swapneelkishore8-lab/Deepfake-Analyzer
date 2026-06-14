import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { History, FileAudio, FileVideo, Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import { AnalysisHistory, RiskLevel, RISK_CONFIG } from '../types';

const HistoryPage: React.FC = () => {
  const [history, setHistory] = useState<AnalysisHistory[]>([]);

  useEffect(() => {
    // Load history from localStorage
    const stored = localStorage.getItem('analysisHistory');
    if (stored) {
      setHistory(JSON.parse(stored));
    }
  }, []);

  const getRiskColor = (level: RiskLevel) => {
    switch (level) {
      case 'LOW':
        return 'text-green-400 bg-green-500/10 border-green-500/30';
      case 'MODERATE':
        return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
      case 'HIGH':
        return 'text-red-400 bg-red-500/10 border-red-500/30';
      case 'CRITICAL':
        return 'text-red-600 bg-red-600/20 border-red-600/40';
      default:
        return 'text-slate-400 bg-slate-500/10 border-slate-500/30';
    }
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      {/* Background */}
      <div className="fixed inset-0 bg-slate-900 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-900/20 via-slate-900 to-slate-900" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-primary-500/20 rounded-xl">
              <History className="h-8 w-8 text-primary-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Analysis History</h1>
              <p className="text-slate-400">View your past media analysis results</p>
            </div>
          </div>
        </motion.div>

        {/* History List */}
        {history.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card text-center py-16"
          >
            <div className="w-20 h-20 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-6">
              <History className="h-10 w-10 text-slate-500" />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">No Analysis History</h2>
            <p className="text-slate-400 mb-6">
              You haven't analyzed any media yet. Start by analyzing your first audio or video file.
            </p>
            <Link to="/analyze" className="btn-primary inline-flex items-center space-x-2">
              <span>Start Analysis</span>
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {history.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card hover:border-primary-500/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-xl ${
                      item.fileType === 'audio' ? 'bg-primary-500/20' : 'bg-cyan-500/20'
                    }`}>
                      {item.fileType === 'audio' ? (
                        <FileAudio className="h-6 w-6 text-primary-400" />
                      ) : (
                        <FileVideo className="h-6 w-6 text-cyan-400" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{item.fileName}</h3>
                      <div className="flex items-center space-x-3 text-sm text-slate-400">
                        <span className="flex items-center space-x-1">
                          {item.fileType === 'audio' ? (
                            <FileAudio className="h-3 w-3" />
                          ) : (
                            <FileVideo className="h-3 w-3" />
                          )}
                          <span className="capitalize">{item.fileType}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{formatDate(item.timestamp)}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-2xl font-bold text-white">{item.riskScore}%</p>
                    </div>
                    <div className={`px-4 py-2 rounded-lg border flex items-center space-x-2 ${getRiskColor(item.riskLevel)}`}>
                      {item.riskLevel === 'LOW' ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <AlertTriangle className="h-4 w-4" />
                      )}
                      <span className="font-medium">{item.riskLevel}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;


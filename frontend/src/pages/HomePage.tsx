import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Activity, 
  FileAudio, 
  FileVideo, 
  Brain, 
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Play,
  Mic,
  Video
} from 'lucide-react';

const HomePage: React.FC = () => {
  const features = [
    {
      icon: FileAudio,
      title: 'Audio Analysis',
      description: 'Advanced spectral analysis to detect synthetic voice patterns and audio manipulation'
    },
    {
      icon: FileVideo,
      title: 'Video Analysis',
      description: 'Frame-by-frame examination to identify visual inconsistencies and deepfake artifacts'
    },
    {
      icon: Brain,
      title: 'AI-Powered',
      description: 'Machine learning algorithms trained on thousands of authentic and synthetic samples'
    },
    {
      icon: AlertTriangle,
      title: 'Risk Assessment',
      description: 'Clear risk scores and detailed indicators to help you make informed decisions'
    }
  ];

  const howItWorks = [
    {
      step: 1,
      title: 'Upload Media',
      description: 'Drag and drop your audio or video file',
      icon: Play
    },
    {
      step: 2,
      title: 'AI Analysis',
      description: 'Our algorithms examine the content for manipulation markers',
      icon: Activity
    },
    {
      step: 3,
      title: 'Get Results',
      description: 'Receive a comprehensive risk assessment report',
      icon: Shield
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-slate-900">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 via-slate-900 to-cyan-900/20" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMDI5MzciIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center space-x-2 bg-primary-500/10 border border-primary-500/20 rounded-full px-4 py-2 mb-6">
                <Shield className="h-4 w-4 text-primary-400" />
                <span className="text-primary-400 text-sm font-medium">AI-Powered Protection</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Detect Deepfake
                <span className="block bg-gradient-to-r from-primary-400 to-cyan-400 bg-clip-text text-transparent">
                  Scam Risk
                </span>
              </h1>
              
              <p className="text-xl text-slate-300 mb-8 max-w-lg">
                Upload audio or video content and get an instant AI-powered analysis 
                to identify potential manipulation and deepfake threats.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/analyze"
                  className="btn-primary inline-flex items-center justify-center space-x-2 text-lg"
                >
                  <Activity className="h-5 w-5" />
                  <span>Start Analysis</span>
                </Link>
                <Link
                  to="/learn"
                  className="btn-secondary inline-flex items-center justify-center space-x-2 text-lg"
                >
                  <Play className="h-5 w-5" />
                  <span>Learn More</span>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-slate-700">
                <div>
                  <p className="text-3xl font-bold text-white">99%</p>
                  <p className="text-slate-400 text-sm">Accuracy</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-white">50K+</p>
                  <p className="text-slate-400 text-sm">Analyses</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-white">{"<2min"}</p>
                  <p className="text-slate-400 text-sm">Avg. Time</p>
                </div>
              </div>
            </motion.div>

            {/* Right Content - Hero Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* Main Card */}
              <div className="relative bg-slate-800/80 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50 shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-primary-500/20 rounded-xl">
                      <Shield className="h-8 w-8 text-primary-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Deepfake Analyzer</h3>
                      <p className="text-slate-400 text-sm">Risk Assessment</p>
                    </div>
                  </div>
                  <div className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium">
                    Active
                  </div>
                </div>

                {/* Demo Visualization */}
                <div className="space-y-6">
                  {/* Waveform Animation */}
                  <div className="h-24 bg-slate-900/50 rounded-xl p-4 flex items-center justify-center">
                    <div className="flex items-end space-x-1 h-16">
                      {[...Array(20)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-1 bg-gradient-to-t from-primary-500 to-cyan-400 rounded-full"
                          animate={{
                            height: [20, Math.random() * 60 + 20, 20]
                          }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: i * 0.05
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Risk Meter Preview */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                        <CheckCircle className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-semibold">LOW RISK</p>
                        <p className="text-slate-400 text-sm">12% Confidence</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-400">Authentic</p>
                      <p className="text-slate-400 text-sm">No anomalies detected</p>
                    </div>
                  </div>
                </div>

                {/* Floating Icons */}
                <motion.div
                  className="absolute -top-6 -right-6 p-4 bg-slate-800 rounded-2xl shadow-xl border border-slate-700"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Mic className="h-6 w-6 text-primary-400" />
                </motion.div>

                <motion.div
                  className="absolute -bottom-6 -left-6 p-4 bg-slate-800 rounded-2xl shadow-xl border border-slate-700"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Video className="h-6 w-6 text-cyan-400" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Advanced Detection Technology
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Our cutting-edge algorithms analyze multiple dimensions of your media 
              to provide comprehensive risk assessments.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="card group hover:border-primary-500/50 transition-all"
                >
                  <div className="p-4 bg-primary-500/10 rounded-xl mb-4 w-fit group-hover:bg-primary-500/20 transition-colors">
                    <Icon className="h-8 w-8 text-primary-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Get a comprehensive risk analysis in just three simple steps
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {howItWorks.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="relative"
                >
                  <div className="card text-center">
                    <div className="w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <span className="text-2xl font-bold text-primary-400">{step.step}</span>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-primary-500/20 to-cyan-500/20 rounded-xl w-fit mx-auto mb-4">
                      <Icon className="h-8 w-8 text-primary-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-slate-400">
                      {step.description}
                    </p>
                  </div>
                  
                  {index < howItWorks.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <ArrowRight className="h-8 w-8 text-slate-600" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="card text-center relative overflow-hidden"
          >
            {/* Background Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-cyan-500/10" />
            
            <div className="relative">
              <h2 className="text-4xl font-bold text-white mb-4">
                Ready to Analyze Your Media?
              </h2>
              <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
                Protect yourself from deepfake scams and manipulated media. 
                Get instant analysis and make informed decisions.
              </p>
              <Link
                to="/analyze"
                className="btn-primary inline-flex items-center space-x-2 text-lg"
              >
                <Activity className="h-5 w-5" />
                <span>Start Free Analysis</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;


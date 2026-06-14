import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Eye, 
  Mic, 
  Video,
  Brain,
  Lock,
  Users,
  Smartphone,
  Mail,
  ArrowRight
} from 'lucide-react';

const LearnPage: React.FC = () => {
  const topics = [
    {
      icon: Eye,
      title: 'What Are Deepfakes?',
      description: 'Learn about synthetic media and how AI is used to create realistic but fake audio and video content.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Mic,
      title: 'Voice Deepfakes',
      description: 'Understand how voice cloning technology works and its potential for audio-based scams.',
      color: 'from-blue500 to-cyan-500'
    },
    {
      icon: Video,
      title: 'Video Manipulation',
      description: 'Discover the techniques used to create fake videos and how to spot them.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: AlertTriangle,
      title: 'Common Scams',
      description: 'Learn about the most prevalent deepfake scams including voice phishing and impersonation.',
      color: 'from-red-500 to-orange-500'
    },
    {
      icon: Shield,
      title: 'Detection Methods',
      description: 'Explore the technical approaches used to identify manipulated media.',
      color: 'from-primary-500 to-cyan-500'
    },
    {
      icon: Lock,
      title: 'Protection Tips',
      description: 'Best practices to protect yourself from deepfake-based fraud and misinformation.',
      color: 'from-yellow-500 to-amber-500'
    }
  ];

  const redFlags = [
    'Unnatural blinking or eye movement',
    'Inconsistent lighting or shadows',
    'Audio that doesn\'t match lip movements',
    'Unusual facial expressions or asymmetries',
    'Blurry edges around the face',
    'Inconsistent background or audio quality',
    'Emotions that seem delayed or unnatural',
    'Missing reflection in eyes'
  ];

  const protectionSteps = [
    {
      title: 'Verify the Source',
      description: 'Always check if the content comes from a trusted and verifiable source.'
    },
    {
      title: 'Cross-Reference',
      description: 'Look for the same information from multiple independent sources.'
    },
    {
      title: 'Use Detection Tools',
      description: 'Employ AI-powered analysis tools to check for manipulation indicators.'
    },
    {
      title: 'Be Skeptical',
      description: 'Be especially cautious of urgent requests or emotionally charged content.'
    },
    {
      title: 'Protect Your Data',
      description: 'Limit the amount of voice and video data you share online.'
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-12">
      {/* Background */}
      <div className="fixed inset-0 bg-slate-900 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-900/20 via-slate-900 to-slate-900" />
        <div className="absolute top-40 left-20 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-4 bg-primary-500/20 rounded-2xl mb-6">
            <BookOpen className="h-12 w-12 text-primary-400" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Learn About Deepfakes
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Understand the threat, learn detection methods, and protect yourself from AI-powered deception.
          </p>
        </motion.div>

        {/* Topics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {topics.map((topic, index) => {
            const Icon = topic.icon;
            return (
              <div
                key={topic.title}
                className="card hover:border-primary-500/50 transition-all cursor-pointer group"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${topic.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {topic.title}
                </h3>
                <p className="text-slate-400">
                  {topic.description}
                </p>
              </div>
            );
          })}
        </motion.div>

        {/* Red Flags Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card mb-16"
        >
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-3 bg-red-500/20 rounded-xl">
              <AlertTriangle className="h-6 w-6 text-red-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Red Flags to Watch For</h2>
              <p className="text-slate-400">Common indicators of manipulated video content</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {redFlags.map((flag, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 p-4 bg-slate-700/50 rounded-xl"
              >
                <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                <p className="text-slate-300">{flag}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Protection Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card mb-16"
        >
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-3 bg-green-500/20 rounded-xl">
              <Shield className="h-6 w-6 text-green-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">How to Protect Yourself</h2>
              <p className="text-slate-400">Essential steps to stay safe from deepfake scams</p>
            </div>
          </div>

          <div className="space-y-4">
            {protectionSteps.map((step, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 p-4 bg-slate-700/50 rounded-xl"
              >
                <div className="w-8 h-8 bg-primary-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-primary-400 font-semibold">{index + 1}</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">{step.title}</h3>
                  <p className="text-slate-400 text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid md:grid-cols-3 gap-6 mb-16"
        >
          <div className="card text-center">
            <div className="text-4xl font-bold text-primary-400 mb-2">95%</div>
            <p className="text-slate-400">Increase in deepfake attacks in 2023</p>
          </div>
          <div className="card text-center">
            <div className="text-4xl font-bold text-cyan-400 mb-2">$500M+</div>
            <p className="text-slate-400">Lost to voice cloning scams</p>
          </div>
          <div className="card text-center">
            <div className="text-4xl font-bold text-green-400 mb-2">1 in 4</div>
            <p className="text-slate-400">People exposed to deepfake content</p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <div className="card inline-block">
            <h2 className="text-2xl font-bold text-white mb-4">
              Ready to Analyze Media?
            </h2>
            <p className="text-slate-400 mb-6 max-w-md">
              Use our AI-powered tool to analyze audio and video files for potential deepfake indicators.
            </p>
            <Link
              to="/analyze"
              className="btn-primary inline-flex items-center space-x-2"
            >
              <span>Start Analysis</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LearnPage;


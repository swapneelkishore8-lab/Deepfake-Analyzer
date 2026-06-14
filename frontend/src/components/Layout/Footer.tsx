import React from 'react';
import { Shield, Github, Twitter, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="h-8 w-8 text-primary-500" />
              <div>
                <span className="text-lg font-bold text-white">DeepFake</span>
                <span className="text-sm text-primary-400 block">Risk Analyzer</span>
              </div>
            </div>
            <p className="text-slate-400 max-w-md">
              AI-Powered analysis tool to detect manipulated voice and video content. 
              Make informed decisions about the authenticity of media you encounter.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-slate-400 hover:text-primary-400 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/analyze" className="text-slate-400 hover:text-primary-400 transition-colors">
                  Analyze Media
                </a>
              </li>
              <li>
                <a href="/history" className="text-slate-400 hover:text-primary-400 transition-colors">
                  Analysis History
                </a>
              </li>
              <li>
                <a href="/learn" className="text-slate-400 hover:text-primary-400 transition-colors">
                  Learn More
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a href="/learn" className="text-slate-400 hover:text-primary-400 transition-colors">
                  About Deepfakes
                </a>
              </li>
              <li>
                <a href="/learn" className="text-slate-400 hover:text-primary-400 transition-colors">
                  Detection Methods
                </a>
              </li>
              <li>
                <a href="/learn" className="text-slate-400 hover:text-primary-400 transition-colors">
                  Safety Tips
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-primary-400 transition-colors">
                  API Documentation
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-500 text-sm">
            © 2024 Deepfake Scam Risk Analyzer. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-slate-400 hover:text-primary-400 transition-colors">
              <Github className="h-5 w-5" />
            </a>
            <a href="#" className="text-slate-400 hover:text-primary-400 transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-slate-400 hover:text-primary-400 transition-colors">
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


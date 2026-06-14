import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Activity, History, BookOpen, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Shield },
    { path: '/analyze', label: 'Analyze', icon: Activity },
    { path: '/history', label: 'History', icon: History },
    { path: '/learn', label: 'Learn', icon: BookOpen },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <Shield className="h-10 w-10 text-primary-500 group-hover:text-primary-400 transition-colors" />
              <div className="absolute inset-0 bg-primary-500/20 blur-xl group-hover:bg-primary-400/30 transition-all" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-white">DeepFake</span>
              <span className="text-xs text-primary-400 -mt-1">Risk Analyzer</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive(item.path)
                      ? 'bg-primary-500/20 text-primary-400'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              to="/analyze"
              className="btn-primary flex items-center space-x-2"
            >
              <Activity className="h-4 w-4" />
              <span>Start Analysis</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-700">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                      isActive(item.path)
                        ? 'bg-primary-500/20 text-primary-400'
                        : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
              <Link
                to="/analyze"
                onClick={() => setIsMenuOpen(false)}
                className="btn-primary mt-4 flex items-center justify-center space-x-2"
              >
                <Activity className="h-4 w-4" />
                <span>Start Analysis</span>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;


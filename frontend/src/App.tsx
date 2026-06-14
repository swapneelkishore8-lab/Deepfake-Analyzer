import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import HomePage from './pages/HomePage';
import AnalyzePage from './pages/AnalyzePage';
import ResultsPage from './pages/ResultsPage';
import HistoryPage from './pages/HistoryPage';
import LearnPage from './pages/LearnPage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-slate-900 flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/analyze" element={<AnalyzePage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/learn" element={<LearnPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;


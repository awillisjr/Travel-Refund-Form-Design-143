import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RefundRequestPage from './pages/RefundRequestPage';
import EmailSetupGuide from './components/EmailSetupGuide';
import SafeIcon from './common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import './App.css';

const { FiSettings, FiArrowLeft } = FiIcons;

function App() {
  const [showSetupGuide, setShowSetupGuide] = useState(false);
  
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Dev Tools */}
        <div className="fixed top-4 right-4 z-50">
          <button 
            onClick={() => setShowSetupGuide(!showSetupGuide)}
            className="bg-white shadow-md rounded-lg p-2 flex items-center gap-2 text-sm border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <SafeIcon icon={showSetupGuide ? FiArrowLeft : FiSettings} className="text-blue-600" />
            <span>{showSetupGuide ? 'Back to Form' : 'Setup Guide'}</span>
          </button>
        </div>
        
        {/* Environment Banner */}
        <div className="bg-blue-600 text-white text-center text-xs py-1">
          Running in development mode - Email service is simulated
        </div>
        
        {showSetupGuide ? (
          <div className="p-4 md:p-8">
            <EmailSetupGuide />
          </div>
        ) : (
          <Routes>
            <Route path="/" element={<RefundRequestPage />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
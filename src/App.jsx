import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import RefundRequestPage from './pages/RefundRequestPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Routes>
          <Route path="/" element={<RefundRequestPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';
import Calculator from './components/Calculator';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="App">
          <header className="App-header">
            <Routes>
              <Route path="/calculator" element={<Calculator />} />
              <Route path="/" element={<div>Welcome to the App! Go to <a href="/calculator">Calculator</a></div>} />
            </Routes>
          </header>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;

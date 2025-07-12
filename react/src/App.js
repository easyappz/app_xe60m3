import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Calculator from './components/Calculator';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/" element={
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
              <h1>Welcome to the Calculator App</h1>
              <p>Navigate to <a href="/calculator">Calculator</a> to start calculating.</p>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

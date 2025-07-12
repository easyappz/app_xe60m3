import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import logo from './logo.svg';
import ErrorBoundary from './ErrorBoundary';
import Calculator from './components/Calculator';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Шаблон React успешно развернут, <br />
              Ждите обновлений от AI :)
            </p>
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

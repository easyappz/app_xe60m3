import React from 'react';
import ErrorBoundary from './ErrorBoundary';
import Calculator from './components/Calculator';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <div className="App">
        <header className="App-header">
          <Calculator />
        </header>
      </div>
    </ErrorBoundary>
  );
}

export default App;

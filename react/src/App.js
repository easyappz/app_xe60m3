import logo from './logo.svg';
import ErrorBoundary from './ErrorBoundary';
import Calculator from './components/Calculator';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Шаблон React успешно развернут, <br />
            Ждите обновлений от AI :)
          </p>
          <Calculator />
        </header>
      </div>
    </ErrorBoundary>
  );
}

export default App;

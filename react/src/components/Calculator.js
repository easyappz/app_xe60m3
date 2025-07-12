import React, { useState } from 'react';
import { Grid, Button, Paper, Typography } from '@mui/material';
import './Calculator.css';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  const handleDigitClick = (digit) => {
    if (display === '0' && digit !== '.') {
      setDisplay(digit);
    } else {
      setDisplay(display + digit);
    }
    setWaitingForSecondOperand(false);
  };

  const handleOperationClick = (op) => {
    setPreviousValue(parseFloat(display));
    setOperation(op);
    setWaitingForSecondOperand(true);
    setDisplay('0');
  };

  const handleEqualClick = async () => {
    if (!previousValue || !operation) return;

    const currentValue = parseFloat(display);
    let result = 0;

    switch (operation) {
      case '+':
        result = previousValue + currentValue;
        break;
      case '-':
        result = previousValue - currentValue;
        break;
      case '*':
        result = previousValue * currentValue;
        break;
      case '/':
        if (currentValue === 0) {
          setDisplay('Error');
          return;
        }
        result = previousValue / currentValue;
        break;
      default:
        return;
    }

    try {
      const response = await fetch('/api/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          num1: previousValue,
          num2: currentValue,
          operation,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setDisplay(data.result.toString());
      } else {
        setDisplay('Error');
      }
    } catch (error) {
      setDisplay(result.toString()); // Fallback to client-side calculation if server fails
    }

    setPreviousValue(null);
    setOperation(null);
    setWaitingForSecondOperand(false);
  };

  const handleClearClick = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForSecondOperand(false);
  };

  const handleBackspaceClick = () => {
    if (display.length === 1 || (display.length === 2 && display.startsWith('-'))) {
      setDisplay('0');
    } else {
      setDisplay(display.slice(0, -1));
    }
  };

  const buttons = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', 'C', '+',
    '⌫', '='
  ];

  return (
    <Paper elevation={3} className="calculator-container">
      <Typography variant="h4" className="calculator-display">
        {display}
      </Typography>
      <Grid container spacing={1} className="calculator-grid">
        {buttons.map((btn) => (
          <Grid item xs={3} key={btn}>
            <Button
              variant="contained"
              fullWidth
              className={`calculator-button ${
                ['+', '-', '*', '/'].includes(btn) ? 'operation-button' : ''
              } ${btn === '=' ? 'equals-button' : ''}`}
              onClick={() => {
                if (btn === 'C') handleClearClick();
                else if (btn === '⌫') handleBackspaceClick();
                else if (btn === '=') handleEqualClick();
                else if (['+', '-', '*', '/'].includes(btn)) handleOperationClick(btn);
                else handleDigitClick(btn);
              }}
            >
              {btn}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default Calculator;

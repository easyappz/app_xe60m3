import React, { useState } from 'react';
import { Grid, Button, TextField, Box, Paper, Typography } from '@mui/material';
import './Calculator.css';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [operation, setOperation] = useState(null);
  const [previousValue, setPreviousValue] = useState(null);
  const [waitingForSecondValue, setWaitingForSecondValue] = useState(false);

  const handleNumberClick = (value) => {
    if (display === '0' && value !== '.') {
      setDisplay(value);
    } else {
      setDisplay(display + value);
    }
    setWaitingForSecondValue(false);
  };

  const handleOperationClick = (op) => {
    setPreviousValue(parseFloat(display));
    setOperation(op);
    setWaitingForSecondValue(true);
    setDisplay('0');
  };

  const handleEqualsClick = async () => {
    if (!operation || previousValue === null) return;

    const currentValue = parseFloat(display);
    let result;

    try {
      const response = await fetch('/api/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          value1: previousValue,
          value2: currentValue,
          operation: operation,
        }),
      });

      if (!response.ok) {
        throw new Error('Calculation error');
      }

      const data = await response.json();
      result = data.result;
      setDisplay(result.toString());
    } catch (error) {
      setDisplay('Error');
    }

    setOperation(null);
    setPreviousValue(null);
    setWaitingForSecondValue(false);
  };

  const handleClearClick = () => {
    setDisplay('0');
    setOperation(null);
    setPreviousValue(null);
    setWaitingForSecondValue(false);
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
    <Box className="calculator-container">
      <Paper elevation={3} className="calculator-paper">
        <TextField
          className="calculator-display"
          value={display}
          variant="outlined"
          fullWidth
          disabled
          inputProps={{
            style: { textAlign: 'right', fontSize: '2rem' },
          }}
        />
        <Grid container spacing={1} className="calculator-buttons">
          {buttons.map((btn) => (
            <Grid item xs={3} key={btn}>
              <Button
                variant={btn === '=' ? 'contained' : 'outlined'}
                color={['+', '-', '*', '/'].includes(btn) ? 'secondary' : btn === '=' ? 'primary' : 'default'}
                fullWidth
                className="calculator-button"
                onClick={() => {
                  if (btn === 'C') handleClearClick();
                  else if (btn === '⌫') handleBackspaceClick();
                  else if (btn === '=') handleEqualsClick();
                  else if (['+', '-', '*', '/'].includes(btn)) handleOperationClick(btn);
                  else handleNumberClick(btn);
                }}
              >
                <Typography variant="h6">{btn}</Typography>
              </Button>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
};

export default Calculator;

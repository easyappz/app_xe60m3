const express = require('express');

/**
 * Пример создания модели в базу данных
 */
// const mongoose = require('mongoose');
// const db = require('/db');

// const MongoTestSchema = new mongoose.Schema({
//   value: { type: String, required: true },
// });

// const MongoModelTest = db.mongoDb.model('Test', MongoTestSchema);

// const newTest = new MongoModelTest({
//   value: 'test-value',
// });

// newTest.save();

const router = express.Router();

// GET /api/hello
router.get('/hello', (req, res) => {
  res.json({ message: 'Hello from API!' });
});

// GET /api/status
router.get('/status', (req, res) => {
  res.json({ 
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

// POST /api/calculate
router.post('/calculate', (req, res) => {
  try {
    const { expression } = req.body;

    if (!expression || typeof expression !== 'string') {
      return res.status(400).json({ error: 'Expression is required and must be a string' });
    }

    // Split the expression into parts to extract numbers and operator
    // We assume the format is 'number operator number' (e.g., '2+3')
    let operator = '';
    let numbers = [];

    if (expression.includes('+')) {
      operator = '+';
      numbers = expression.split('+').map(num => num.trim());
    } else if (expression.includes('-')) {
      operator = '-';
      numbers = expression.split('-').map(num => num.trim());
    } else if (expression.includes('*')) {
      operator = '*';
      numbers = expression.split('*').map(num => num.trim());
    } else if (expression.includes('/')) {
      operator = '/';
      numbers = expression.split('/').map(num => num.trim());
    } else {
      return res.status(400).json({ error: 'Unsupported operator. Use +, -, *, or /' });
    }

    if (numbers.length !== 2) {
      return res.status(400).json({ error: 'Invalid expression format. Use format like "2+3"' });
    }

    const value1 = parseFloat(numbers[0]);
    const value2 = parseFloat(numbers[1]);

    if (isNaN(value1) || isNaN(value2)) {
      return res.status(400).json({ error: 'Invalid numbers in expression' });
    }

    let result;
    if (operator === '+') {
      result = value1 + value2;
    } else if (operator === '-') {
      result = value1 - value2;
    } else if (operator === '*') {
      result = value1 * value2;
    } else if (operator === '/') {
      if (value2 === 0) {
        return res.status(400).json({ error: 'Division by zero is not allowed' });
      }
      result = value1 / value2;
    }

    res.json({ result, expression });
  } catch (error) {
    console.error('Calculation error:', error);
    res.status(500).json({ error: 'Server error during calculation' });
  }
});

module.exports = router;

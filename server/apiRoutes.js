const express = require('express');

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
  const { value1, value2, operation } = req.body;

  if (!value1 || !value2 || !operation) {
    return res.status(400).json({ error: 'Missing parameters' });
  }

  let result;
  if (operation === '+') {
    result = value1 + value2;
  } else if (operation === '-') {
    result = value1 - value2;
  } else if (operation === '*') {
    result = value1 * value2;
  } else if (operation === '/') {
    if (value2 === 0) {
      return res.status(400).json({ error: 'Division by zero' });
    }
    result = value1 / value2;
  } else {
    return res.status(400).json({ error: 'Invalid operation' });
  }

  res.json({ result });
});

module.exports = router;

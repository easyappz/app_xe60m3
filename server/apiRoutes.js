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
    const { value1, value2, operation } = req.body;

    if (!value1 || !value2 || !operation) {
      return res.status(400).json({ error: 'Missing required parameters' });
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
        return res.status(400).json({ error: 'Division by zero is not allowed' });
      }
      result = value1 / value2;
    } else {
      return res.status(400).json({ error: 'Invalid operation' });
    }

    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: 'Server error during calculation' });
  }
});

module.exports = router;

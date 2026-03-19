const express = require('express');
const router = express.Router();
const Question = require('../models/Question');
const { protect } = require('../middleware/auth');

// @route GET /api/question/today
// @access Protected
router.get('/today', protect, async (req, res) => {
    try {
        const question = await Question.findOne({ isActive: true });
        if (!question) {
            return res.status(404).json({ message: 'No active question for today' });
        }
        res.json(question);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// @route GET /api/question/history
// @access Protected
router.get('/history', protect, async (req, res) => {
    try {
        const questions = await Question.find().sort({ date: -1 });
        res.json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;

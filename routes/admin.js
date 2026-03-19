const express = require('express');
const router = express.Router();
const Question = require('../models/Question');
const { protect } = require('../middleware/auth');
const { adminOnly } = require('../middleware/adminOnly');

// @route POST /api/admin/question
// @access Admin only
router.post('/question', protect, adminOnly, async (req, res) => {
    const { topic, title, description, leetcodeLink } = req.body;

    if (!topic || !title || !description) {
        return res.status(400).json({ message: 'Please provide topic, title, and description' });
    }

    try {
        // Deactivate all previous active questions
        await Question.updateMany({ isActive: true }, { isActive: false });

        const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

        const question = await Question.create({
            topic,
            title,
            description,
            leetcodeLink: leetcodeLink || '',
            date: today,
            isActive: true,
        });

        res.status(201).json({ message: 'Question added successfully', question });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route GET /api/admin/questions
// @access Admin only - get all questions (history)
router.get('/questions', protect, adminOnly, async (req, res) => {
    try {
        const questions = await Question.find().sort({ createdAt: -1 });
        res.json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;

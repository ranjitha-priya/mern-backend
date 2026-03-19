const express = require('express');
const router = express.Router();
const Submission = require('../models/Submission');
const { protect } = require('../middleware/auth');

// @route POST /api/submissions
// @access Protected
router.post('/', protect, async (req, res) => {
    const { questionId, code, timeComplexity, spaceComplexity } = req.body;

    if (!questionId || !code || !timeComplexity || !spaceComplexity) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const submission = await Submission.create({
            userId: req.user._id,
            questionId,
            code,
            timeComplexity,
            spaceComplexity,
        });

        const populated = await submission.populate('userId', 'name email');
        res.status(201).json({ message: 'Submission successful', submission: populated });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route GET /api/submissions/:questionId
// @access Protected
router.get('/:questionId', protect, async (req, res) => {
    try {
        const submissions = await Submission.find({ questionId: req.params.questionId })
            .populate('userId', 'name email')
            .sort({ createdAt: -1 });

        res.json(submissions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route GET /api/submissions/user/me
// @access Protected
router.get('/user/me', protect, async (req, res) => {
    try {
        const submissions = await Submission.find({ userId: req.user._id })
            .populate('questionId', 'topic title date')
            .sort({ createdAt: -1 });
            
        res.json(submissions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;

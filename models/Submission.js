const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true,
    },
    code: {
        type: String,
        required: [true, 'Code is required'],
    },
    timeComplexity: {
        type: String,
        required: [true, 'Time complexity is required'],
        trim: true,
    },
    spaceComplexity: {
        type: String,
        required: [true, 'Space complexity is required'],
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Submission', submissionSchema);

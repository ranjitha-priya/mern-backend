const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    topic: {
        type: String,
        required: [true, 'Topic is required'],
        trim: true,
    },
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
    },
    leetcodeLink: {
        type: String,
        trim: true,
        default: '',
    },
    date: {
        type: String, // YYYY-MM-DD
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Question', questionSchema);

const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: 255
    },
    instructions: {
        type: String,
        maxLength: 2000
    },
    joinCode: {
        type: String,
        unique: true,
        required: true,
        minlength: 8,
        maxlength: 16,
    },
    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
}, { timestamps: true });

const Quiz = mongoose.model('Quiz', quizSchema);
module.exports = Quiz;

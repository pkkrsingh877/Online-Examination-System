const resultSchema = new mongoose.Schema({
    correct: {
        type: Number,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    },
    quizId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz', // Reference to the Quiz model
        required: true,
    }
}, { timestamps: true });

const Result = mongoose.model('Result', resultSchema);
module.exports = Result;

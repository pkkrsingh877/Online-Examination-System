const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
        maxLength: 1000
    },
    options: {
        type: [String], // An array of strings to hold the options
        required: true,
        validate: {
            validator: function (options) {
                return options.length >= 2 && options.every(option => option.length <= 1000); // At least 2 options and each option max length 1000
            },
            message: 'At least two options are required, and each option must be less than or equal to 1000 characters.',
        },
    },
    correctOption: {
        type: String,
        required: true,
    },
    quizId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz', // Reference to the Quiz model
        required: true,
    }
}, { timestamps: true });

// Pre-save hook to validate correct_option
questionSchema.pre('save', function (next) {
    const { options, correct_option } = this;

    // Check if the correct_option is one of the options
    if (!options.includes(correct_option)) {
        return next(new Error('correct_option must match one of the provided options'));
    }

    // Ensure that correct_option is only one option (if needed)
    const count = options.filter(option => option === correct_option).length;
    if (count !== 1) {
        return next(new Error('correct_option must be one and only one of the provided options'));
    }

    // If all validations pass, continue saving
    next();
});


// Create the model
const Question = mongoose.model('Question', questionSchema);
module.exports = Question;

const User = require('../models/User');
const Result = require('../models/Result');

// We can display result when we figure out how many answers were correct 

const CreateResult = async (req, res) => {
    const { correct, total, userId, QuizId } = req.body;

    try {
        const result = new Result({ correct, total, userId, QuizId });
        await result.save();

        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ message: 'Error during result creation', error });
    }
}

// We can display  profile info from UserContext

const UpdateProfile = async (req, res) => {
    const { id, name, username, email, password } = req.body;

    try {
        const user = await User.findByIdAndUpdate(id, { name, username, email, password }, { new: true });

        res.status(200).json({ name, username, email, id: user._id });
    } catch (error) {
        res.status(500).json({ message: 'Error during profile updation', error });
    }
}

const DeleteAccount = async (req, res) => {
    const { id, role } = req.body; // Assume role is passed along with the request

    try {
        // Delete the User account
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (role === 'Admin') {
            // If Admin, delete all associated quizzes, questions, and results
            const quizzes = await Quiz.find({ creatorId: id });

            // Delete all quizzes created by the Admin
            const quizIds = quizzes.map(quiz => quiz._id);
            await Quiz.deleteMany({ creatorId: id });

            // Delete all questions associated with those quizzes
            await Question.deleteMany({ quizId: { $in: quizIds } });

            // Delete all results associated with those quizzes
            await Result.deleteMany({ quizId: { $in: quizIds } });

        } else {
            // If a regular user, delete only their own results
            await Result.deleteMany({ userId: id });
        }

        res.status(200).json({ message: 'Account and associated data deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error during account deletion', error });
    }
};

const ListQuiz = async (req, res) => {
    const { id } = req.params;

    try {
        const quiz = await Quiz.findById(id);
        res.status(200).json(quiz);
    } catch (error) {
        res.status(500).json({ message: 'Error during pulling quiz', error });
    }
}

const ListQuestions = async (req, res) => {
    const { id } = req.params;
    try {
        const questions = await Question.find({ quizId: id });
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ 'message': 'Error during pulling questions', error })
    }
}

module.exports = { ListQuiz, ListQuestions, CreateResult, UpdateProfile, DeleteAccount };

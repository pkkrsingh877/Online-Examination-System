const Quiz = require('../models/Quiz');
const Question = require('../models/Question');
const Result = require('../models/Result');

// Controller for Creating Quiz
const CreateQuiz = async (req, res) => {
    const { title, instructions, joinCode, creatorId } = req.body;

    try {
        const quiz = new Quiz({ title, instructions, joinCode, creatorId });
        await quiz.save();

        res.status(200).json({ quiz });
    } catch (error) {
        res.status(500).json({ message: 'Error during quiz creation', error });
    }
};

// Controller for Creating Quiz
const CreateQuestion = async (req, res) => {
    const { questionStatement, options, correctOption, quizId } = req.body;

    try {
        const question = new Question({ questionStatement, options, correctOption, quizId });
        await question.save();

        res.status(200).json({ question });
    } catch (error) {
        res.status(500).json({ message: 'Error during question creation', error });
    }
};

// Controller for Updating Quiz
const UpdateQuiz = async (req, res) => {
    const { id, title, instructions } = req.body;

    try {
        const quiz = await Quiz.findByIdAndUpdate(id, { title, instructions }, { new: true });
        res.status(200).json({ quiz });
    } catch (error) {
        res.status(500).json({ message: 'Error during quiz updation', error });
    }
};

// Controller for Updating Question
const UpdateQuestion = async (req, res) => {
    const { id, questionStatement, options, correctOption } = req.body;

    try {
        const question = await Question.findByIdAndUpdate(id, { questionStatement, options, correctOption }, { new: true });
        res.status(200).json({ question });
    } catch (error) {
        res.status(500).json({ message: 'Error during question updation', error });
    }
};

// Controller for Deleting a Quiz
const DeleteQuiz = async (req, res) => {
    const { id } = req.params;

    try {
        // First, delete the Quiz
        const quiz = await Quiz.findByIdAndDelete(id);

        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }

        // Then, delete all related Questions
        await Question.deleteMany({ quizId: id });
        await Result.deleteMany({ quizId: id });

        res.status(200).json({ message: 'Quiz and associated questions deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error during quiz deletion', error });
    }
};

// Controller for Deleting a Question
const DeleteQuestion = async (req, res) => {
    const { id } = req.params;

    try {
        const question = await Question.findByIdAndDelete(id);

        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }

        res.status(200).json({ message: 'Question deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error during question deletion', error });
    }
};

module.exports = { CreateQuiz, CreateQuestion, UpdateQuiz, UpdateQuestion, DeleteQuiz, DeleteQuestion };
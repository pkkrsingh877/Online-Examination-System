const express = require('express');
const { ListQuestions, ListQuizzes, ListQuiz, CreateQuiz, CreateQuestion, UpdateQuiz, UpdateQuestion, DeleteQuiz, DeleteQuestion } = require('../controllers/adminController');
const router = express.Router();

router.get('/quiz', ListQuizzes);
router.get('/quiz/:id', ListQuiz);
router.get('/quiz/:id/question', ListQuestions);

router.post('/quiz', CreateQuiz);
router.post('/quiz/:id/question', CreateQuestion);

router.patch('/quiz/:id', UpdateQuiz);
router.patch('/quiz/:id/question', UpdateQuestion);

router.delete('/quiz/:id', DeleteQuiz);
router.delete('/quiz/:id/question', DeleteQuestion);

module.exports = router;

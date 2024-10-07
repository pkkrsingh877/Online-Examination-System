const express = require('express');
const { ListQuiz, ListQuestions, CreateResult, DeleteAccount, UpdateProfile, JoinQuiz } = require('../controllers/userController');
const router = express.Router();

router.get('/quiz/:joinCode', JoinQuiz);
router.get('/quiz/:id', ListQuiz);
router.get('/quiz/:id/question', ListQuestions);

router.post('/quiz/result', CreateResult);

router.patch('/user/:id', UpdateProfile);
router.delete('/user/:id', DeleteAccount);

module.exports = router;

import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import NavbarComponent from './components/utilities/NavbarComponent';
import AdminHome from './components/admin/AdminHome';
import QuizList from './components/admin/QuizList';
import QuizUpdate from './components/admin/QuizUpdate';
import QuizCreate from './components/admin/QuizCreate';
import PreviewQuiz from './components/admin/PreviewQuiz';
import QuestionCreate from './components/admin/QuestionCreate';
import QuestionUpdate from './components/admin/QuestionUpdate';
import QuizInstructions from './components/quiz/QuizInstructions';
import AttemptQuiz from './components/quiz/AttemptQuiz';

function App() {
  return (
    <Router>
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/quiz/instructions/:joinCode" element={<QuizInstructions />} />
        <Route path="/quiz/:id/attempt" element={<AttemptQuiz />} />
        <Route path="/admin/" element={<AdminHome />} />
        <Route path="/admin/" element={<AdminHome />} />
        <Route path="/admin/quiz" element={<QuizList />} />
        <Route path="/admin/quiz/:id" element={<PreviewQuiz />} />
        <Route path="/admin/quiz/create" element={<QuizCreate />} />
        <Route path="/admin/quiz/:id/update" element={<QuizUpdate />} />
        <Route path="/admin/quiz/:quizId/question/create" element={<QuestionCreate />} />
        <Route path="/admin/quiz/:quizId/question/:questionId/update" element={<QuestionUpdate />} />
      </Routes>
    </Router>
  );
}

export default App;

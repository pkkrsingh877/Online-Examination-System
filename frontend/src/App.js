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

function App() {
  return (
    <Router>
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/admin/" element={<AdminHome />} />
        <Route path="/admin/quiz" element={<QuizList />} />
        <Route path="/admin/quiz/create" element={<QuizCreate />} />
        <Route path="/admin/quiz/:id/update" element={<QuizUpdate />} />
      </Routes>
    </Router>
  );
}

export default App;

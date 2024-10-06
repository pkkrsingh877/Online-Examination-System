import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import CreatePost from './components/posts/CreatePost';
import PostList from './components/posts/PostList';
import Post from './components/posts/Post';
import Friends from './components/friends/Friends';
import FriendRequestSent from './components/friends/FriendRequestSent';
import FriendRequestReceived from './components/friends/FriendRequestReceived';
import SearchFriends from './components/friends/SearchFriends';
import Chat from './components/messages/Chat';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/posts" element={<PostList />} />
        <Route path="/posts/new" element={<CreatePost />} />
        <Route path="/posts/:id" element={<Post />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/friends/request/sent" element={<FriendRequestSent />} />
        <Route path="/friends/request/received" element={<FriendRequestReceived />} />
        <Route path="/friends/search" element={<SearchFriends />} />
        <Route path="/chat/:recipient" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;

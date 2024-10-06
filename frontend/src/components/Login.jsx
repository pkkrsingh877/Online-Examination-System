import React, { useContext, useState } from 'react';
import UserContext from '../context/UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/');
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <h2>Login</h2>
            <input
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;

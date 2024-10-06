import React, { useState, useEffect } from 'react';
import axios from 'axios';

import UserContext from './UserContext';

const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Signup function
    const signup = async (name, username, email, role, password) => {
        try {
            const response = await axios.post('http://localhost:5000/api/signup', { name, username, email, role, password });
            setUser(response.data.user);
            localStorage.setItem('token', response.data.token);
        } catch (error) {
            console.error('Signup error:', error);
        }
    };

    // Function to set the user after login
    const login = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:5000/api/login', { email, password });
            setUser(response.data.user);
            localStorage.setItem('token', response.data.token);
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    // Function to logout the user
    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
    };

    // Function to check if the user is already logged in when app loads
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // You can add a token validation check with an API call here
            axios.get('http://localhost:5000/api/me', {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(response => {
                    setUser(response.data.user);
                })
                .catch((err) => {
                    console.log(err)
                    // Token might be expired or invalid
                    logout();
                });
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, login, logout, signup }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;
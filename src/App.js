// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Menu from './components/Menu';
import UserForm from './components/UserForm';

const App = () => {
    return (
        <Router>
            <div>
                
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/menu" element={<Menu />} />
                    <Route path="/UserForm" element={<UserForm />} />

                </Routes>
            </div>
        </Router>
    );
};

export default App;

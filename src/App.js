// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Menu from './components/Menu';
import UserForm from './components/UserForm';
import CreditForm from './components/CreditForm';
import Manager from './components/Manager';
import CreditDetails from './components/CreditDetails';
import UserList from './components/UserList';
import CreditPaymentForm from './components/CreditPaymentForm';


const App = () => {
    return (
        <Router>
            <div>
                
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/menu" element={<Menu />} />
                    <Route path="/UserForm" element={<UserForm />} />
                    <Route path="/CreditForm" element={<CreditForm />} />
                    <Route path="/Manager" element={<Manager/>} />
                    <Route path="/CreditDetails" element={<CreditDetails/>} />
                    <Route path="/UserList" element={<UserList/>} />
                    <Route path="/CreditPaymentForm" element={<CreditPaymentForm/>} />

                  

                </Routes>
            </div>
        </Router>
    );
};

export default App;

// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './views/Login';
import Chat from './views/Chat';
import Register from './views/Register';
import './styles/App.css'; 

function App() {
    const isLogged = Boolean(localStorage.getItem('authToken'));

    return (
        <Router>
            <Routes>
                <Route path="/" element={isLogged ? <Chat /> : <Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/chat" element={isLogged ? <Chat /> : <Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    );
}

export default App;
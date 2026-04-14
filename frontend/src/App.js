import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Import components
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Tracking from './components/Tracking';
import Login from './components/Login';
import Register from './components/Register';
import AdminPanel from './components/AdminPanel';
import ContactUs from './components/ContactUs';
import AdminMessages from './components/AdminMessages';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [trackingId, setTrackingId] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        const role = localStorage.getItem('user_role');
        if (token) {
            setIsAuthenticated(true);
            setUserRole(role);
        }
    }, []);

    const handleLogin = (token, role) => {
        localStorage.setItem('access_token', token);
        localStorage.setItem('user_role', role);
        setIsAuthenticated(true);
        setUserRole(role);
    };

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_role');
        setIsAuthenticated(false);
        setUserRole(null);
    };

    return (
        <Router>
            <div className="app-container">
                <Navbar isAuthenticated={isAuthenticated} userRole={userRole} onLogout={handleLogout} />
                <div className="main-content">
                    <Routes>
                        <Route path="/" element={<Dashboard setTrackingId={setTrackingId} />} />
                        <Route path="/contact" element={<ContactUs />} />
                        <Route path="/tracking/:id" element={<Tracking />} />
                        <Route path="/tracking" element={<Tracking trackingId={trackingId} />} />
                        <Route path="/login" element={
                            !isAuthenticated ? 
                            <Login onLogin={handleLogin} /> : 
                            <Navigate to="/" />
                        } />
                        <Route path="/register" element={
                            !isAuthenticated ? 
                            <Register /> : 
                            <Navigate to="/" />
                        } />
                        <Route path="/admin" element={
                            isAuthenticated && userRole === 'admin' ? 
                            <AdminPanel /> : 
                            <Navigate to="/" />
                        } />
                        <Route path="/admin/messages" element={
                            isAuthenticated && userRole === 'admin' ? 
                            <AdminMessages /> : 
                            <Navigate to="/" />
                        } />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
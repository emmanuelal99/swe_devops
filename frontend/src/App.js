import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './styles/App.css';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Homepage from './pages/Homepage';
import TrackParcel from './pages/TrackParcel';
import RequestDelivery from './pages/RequestDelivery';
import ContactUs from './pages/ContactUs';
import Login from './pages/Login';
import Register from './pages/Register';
import AboutUs from './pages/AboutUs';
import AdminDashboard from './pages/AdminDashboard';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        const role = localStorage.getItem('user_role');
        if (token) {
            setIsAuthenticated(true);
            setUserRole(role);
        }
        setLoading(false);
    }, []);

    const handleLogin = (token, role) => {
        localStorage.setItem('access_token', token);
        localStorage.setItem('user_role', role);
        setIsAuthenticated(true);
        setUserRole(role);
    };

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user_role');
        setIsAuthenticated(false);
        setUserRole(null);
    };

    if (loading) {
        return <div className="spinner"></div>;
    }

    return (
        <Router>
            <Navbar isAuthenticated={isAuthenticated} userRole={userRole} onLogout={handleLogout} />
            <main style={{ minHeight: '80vh', marginTop: '80px' }}>
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/track/:trackingId?" element={<TrackParcel />} />
                    <Route path="/request-delivery" element={<RequestDelivery />} />
                    <Route path="/contact" element={<ContactUs />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/login" element={
                        !isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/" />
                    } />
                    <Route path="/register" element={
                        !isAuthenticated ? <Register /> : <Navigate to="/" />
                    } />
                    <Route path="/admin" element={
                        isAuthenticated && userRole === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />
                    } />
                </Routes>
            </main>
            <Footer />
        </Router>
    );
}

export default App;
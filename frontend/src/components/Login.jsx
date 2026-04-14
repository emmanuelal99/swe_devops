import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

function Login({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Mock authentication - In production, connect to Django API
        setTimeout(() => {
            if (email === 'admin@logitrack.com' && password === 'admin123') {
                onLogin('mock_jwt_token', 'admin');
                navigate('/admin');
            } else if (email && password) {
                onLogin('mock_jwt_token', 'customer');
                navigate('/');
            } else {
                setError('Invalid credentials');
            }
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="auth-container">
            <h2>Login to LogiTrack</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email Address</label>
                    <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Enter your email"
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Enter your password"
                    />
                </div>
                <button type="submit" className="btn-primary-custom" style={{ width: '100%' }} disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
            <p style={{ textAlign: 'center', marginTop: '20px' }}>
                Don't have an account? <Link to="/register">Register here</Link>
            </p>
            <p style={{ textAlign: 'center', marginTop: '10px', fontSize: '12px', color: '#666' }}>
                Demo credentials: admin@logitrack.com / admin123
            </p>
        </div>
    );
}

export default Login;
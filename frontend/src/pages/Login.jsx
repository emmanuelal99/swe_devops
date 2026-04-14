import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { api } from '../services/api';

function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const data = await api.login(username, password);
            if (data.access) {
                localStorage.setItem('access_token', data.access);
                localStorage.setItem('refresh_token', data.refresh);
                const isAdmin = username === 'admin';
                localStorage.setItem('user_role', isAdmin ? 'admin' : 'customer');
                onLogin(data.access, isAdmin ? 'admin' : 'customer');
                navigate(isAdmin ? '/admin' : '/');
            } else {
                setError('Invalid username or password');
            }
        } catch (err) {
            setError('Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="py-5">
            <div className="auth-container">
                <h2 className="text-center">Welcome Back</h2>
                <p className="text-muted text-center mb-4">Login to your LogiTrack account</p>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className="mb-4">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </Form.Group>
                    <Button type="submit" className="btn-primary-custom w-100" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </Button>
                </Form>
                <div className="text-center mt-4">
                    <p>Don't have an account? <Link to="/register">Register here</Link></p>
                    <p className="text-muted small">Demo: admin / admin123</p>
                </div>
            </div>
        </Container>
    );
}

export default Login;
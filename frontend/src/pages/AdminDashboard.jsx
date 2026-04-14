import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaBox, FaTruck, FaCheckCircle, FaClock } from 'react-icons/fa';
import { api } from '../services/api';

function AdminDashboard() {
    const [stats, setStats] = useState({ total: 0, pending: 0, inTransit: 0, delivered: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const data = await api.getAdminStats();
            setStats(data);
        } catch (error) {
            console.error('Error fetching stats:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="spinner"></div>;

    return (
        <Container className="py-4">
            <h1 className="mb-4">Admin Dashboard</h1>
            <Row>
                <Col md={3} className="mb-3">
                    <Card className="text-center p-3"><FaBox size={40} color="#667eea" /><h3>{stats.total}</h3><p>Total Parcels</p></Card>
                </Col>
                <Col md={3} className="mb-3">
                    <Card className="text-center p-3"><FaClock size={40} color="#ffc107" /><h3>{stats.pending}</h3><p>Pending</p></Card>
                </Col>
                <Col md={3} className="mb-3">
                    <Card className="text-center p-3"><FaTruck size={40} color="#17a2b8" /><h3>{stats.inTransit}</h3><p>In Transit</p></Card>
                </Col>
                <Col md={3} className="mb-3">
                    <Card className="text-center p-3"><FaCheckCircle size={40} color="#28a745" /><h3>{stats.delivered}</h3><p>Delivered</p></Card>
                </Col>
            </Row>
        </Container>
    );
}

export default AdminDashboard;
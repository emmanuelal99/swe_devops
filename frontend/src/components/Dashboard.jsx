import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';

function Dashboard({ setTrackingId }) {
    const [trackingInput, setTrackingInput] = useState('');
    const navigate = useNavigate();

    const handleTrack = () => {
        if (trackingInput.trim()) {
            setTrackingId(trackingInput);
            navigate(`/tracking/${trackingInput}`);
        }
    };

    return (
        <Container className="dashboard-container">
            <div className="hero-section">
                <h1>Real-time Shipment Tracking</h1>
                <p>Track your packages anywhere, anytime with LogiTrack</p>
            </div>

            <div className="tracking-card">
                <h3 style={{ marginBottom: '20px' }}>Track Your Shipment</h3>
                <div className="input-group-custom">
                    <input 
                        type="text" 
                        placeholder="Enter your tracking ID (e.g., 84eab661-2e62-413e-876d-cfddd8794054)"
                        value={trackingInput}
                        onChange={(e) => setTrackingInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleTrack()}
                    />
                    <button className="btn-primary-custom" onClick={handleTrack}>
                        Track Now
                    </button>
                </div>
            </div>

            <Row>
                <Col md={4}>
                    <Card style={{ marginBottom: '20px', borderRadius: '15px', boxShadow: '0 5px 20px rgba(0,0,0,0.1)' }}>
                        <Card.Body>
                            <Card.Title>📦 Real-time Updates</Card.Title>
                            <Card.Text>
                                Get instant notifications about your shipment status changes.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card style={{ marginBottom: '20px', borderRadius: '15px', boxShadow: '0 5px 20px rgba(0,0,0,0.1)' }}>
                        <Card.Body>
                            <Card.Title>🗺️ Live Tracking</Card.Title>
                            <Card.Text>
                                Visualize your package route on an interactive map.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card style={{ marginBottom: '20px', borderRadius: '15px', boxShadow: '0 5px 20px rgba(0,0,0,0.1)' }}>
                        <Card.Body>
                            <Card.Title>🔔 Email Alerts</Card.Title>
                            <Card.Text>
                                Receive automatic email notifications for important updates.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Dashboard;
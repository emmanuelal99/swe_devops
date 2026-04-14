import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaTruck, FaMapMarkerAlt, FaHeadset, FaBox, FaClock, FaShieldAlt } from 'react-icons/fa';

function Homepage() {
    const [trackingId, setTrackingId] = useState('');
    const navigate = useNavigate();

    const handleTrack = () => {
        if (trackingId.trim()) {
            navigate(`/track/${trackingId}`);
        }
    };

    return (
        <div>
            {/* Hero Section */}
            <div className="hero-section" data-aos="fade-up">
                <Container>
                    <h1>Fast, Reliable & Trackable Delivery</h1>
                    <p>Track your parcels in real-time with LogiTrack's advanced logistics system</p>
                    
                    <div className="tracking-card" style={{ maxWidth: '600px', margin: '40px auto 0' }}>
                        <h5>Track Your Parcel</h5>
                        <div className="tracking-input-group">
                            <input 
                                type="text" 
                                placeholder="Enter Tracking ID"
                                value={trackingId}
                                onChange={(e) => setTrackingId(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleTrack()}
                            />
                            <Button className="btn-primary-custom" onClick={handleTrack}>
                                Track Now
                            </Button>
                        </div>
                    </div>
                </Container>
            </div>

            <Container>
                {/* Features */}
                <Row className="mb-5">
                    <Col md={3} sm={6} className="mb-4">
                        <div className="feature-card">
                            <div className="feature-icon"><FaTruck /></div>
                            <h5>Fast Delivery</h5>
                            <p>Express delivery options nationwide</p>
                        </div>
                    </Col>
                    <Col md={3} sm={6} className="mb-4">
                        <div className="feature-card">
                            <div className="feature-icon"><FaMapMarkerAlt /></div>
                            <h5>Real-time Tracking</h5>
                            <p>Track your parcel every step</p>
                        </div>
                    </Col>
                    <Col md={3} sm={6} className="mb-4">
                        <div className="feature-card">
                            <div className="feature-icon"><FaBox /></div>
                            <h5>Secure Packaging</h5>
                            <p>Professional packing for all items</p>
                        </div>
                    </Col>
                    <Col md={3} sm={6} className="mb-4">
                        <div className="feature-card">
                            <div className="feature-icon"><FaHeadset /></div>
                            <h5>24/7 Support</h5>
                            <p>Customer support round the clock</p>
                        </div>
                    </Col>
                </Row>

                {/* Stats */}
                <div className="stats-section">
                    <Row>
                        <Col md={4} className="text-center mb-4 mb-md-0">
                            <span className="stat-number">10,000+</span>
                            <span className="stat-label">Deliveries Completed</span>
                        </Col>
                        <Col md={4} className="text-center mb-4 mb-md-0">
                            <span className="stat-number">8,000+</span>
                            <span className="stat-label">Happy Customers</span>
                        </Col>
                        <Col md={4} className="text-center">
                            <span className="stat-number">24/7</span>
                            <span className="stat-label">Customer Support</span>
                        </Col>
                    </Row>
                </div>

                {/* CTA */}
                <Row className="align-items-center bg-light rounded-4 p-5 mb-5">
                    <Col lg={8} className="mb-4 mb-lg-0">
                        <h3>Ready to send a parcel?</h3>
                        <p className="mb-0">Request a delivery now and get real-time tracking</p>
                    </Col>
                    <Col lg={4} className="text-lg-end">
                        <Button as={Link} to="/request-delivery" className="btn-primary-custom">
                            Request Delivery
                        </Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Homepage;
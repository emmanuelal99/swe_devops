import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaTruck, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

function Footer() {
    return (
        <footer className="footer">
            <Container>
                <Row className="py-5">
                    <Col md={4} className="mb-4 mb-md-0">
                        <div className="d-flex align-items-center mb-3">
                            <FaTruck size={30} color="#667eea" />
                            <h4 className="mb-0 ms-2">LogiTrack</h4>
                        </div>
                        <p>Fast, reliable, and trackable delivery services across the country.</p>
                        <div className="social-links">
                            <a href="#"><FaFacebook /></a>
                            <a href="#"><FaTwitter /></a>
                            <a href="#"><FaInstagram /></a>
                            <a href="#"><FaLinkedin /></a>
                        </div>
                    </Col>
                    <Col md={2} className="mb-4 mb-md-0">
                        <h5>Quick Links</h5>
                        <ul className="list-unstyled">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/track">Track Parcel</Link></li>
                            <li><Link to="/request-delivery">Request Delivery</Link></li>
                            <li><Link to="/about">About Us</Link></li>
                        </ul>
                    </Col>
                    <Col md={3} className="mb-4 mb-md-0">
                        <h5>Services</h5>
                        <ul className="list-unstyled">
                            <li>Express Delivery</li>
                            <li>Same Day Delivery</li>
                            <li>Real-time Tracking</li>
                            <li>24/7 Support</li>
                        </ul>
                    </Col>
                    <Col md={3}>
                        <h5>Contact Info</h5>
                        <ul className="list-unstyled">
                            <li><FaMapMarkerAlt /> Manchester, UK</li>
                            <li><FaPhone /> +44 (0) 1234 567890</li>
                            <li><FaEnvelope /> support@logitrack.com</li>
                        </ul>
                    </Col>
                </Row>
                <hr />
                <div className="text-center py-3">
                    <p className="mb-0">&copy; 2024 LogiTrack. All rights reserved.</p>
                </div>
            </Container>
        </footer>
    );
}

export default Footer;
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaTruck, FaGlobe, FaUsers, FaAward } from 'react-icons/fa';

function AboutUs() {
    return (
        <div>
            <div className="hero-section">
                <Container>
                    <h1>About LogiTrack</h1>
                    <p>Your trusted partner in logistics and parcel delivery</p>
                </Container>
            </div>
            <Container>
                <Row className="align-items-center mb-5">
                    <Col lg={6} className="mb-4 mb-lg-0">
                        <h2>Our Story</h2>
                        <p>Founded in 2020, LogiTrack has grown from a small local courier service to a nationwide logistics network. We've delivered thousands of parcels and served customers across the country.</p>
                        <h5>Our Mission</h5>
                        <p>To provide fast, reliable, and trackable delivery solutions that empower businesses and individuals.</p>
                        <h5>Our Vision</h5>
                        <p>To become the most trusted logistics partner, setting new standards for transparency and customer satisfaction.</p>
                    </Col>
                    <Col lg={6}>
                        <div className="bg-light rounded-4 p-4 text-center">
                            <img src="https://via.placeholder.com/500x300?text=LogiTrack" alt="LogiTrack" className="img-fluid rounded-3" />
                        </div>
                    </Col>
                </Row>
                <div className="stats-section mb-5">
                    <Row>
                        <Col md={3} className="text-center"><span className="stat-number">10,000+</span><br/>Deliveries</Col>
                        <Col md={3} className="text-center"><span className="stat-number">8,000+</span><br/>Customers</Col>
                        <Col md={3} className="text-center"><span className="stat-number">5+</span><br/>Countries</Col>
                        <Col md={3} className="text-center"><span className="stat-number">24/7</span><br/>Support</Col>
                    </Row>
                </div>
            </Container>
        </div>
    );
}

export default AboutUs;
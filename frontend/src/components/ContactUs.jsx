import React, { useState } from 'react';
import { Container, Form, Button, Alert, Card, Row, Col } from 'react-bootstrap';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

function ContactUs() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
        priority: 'normal'
    });
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);
        setSuccess(null);

        // Get auth token if user is logged in
        const token = localStorage.getItem('access_token');

        try {
            // In production, this would call your Django API
            // For now, we'll use localStorage to store messages
            
            const newMessage = {
                id: Date.now(),
                ...formData,
                status: 'unread',
                createdAt: new Date().toISOString(),
                userId: localStorage.getItem('user_id') || 'guest'
            };

            // Get existing messages from localStorage
            const existingMessages = JSON.parse(localStorage.getItem('contact_messages') || '[]');
            existingMessages.push(newMessage);
            localStorage.setItem('contact_messages', JSON.stringify(existingMessages));

            setSuccess('Your message has been sent successfully! The admin will respond within 24 hours.');
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: '',
                priority: 'normal'
            });

            // If using backend API, uncomment this:
            /*
            const response = await fetch(`${process.env.REACT_APP_API_URL}/contact/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token ? `Bearer ${token}` : ''
                },
                body: JSON.stringify(formData)
            });
            
            if (response.ok) {
                setSuccess('Message sent successfully!');
            } else {
                setError('Failed to send message. Please try again.');
            }
            */
        } catch (err) {
            setError('An error occurred. Please try again later.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Container className="dashboard-container" style={{ marginTop: '30px', marginBottom: '50px' }}>
            <div className="hero-section" style={{ padding: '40px' }}>
                <h1>Contact Us</h1>
                <p>Have questions or need assistance? We're here to help!</p>
            </div>

            <Row>
                <Col md={4}>
                    <Card style={{ marginBottom: '20px', borderRadius: '15px', boxShadow: '0 5px 20px rgba(0,0,0,0.1)' }}>
                        <Card.Body>
                            <Card.Title><FaEnvelope /> Email Us</Card.Title>
                            <Card.Text>
                                <strong>Customer Support:</strong><br/>
                                support@logitrack.com<br/><br/>
                                <strong>Sales Inquiries:</strong><br/>
                                sales@logitrack.com
                            </Card.Text>
                        </Card.Body>
                    </Card>

                    <Card style={{ marginBottom: '20px', borderRadius: '15px', boxShadow: '0 5px 20px rgba(0,0,0,0.1)' }}>
                        <Card.Body>
                            <Card.Title><FaPhone /> Call Us</Card.Title>
                            <Card.Text>
                                <strong>24/7 Support:</strong><br/>
                                +44 (0) 1234 567890<br/><br/>
                                <strong>Emergency:</strong><br/>
                                +44 (0) 1234 567891
                            </Card.Text>
                        </Card.Body>
                    </Card>

                    <Card style={{ marginBottom: '20px', borderRadius: '15px', boxShadow: '0 5px 20px rgba(0,0,0,0.1)' }}>
                        <Card.Body>
                            <Card.Title><FaMapMarkerAlt /> Visit Us</Card.Title>
                            <Card.Text>
                                LogiTrack Logistics Hub<br/>
                                123 Delivery Road<br/>
                                Manchester, M1 2AB<br/>
                                United Kingdom
                            </Card.Text>
                        </Card.Body>
                    </Card>

                    <Card style={{ marginBottom: '20px', borderRadius: '15px', boxShadow: '0 5px 20px rgba(0,0,0,0.1)' }}>
                        <Card.Body>
                            <Card.Title><FaClock /> Business Hours</Card.Title>
                            <Card.Text>
                                Monday - Friday: 9:00 AM - 6:00 PM<br/>
                                Saturday: 10:00 AM - 4:00 PM<br/>
                                Sunday: Closed
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={8}>
                    <Card style={{ borderRadius: '15px', boxShadow: '0 5px 20px rgba(0,0,0,0.1)' }}>
                        <Card.Body>
                            <Card.Title style={{ marginBottom: '20px' }}>Send Us a Message</Card.Title>
                            {success && <Alert variant="success">{success}</Alert>}
                            {error && <Alert variant="danger">{error}</Alert>}
                            
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Your Name *</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                placeholder="Enter your full name"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Email Address *</Form.Label>
                                            <Form.Control
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                placeholder="Enter your email"
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={8}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Subject *</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                required
                                                placeholder="What is this regarding?"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Priority</Form.Label>
                                            <Form.Select
                                                name="priority"
                                                value={formData.priority}
                                                onChange={handleChange}
                                            >
                                                <option value="normal">Normal</option>
                                                <option value="high">High Priority</option>
                                                <option value="urgent">Urgent</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Form.Group className="mb-3">
                                    <Form.Label>Message *</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={6}
                                        placeholder="Please describe your issue or question in detail..."
                                    />
                                </Form.Group>

                                <Button 
                                    type="submit" 
                                    className="btn-primary-custom" 
                                    disabled={submitting}
                                    style={{ width: '100%' }}
                                >
                                    {submitting ? 'Sending...' : 'Send Message'}
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default ContactUs;
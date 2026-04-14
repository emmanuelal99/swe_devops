import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { api } from '../services/api';

function ContactUs() {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '', priority: 'normal' });
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);
        try {
            const response = await api.submitContact(formData);
            if (response.id) {
                setSuccess('Message sent successfully! We will respond within 24 hours.');
                setFormData({ name: '', email: '', subject: '', message: '', priority: 'normal' });
            } else {
                setError('Failed to send message. Please try again.');
            }
        } catch (err) {
            setError('An error occurred. Please try again later.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Container className="py-4">
            <Row>
                <Col md={4}>
                    <Card className="mb-4">
                        <Card.Body>
                            <h5><FaEnvelope /> Email Us</h5>
                            <p>support@logitrack.com<br/>sales@logitrack.com</p>
                            <h5 className="mt-3"><FaPhone /> Call Us</h5>
                            <p>+44 (0) 1234 567890</p>
                            <h5 className="mt-3"><FaMapMarkerAlt /> Visit Us</h5>
                            <p>Manchester, United Kingdom</p>
                            <h5 className="mt-3"><FaClock /> Business Hours</h5>
                            <p>Mon-Fri: 9AM-6PM<br/>Sat: 10AM-4PM</p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={8}>
                    <Card>
                        <Card.Body>
                            <h4>Send Us a Message</h4>
                            {success && <Alert variant="success">{success}</Alert>}
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Name *</Form.Label>
                                            <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Email *</Form.Label>
                                            <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Form.Group className="mb-3">
                                    <Form.Label>Subject *</Form.Label>
                                    <Form.Control type="text" name="subject" value={formData.subject} onChange={handleChange} required />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Message *</Form.Label>
                                    <Form.Control as="textarea" rows={5} name="message" value={formData.message} onChange={handleChange} required />
                                </Form.Group>
                                <Button type="submit" className="btn-primary-custom w-100" disabled={submitting}>
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
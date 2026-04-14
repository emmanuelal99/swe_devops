import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { api } from '../services/api';

function RequestDelivery() {
    const [formData, setFormData] = useState({
        customer_name: '',
        customer_email: '',
        customer_phone: '',
        customer_address: '',
        parcel_type: 'Package',
        weight: '',
        description: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await api.requestDelivery(formData);
            if (response.tracking_id) {
                setSuccess(`Delivery request submitted! Tracking ID: ${response.tracking_id}`);
                setFormData({
                    customer_name: '', customer_email: '', customer_phone: '',
                    customer_address: '', parcel_type: 'Package', weight: '', description: ''
                });
            } else {
                setError('Failed to submit request. Please try again.');
            }
        } catch (err) {
            setError('An error occurred. Please try again later.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Container className="py-4">
            <Card className="mx-auto" style={{ maxWidth: '800px' }}>
                <Card.Body>
                    <h3 className="text-center mb-4">Request a Delivery</h3>
                    {success && <Alert variant="success">{success}</Alert>}
                    {error && <Alert variant="danger">{error}</Alert>}
                    
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Full Name *</Form.Label>
                                    <Form.Control type="text" name="customer_name" value={formData.customer_name} onChange={handleChange} required />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email *</Form.Label>
                                    <Form.Control type="email" name="customer_email" value={formData.customer_email} onChange={handleChange} required />
                                </Form.Group>
                            </Col>
                        </Row>
                        
                        <Form.Group className="mb-3">
                            <Form.Label>Phone Number *</Form.Label>
                            <Form.Control type="tel" name="customer_phone" value={formData.customer_phone} onChange={handleChange} required />
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                            <Form.Label>Delivery Address *</Form.Label>
                            <Form.Control as="textarea" rows={2} name="customer_address" value={formData.customer_address} onChange={handleChange} required />
                        </Form.Group>
                        
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Parcel Type</Form.Label>
                                    <Form.Select name="parcel_type" value={formData.parcel_type} onChange={handleChange}>
                                        <option>Package</option>
                                        <option>Document</option>
                                        <option>Fragile Item</option>
                                        <option>Electronics</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Weight (kg)</Form.Label>
                                    <Form.Control type="number" step="0.1" name="weight" value={formData.weight} onChange={handleChange} />
                                </Form.Group>
                            </Col>
                        </Row>
                        
                        <Form.Group className="mb-4">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleChange} placeholder="Any special instructions" />
                        </Form.Group>
                        
                        <Button type="submit" className="btn-primary-custom w-100" disabled={submitting}>
                            {submitting ? 'Submitting...' : 'Submit Delivery Request'}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default RequestDelivery;
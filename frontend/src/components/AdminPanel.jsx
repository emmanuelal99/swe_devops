import React, { useState, useEffect } from 'react';
import { Container, Button, Modal, Form, Alert } from 'react-bootstrap';

function AdminPanel() {
    const [shipments, setShipments] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingShipment, setEditingShipment] = useState(null);
    const [formData, setFormData] = useState({
        tracking_id: '',
        customer_name: '',
        customer_email: '',
        origin: '',
        destination: '',
        status: 'PENDING'
    });
    const [message, setMessage] = useState('');

    const getStatusClass = (status) => {
        const statusMap = {
            'PENDING': 'status-pending',
            'DISPATCHED': 'status-dispatched',
            'IN_TRANSIT': 'status-in-transit',
            'DELIVERED': 'status-delivered',
            'ON_HOLD': 'status-on-hold'
        };
        return statusMap[status] || 'status-pending';
    };

    // Mock data - In production, fetch from Django API
    useEffect(() => {
        const mockShipments = [
            {
                id: 1,
                tracking_id: '84eab661-2e62-413e-876d-cfddd8794054',
                customer_name: 'John Doe',
                customer_email: 'john@example.com',
                origin: 'London, UK',
                destination: 'Manchester, UK',
                status: 'ON_HOLD',
                created_at: '2026-03-20'
            },
            {
                id: 2,
                tracking_id: '92fbc772-3f73-524f-987e-dgeee9805165',
                customer_name: 'Jane Smith',
                customer_email: 'jane@example.com',
                origin: 'Birmingham, UK',
                destination: 'Liverpool, UK',
                status: 'IN_TRANSIT',
                created_at: '2026-03-21'
            }
        ];
        setShipments(mockShipments);
    }, []);

    const handleEdit = (shipment) => {
        setEditingShipment(shipment);
        setFormData({
            tracking_id: shipment.tracking_id,
            customer_name: shipment.customer_name,
            customer_email: shipment.customer_email,
            origin: shipment.origin,
            destination: shipment.destination,
            status: shipment.status
        });
        setShowModal(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this shipment?')) {
            setShipments(shipments.filter(s => s.id !== id));
            setMessage({ type: 'success', text: 'Shipment deleted successfully' });
            setTimeout(() => setMessage(''), 3000);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingShipment) {
            // Update existing shipment
            setShipments(shipments.map(s => 
                s.id === editingShipment.id 
                    ? { ...s, ...formData }
                    : s
            ));
            setMessage({ type: 'success', text: 'Shipment updated successfully' });
        } else {
            // Add new shipment
            const newShipment = {
                id: shipments.length + 1,
                ...formData,
                created_at: new Date().toISOString().split('T')[0]
            };
            setShipments([...shipments, newShipment]);
            setMessage({ type: 'success', text: 'Shipment added successfully' });
        }
        setShowModal(false);
        setEditingShipment(null);
        setFormData({
            tracking_id: '',
            customer_name: '',
            customer_email: '',
            origin: '',
            destination: '',
            status: 'PENDING'
        });
        setTimeout(() => setMessage(''), 3000);
    };

    const handleSendNotification = (email, trackingId) => {
        // In production, this would call your Django API to send email
        alert(`Email notification sent to ${email} for tracking ID: ${trackingId}`);
    };

    return (
        <Container className="admin-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h2>Admin Dashboard - Shipment Management</h2>
                <Button className="btn-primary-custom" onClick={() => setShowModal(true)}>
                    + Add New Shipment
                </Button>
            </div>

            {message && <Alert variant={message.type}>{message.text}</Alert>}

            <div className="admin-table">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Tracking ID</th>
                            <th>Customer</th>
                            <th>Origin</th>
                            <th>Destination</th>
                            <th>Status</th>
                            <th>Created</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {shipments.map(shipment => (
                            <tr key={shipment.id}>
                                <td>{shipment.tracking_id}</td>
                                <td>
                                    {shipment.customer_name}<br/>
                                    <small>{shipment.customer_email}</small>
                                </td>
                                <td>{shipment.origin}</td>
                                <td>{shipment.destination}</td>
                                <td>
                                    <span className={`status-badge ${getStatusClass(shipment.status)}`}>
                                        {shipment.status}
                                    </span>
                                </td>
                                <td>{shipment.created_at}</td>
                                <td>
                                    <Button 
                                        variant="info" 
                                        size="sm" 
                                        onClick={() => handleEdit(shipment)}
                                        style={{ marginRight: '5px' }}
                                    >
                                        Edit
                                    </Button>
                                    <Button 
                                        variant="warning" 
                                        size="sm" 
                                        onClick={() => handleSendNotification(shipment.customer_email, shipment.tracking_id)}
                                        style={{ marginRight: '5px' }}
                                    >
                                        Notify
                                    </Button>
                                    <Button 
                                        variant="danger" 
                                        size="sm" 
                                        onClick={() => handleDelete(shipment.id)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{editingShipment ? 'Edit Shipment' : 'Add New Shipment'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="tracking_id">
                            <Form.Label>Tracking ID</Form.Label>
                            <Form.Control
                                type="text"
                                value={formData.tracking_id}
                                onChange={(e) => setFormData({...formData, tracking_id: e.target.value})}
                                required
                                placeholder="Enter unique tracking ID"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="customer_name">
                            <Form.Label>Customer Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={formData.customer_name}
                                onChange={(e) => setFormData({...formData, customer_name: e.target.value})}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="customer_email">
                            <Form.Label>Customer Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={formData.customer_email}
                                onChange={(e) => setFormData({...formData, customer_email: e.target.value})}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="origin">
                            <Form.Label>Origin</Form.Label>
                            <Form.Control
                                type="text"
                                value={formData.origin}
                                onChange={(e) => setFormData({...formData, origin: e.target.value})}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="destination">
                            <Form.Label>Destination</Form.Label>
                            <Form.Control
                                type="text"
                                value={formData.destination}
                                onChange={(e) => setFormData({...formData, destination: e.target.value})}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="status">
                            <Form.Label>Status</Form.Label>
                            <Form.Select
                                value={formData.status}
                                onChange={(e) => setFormData({...formData, status: e.target.value})}
                                required
                            >
                                <option value="PENDING">Pending</option>
                                <option value="DISPATCHED">Dispatched</option>
                                <option value="IN_TRANSIT">In Transit</option>
                                <option value="ON_HOLD">On Hold</option>
                                <option value="DELIVERED">Delivered</option>
                            </Form.Select>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            {editingShipment ? 'Update Shipment' : 'Create Shipment'}
                        </Button>
                        <Button variant="secondary" onClick={() => setShowModal(false)} style={{ marginLeft: '10px' }}>
                            Cancel
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
}

export default AdminPanel;
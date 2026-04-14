import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, Card, Badge, Alert, Form } from 'react-bootstrap';
import { FaEnvelope, FaCheck, FaTrash, FaReply } from 'react-icons/fa';

function AdminMessages() {
    const [messages, setMessages] = useState([]);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [replyText, setReplyText] = useState('');
    const [filter, setFilter] = useState('all'); // all, unread, read
    const [message, setMessage] = useState('');

    useEffect(() => {
        loadMessages();
    }, []);

    const loadMessages = () => {
        // Load messages from localStorage
        const storedMessages = JSON.parse(localStorage.getItem('contact_messages') || '[]');
        // Sort by date (newest first)
        storedMessages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setMessages(storedMessages);
    };

    const handleViewMessage = (message) => {
        setSelectedMessage(message);
        setShowModal(true);
        
        // Mark as read if not already
        if (message.status === 'unread') {
            const updatedMessages = messages.map(m => 
                m.id === message.id ? { ...m, status: 'read' } : m
            );
            localStorage.setItem('contact_messages', JSON.stringify(updatedMessages));
            setMessages(updatedMessages);
        }
    };

    const handleDeleteMessage = (id) => {
        if (window.confirm('Are you sure you want to delete this message?')) {
            const updatedMessages = messages.filter(m => m.id !== id);
            localStorage.setItem('contact_messages', JSON.stringify(updatedMessages));
            setMessages(updatedMessages);
            setMessage({ type: 'success', text: 'Message deleted successfully' });
            setTimeout(() => setMessage(''), 3000);
        }
    };

    const handleReply = () => {
        if (!replyText.trim()) {
            alert('Please enter a reply message');
            return;
        }
        
        // In production, this would send an email via your backend
        alert(`Reply sent to ${selectedMessage.email}:\n\n${replyText}`);
        
        // Log reply to console
        console.log({
            to: selectedMessage.email,
            subject: `Re: ${selectedMessage.subject}`,
            message: replyText,
            originalMessage: selectedMessage.message
        });
        
        setReplyText('');
        setShowModal(false);
        setMessage({ type: 'success', text: 'Reply sent successfully!' });
        setTimeout(() => setMessage(''), 3000);
    };

    const getFilteredMessages = () => {
        if (filter === 'unread') {
            return messages.filter(m => m.status === 'unread');
        } else if (filter === 'read') {
            return messages.filter(m => m.status === 'read');
        }
        return messages;
    };

    const getPriorityBadge = (priority) => {
        const colors = {
            normal: 'secondary',
            high: 'warning',
            urgent: 'danger'
        };
        return <Badge bg={colors[priority]}>{priority.toUpperCase()}</Badge>;
    };

    const filteredMessages = getFilteredMessages();
    const unreadCount = messages.filter(m => m.status === 'unread').length;

    return (
        <Container className="admin-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <div>
                    <h2>Customer Messages</h2>
                    {unreadCount > 0 && (
                        <Badge bg="danger" style={{ marginLeft: '10px' }}>
                            {unreadCount} Unread
                        </Badge>
                    )}
                </div>
                <div>
                    <Form.Select 
                        value={filter} 
                        onChange={(e) => setFilter(e.target.value)}
                        style={{ width: '150px' }}
                    >
                        <option value="all">All Messages</option>
                        <option value="unread">Unread Only</option>
                        <option value="read">Read Only</option>
                    </Form.Select>
                </div>
            </div>

            {message && <Alert variant={message.type}>{message.text}</Alert>}

            <div className="admin-table">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Subject</th>
                            <th>Priority</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredMessages.length === 0 ? (
                            <tr>
                                <td colSpan="7" style={{ textAlign: 'center' }}>
                                    No messages found
                                </td>
                            </tr>
                        ) : (
                            filteredMessages.map((msg) => (
                                <tr key={msg.id} style={{ fontWeight: msg.status === 'unread' ? 'bold' : 'normal' }}>
                                    <td>
                                        {msg.status === 'unread' ? (
                                            <FaEnvelope color="#dc3545" title="Unread" />
                                        ) : (
                                            <FaCheck color="#28a745" title="Read" />
                                        )}
                                    </td>
                                    <td>{new Date(msg.createdAt).toLocaleString()}</td>
                                    <td>{msg.name}</td>
                                    <td>{msg.email}</td>
                                    <td>{msg.subject}</td>
                                    <td>{getPriorityBadge(msg.priority)}</td>
                                    <td>
                                        <Button 
                                            variant="info" 
                                            size="sm" 
                                            onClick={() => handleViewMessage(msg)}
                                            style={{ marginRight: '5px' }}
                                        >
                                            View
                                        </Button>
                                        <Button 
                                            variant="danger" 
                                            size="sm" 
                                            onClick={() => handleDeleteMessage(msg.id)}
                                        >
                                            <FaTrash />
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>
            </div>

            {/* Message Detail Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Message from {selectedMessage?.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedMessage && (
                        <>
                            <Card style={{ marginBottom: '20px' }}>
                                <Card.Body>
                                    <Card.Title>Message Details</Card.Title>
                                    <hr />
                                    <p><strong>From:</strong> {selectedMessage.name} ({selectedMessage.email})</p>
                                    <p><strong>Date:</strong> {new Date(selectedMessage.createdAt).toLocaleString()}</p>
                                    <p><strong>Subject:</strong> {selectedMessage.subject}</p>
                                    <p><strong>Priority:</strong> {getPriorityBadge(selectedMessage.priority)}</p>
                                    <hr />
                                    <p><strong>Message:</strong></p>
                                    <p style={{ whiteSpace: 'pre-wrap' }}>{selectedMessage.message}</p>
                                </Card.Body>
                            </Card>

                            <Card>
                                <Card.Body>
                                    <Card.Title>Reply to Customer</Card.Title>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Your Reply</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={4}
                                            value={replyText}
                                            onChange={(e) => setReplyText(e.target.value)}
                                            placeholder="Type your reply here..."
                                        />
                                    </Form.Group>
                                    <Button variant="primary" onClick={handleReply}>
                                        <FaReply /> Send Reply
                                    </Button>
                                </Card.Body>
                            </Card>
                        </>
                    )}
                </Modal.Body>
            </Modal>
        </Container>
    );
}

export default AdminMessages;
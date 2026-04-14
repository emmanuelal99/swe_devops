import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button, Dropdown } from 'react-bootstrap';
import { FaTruck, FaMapMarkerAlt, FaEnvelope, FaSignOutAlt, FaUser, FaInfoCircle } from 'react-icons/fa';

function Navigation({ isAuthenticated, userRole, onLogout }) {
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        onLogout();
        navigate('/');
    };

    return (
        <Navbar expand="lg" className={`navbar-custom ${scrolled ? 'scrolled' : ''}`} fixed="top">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    <FaTruck style={{ marginRight: '10px' }} />
                    LogiTrack
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/track">Track Parcel</Nav.Link>
                        <Nav.Link as={Link} to="/request-delivery">Request Delivery</Nav.Link>
                        <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
                        <Nav.Link as={Link} to="/about">About</Nav.Link>
                        
                        {isAuthenticated ? (
                            <>
                                {userRole === 'admin' && (
                                    <Dropdown align="end">
                                        <Dropdown.Toggle variant="outline-light" size="sm">
                                            Admin
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item as={Link} to="/admin">Dashboard</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                )}
                                <Button variant="outline-light" onClick={handleLogout} className="ms-2">
                                    <FaSignOutAlt /> Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                <Nav.Link as={Link} to="/register">Register</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation;
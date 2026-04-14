import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

function Navigation({ isAuthenticated, userRole, onLogout }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout();
        navigate('/login');
    };

    return (
        <Navbar expand="lg" className="navbar-custom" fixed="top">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    🚚 LogiTrack
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/contact">Contact Us</Nav.Link>  {/* ADD THIS LINE */}
                        {isAuthenticated ? (
                            <>
                                {userRole === 'admin' && (
                                    <>
                                        <Nav.Link as={Link} to="/admin">Admin Panel</Nav.Link>
                                        <Nav.Link as={Link} to="/admin/messages">Messages</Nav.Link>  {/* ADD THIS LINE */}
                                    </>
                                )}
                                <Nav.Link as={Link} to="/tracking">Track Shipment</Nav.Link>
                                <Button 
                                    variant="outline-light" 
                                    onClick={handleLogout}
                                    style={{ marginLeft: '10px' }}
                                >
                                    Logout
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
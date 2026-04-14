import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Alert } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function Tracking({ trackingId: propTrackingId }) {
    const { id } = useParams();
    const trackingId = id || propTrackingId;
    const [shipment, setShipment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Mock data - In production, this would come from your Django API
    useEffect(() => {
        if (trackingId) {
            // Simulate API call
            setTimeout(() => {
                const mockShipment = {
                    tracking_id: trackingId,
                    status: 'ON_HOLD',
                    status_display: 'On Hold - Package stopped for clearance',
                    origin: 'London, UK',
                    destination: 'Manchester, UK',
                    current_location: 'Manchester Hub',
                    estimated_delivery: '2026-03-25',
                    distance: '205.7 Miles',
                    route: [
                        [51.5074, -0.1278], // London
                        [51.5074, -0.1278],
                        [52.4862, -1.8904], // Birmingham
                        [53.4808, -2.2426]  // Manchester
                    ],
                    history: [
                        { date: '2026-03-20 10:30', status: 'Pending', location: 'London Hub' },
                        { date: '2026-03-21 08:15', status: 'Dispatched', location: 'London Hub' },
                        { date: '2026-03-22 14:45', status: 'In Transit', location: 'En Route' },
                        { date: '2026-03-23 09:00', status: 'On Hold', location: 'Manchester Hub' }
                    ]
                };
                setShipment(mockShipment);
                setLoading(false);
            }, 1000);
        } else {
            setError('No tracking ID provided');
            setLoading(false);
        }
    }, [trackingId]);

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

    if (loading) {
        return (
            <Container className="tracking-container">
                <div className="spinner"></div>
                <p style={{ textAlign: 'center' }}>Loading shipment details...</p>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="tracking-container">
                <Alert variant="danger">
                    <Alert.Heading>Error</Alert.Heading>
                    <p>{error}</p>
                </Alert>
            </Container>
        );
    }

    if (!shipment) {
        return (
            <Container className="tracking-container">
                <Alert variant="warning">
                    <Alert.Heading>Shipment Not Found</Alert.Heading>
                    <p>Please check your tracking ID and try again.</p>
                </Alert>
            </Container>
        );
    }

    return (
        <Container className="tracking-container">
            <div className="shipment-info">
                <h3>Tracking ID: {shipment.tracking_id}</h3>
                <p><strong>Route:</strong> {shipment.origin} → {shipment.destination}</p>
                <p><strong>Total Distance:</strong> {shipment.distance}</p>
                <p><strong>Current Status:</strong> 
                    <span className={`status-badge ${getStatusClass(shipment.status)}`}>
                        {shipment.status_display}
                    </span>
                </p>
            </div>

            <div className="map-container">
                <MapContainer 
                    center={[52.5, -1.5]} 
                    zoom={7} 
                    style={{ height: '100%', width: '100%' }}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Polyline 
                        positions={shipment.route} 
                        color="#667eea" 
                        weight={4}
                    />
                    <Marker position={shipment.route[0]}>
                        <Popup>Origin: {shipment.origin}</Popup>
                    </Marker>
                    <Marker position={shipment.route[shipment.route.length - 1]}>
                        <Popup>Destination: {shipment.destination}</Popup>
                    </Marker>
                </MapContainer>
            </div>

            <div className="timeline">
                <h4>Tracking History</h4>
                {shipment.history.map((event, index) => (
                    <div key={index} className="timeline-item">
                        <div className="timeline-dot"></div>
                        <div style={{ flex: 1 }}>
                            <strong>{event.date}</strong>
                            <p style={{ margin: 0 }}><strong>{event.status}</strong> - {event.location}</p>
                        </div>
                    </div>
                ))}
            </div>
        </Container>
    );
}

export default Tracking;
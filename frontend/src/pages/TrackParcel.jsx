import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import { api } from '../services/api';

// Fix Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function TrackParcel() {
    const { trackingId } = useParams();
    const navigate = useNavigate();
    const [inputId, setInputId] = useState(trackingId || '');
    const [parcel, setParcel] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (trackingId) {
            fetchParcel(trackingId);
        }
    }, [trackingId]);

    const fetchParcel = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const data = await api.trackParcel(id);
            if (data && data.tracking_id) {
                setParcel(data);
            } else {
                setError('Parcel not found. Please check the tracking ID.');
            }
        } catch (err) {
            setError('Failed to fetch parcel details. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleTrack = () => {
        if (inputId.trim()) {
            navigate(`/track/${inputId}`);
            fetchParcel(inputId);
        }
    };

    const getStatusClass = (status) => {
        const classes = {
            'PENDING': 'status-pending',
            'CONFIRMED': 'status-confirmed',
            'IN_TRANSIT': 'status-in_transit',
            'DELIVERED': 'status-delivered'
        };
        return classes[status] || 'status-pending';
    };

    // Mock route coordinates (replace with actual from backend)
    const routeCoordinates = [
        [51.5074, -0.1278], // London
        [52.4862, -1.8904], // Birmingham
        [53.4808, -2.2426]  // Manchester
    ];

    return (
        <Container className="py-4">
            <Card className="tracking-card">
                <Card.Body>
                    <h4 className="text-center">Track Your Parcel</h4>
                    <div className="tracking-input-group">
                        <Form.Control
                            type="text"
                            placeholder="Enter Tracking ID"
                            value={inputId}
                            onChange={(e) => setInputId(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleTrack()}
                        />
                        <Button className="btn-primary-custom" onClick={handleTrack} disabled={loading}>
                            {loading ? 'Tracking...' : 'Track'}
                        </Button>
                    </div>
                </Card.Body>
            </Card>

            {loading && <div className="spinner"></div>}
            
            {error && <Alert variant="danger" className="mt-4">{error}</Alert>}

            {parcel && (
                <div className="mt-4">
                    <Card className="mb-4">
                        <Card.Body>
                            <h5>Tracking ID: {parcel.tracking_id}</h5>
                            <p><strong>Status:</strong> <span className={`status-badge ${getStatusClass(parcel.status)}`}>{parcel.status}</span></p>
                            <p><strong>Current Location:</strong> {parcel.current_location || 'Processing'}</p>
                            <p><strong>Estimated Delivery:</strong> {parcel.estimated_delivery || 'To be updated'}</p>
                        </Card.Body>
                    </Card>

                    {/* Map */}
                    <div className="map-container mb-4">
                        <MapContainer center={[52.5, -1.5]} zoom={6} style={{ height: '400px', width: '100%' }}>
                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                            <Polyline positions={routeCoordinates} color="#667eea" weight={4} />
                            <Marker position={routeCoordinates[0]}>
                                <Popup>Origin</Popup>
                            </Marker>
                            <Marker position={routeCoordinates[routeCoordinates.length - 1]}>
                                <Popup>Destination</Popup>
                            </Marker>
                        </MapContainer>
                    </div>

                    {/* Timeline */}
                    <Card>
                        <Card.Body>
                            <h5>Tracking History</h5>
                            <div className="timeline">
                                {parcel.history?.map((event, index) => (
                                    <div key={index} className="timeline-item">
                                        <div className="timeline-dot"></div>
                                        <div className="timeline-content">
                                            <div className="d-flex justify-content-between">
                                                <strong>{event.status}</strong>
                                                <small>{new Date(event.timestamp).toLocaleString()}</small>
                                            </div>
                                            <p className="mb-0">{event.location}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            )}
        </Container>
    );
}

export default TrackParcel;
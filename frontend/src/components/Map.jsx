import React, { useEffect, useRef } from "react";
import io from "socket.io-client";
import L from "leaflet";

function Map() {
    const mapRef = useRef(null);
    const socketRef = useRef(null);
    const markersRef = useRef({});

    useEffect(() => {
        socketRef.current = io();

        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    socketRef.current.emit("sendLocation", { latitude, longitude });
                },
                (error) => {
                    console.log(error);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0,
                }
            );
        }

        const map = L.map(mapRef.current).setView([0, 0], 10);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: "Tarun"
        }).addTo(map);

        socketRef.current.on('receiveLocation', (data) => {
            const { id, latitude, longitude } = data;

            if (markersRef.current[id]) {
                markersRef.current[id].setLatLng([latitude, longitude]);
            } else {
                markersRef.current[id] = L.marker([latitude, longitude]).addTo(map);
            }
            map.setView([latitude, longitude], 20);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: "Tarun"
            }).addTo(map);
        });

        socketRef.current.on('userDisconnect', (id) => {
            if (markersRef.current[id]) {
                mapRef.current.removeLayer();
                delete markersRef.current[id];
            }
        });

        return () => {
            map.remove();
            socketRef.current.disconnect();
        };
    }, []);

    return (
        <div
            ref={mapRef}
            className="map"
            style={{ height: "100vh", width: "100vw" }}
        >
            Map
        </div>
    );
}

export default Map;

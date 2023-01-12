import React, { useState } from "react";
import GoogleMapReact from 'google-map-react';
import GoogleMapPopper from "./google-map-popper";



export function GoogleMap() {

    const [coordinates, setCoordinates] = useState({ lat: 32.0853, lng: 34.7818 })
    const zoom = 8

    const handleClick = ({ lat, lng }) => {
        setCoordinates({ lat, lng })
    }

    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '100vh', width: '100%', margin: 'auto' }}>
            <GoogleMapReact
                onClick={handleClick}
                bootstrapURLKeys={{ key: "AIzaSyBiiIc69TQVyevWG707rsniMhcnFEgSok8" }}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={zoom}
            >
                <GoogleMapPopper
                    onClick={handleClick}
                    lat={32.1141}
                    lng={34.9728}
                />
                <GoogleMapPopper
                    onClick={handleClick}
                    lat={32.0853}
                    lng={34.7818}
                />
                <GoogleMapPopper
                    onClick={handleClick}
                    lat={32.7940}
                    lng={34.9896}
                />
            </GoogleMapReact>
        </div>
    );
}
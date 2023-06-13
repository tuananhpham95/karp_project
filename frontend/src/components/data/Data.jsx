import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import {useLocation} from "react-router-dom";

const containerStyle = {
    width: '100%',
    height: '400px'
};

const Data = ({ address }) => {
    const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);


    useEffect(() => {
        fetchLocations();
        fetchAddress();
    }, []);

    const fetchLocations = async () => {
        try {
            const response = await axios.get('http://localhost:3001/getAllLocations');
            setLocations(response.data.locations);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchAddress = async () => {
        try {
            const response = await axios.get('http://localhost:3001/getAllImages');
            setSelectedLocation(response.data.data[0].address);
            console.log("address",response.data.data[0].address);
        } catch (error) {
            console.log(error);
        }
    };

    const handleMarkerClick = (location) => {
        setSelectedLocation(location);
    };

    const handleCloseInfoWindow = () => {
        setSelectedLocation(null);
    };

    return (
        <GoogleMap mapContainerStyle={containerStyle} center={{ lat: parseFloat(locations[0]?.lat), lng: parseFloat(locations[0]?.lng) }} zoom={16}>
            {locations.map((location) => (
                <Marker key={location._id} position={{ lat: parseFloat(location.lat), lng: parseFloat(location.lng) }}/>
            ))}
            {selectedLocation && (
                <InfoWindow
                    position={{ lat: parseFloat(selectedLocation.lat), lng: parseFloat(selectedLocation.lng) }}
                    onCloseClick={handleCloseInfoWindow}
                >
                    <div>
                        <p>Address:{selectedLocation} </p>
                    </div>
                </InfoWindow>
            )}
        </GoogleMap>
    );
};

export default Data;

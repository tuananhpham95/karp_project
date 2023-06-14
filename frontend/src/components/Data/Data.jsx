import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';


const Data = ({ address }) => {
    const [locations, setLocations] = useState([]);



    useEffect(() => {
        fetchLocations();
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

    return (
        <GoogleMap mapContainerClassName="container" center={{ lat: parseFloat(locations[0]?.lat), lng: parseFloat(locations[0]?.lng) }} zoom={16}>
            {locations.map((location) => (
                <Marker key={location._id} position={{ lat: parseFloat(location.lat), lng: parseFloat(location.lng) }}/>
            ))}
        </GoogleMap>
    );
};

export default Data;

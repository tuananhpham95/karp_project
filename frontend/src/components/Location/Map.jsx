import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import React from "react";

const Map = ({ location }) => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyDJpivUV2p5gTQeEKY3kfvXuU9FrZ5ey2k",
    });

    if (!isLoaded) return <div>Loading...</div>;
    return (
        <GoogleMap
            zoom={10}
            center={location}
            mapContainerClassName="w-[400px] h-[400px]"
        >
            <Marker position={location} />
        </GoogleMap>
    );
};

export default Map;

import {GoogleMap, useLoadScript, MarkerF} from "@react-google-maps/api";
import React from "react";

const Map = ({location}) => {
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: "AIzaSyDJpivUV2p5gTQeEKY3kfvXuU9FrZ5ey2k",
    });

    if (!isLoaded) return <div>Loading...</div>;
    return (
        <GoogleMap
            zoom={5}
            center={location}
            mapContainerClassName="w-[300px] h-[200px]"
        >
            <MarkerF position={location}/>
        </GoogleMap>
    );
};

export default Map;

import React, { useState } from "react";
import axios from "axios";
import Map from "./Map";

const Location = () => {
    const [location, setLocation] = useState(null);
    const [address, setAddress] = useState("");
    const getAddressFromCoordinates = async (latitude, longitude) => {
        try {
            const res = await axios.get(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyDJpivUV2p5gTQeEKY3kfvXuU9FrZ5ey2k`
            );

            if (res.data.status === "OK") {
                console.log(res.data)
                const address = res.data.results[0].formatted_address;
                setAddress(address);
                console.log("Address:", address);
            } else {
                console.log("Geocoding failed:", res.data.status);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    function shareLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(saveLocation);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }

    function saveLocation(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
        window.open(url);
        const location = { lat: latitude, lng: longitude };
        setLocation(location);
        getAddressFromCoordinates(latitude, longitude);
        axios
            .post("http://localhost:3001/location", location, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((res) => {
                const data = res.data;
                console.log("data", data);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <div className="container flex flex-col justify-center items-center gap-4">
            <button
                onClick={shareLocation}
                className="w-[400px] h-8 bg-slate-600 rounded-[15px] text-[#FFF]"
            >
                Share your location
            </button>
            <div className="map">
                {location && <Map location={location} />}
                <div>Address: {address}</div>
            </div>

            <button className="w-[400px] h-8 bg-slate-600 rounded-[15px] text-[#FFF]">

                laddar upp din bild
            </button>
        </div>
    );
};

export default Location;

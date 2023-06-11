import React from "react";
import axios from "axios";

const Location = () => {
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
      <div className="map"></div>
      <button className="w-[400px] h-8 bg-slate-600 rounded-[15px] text-[#FFF]">
        laddar upp din bild
      </button>
    </div>
  );
};

export default Location;

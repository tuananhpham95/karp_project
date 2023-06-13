import{ useState} from "react";
import axios from "axios";
import Map from "./Map";
import NavBar from "../NavBar/NavBar.jsx";
import {useNavigate} from "react-router-dom";


const Location = () => {
    const [location, setLocation] = useState(null);
    const [address, setAddress] = useState("");
    const [showSharePopup, setShowSharePopUp] = useState(false);
    const [image, setImage] = useState("");
    const [input, setInput] = useState("");
    const [allImages, setAllImages] = useState("");

    const navigate = useNavigate()


    const getAddressFromCoordinates = async (latitude, longitude) => {
        try {
            const res = await axios.get(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyDJpivUV2p5gTQeEKY3kfvXuU9FrZ5ey2k`
            );

            if (res.data.status === "OK") {
                const address = res.data.results[0].formatted_address;
                setAddress(address);
            } else {
                console.log("Geocoding failed:", res.data.status);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
    // const saveAddressToDatabase = async (address) => {
    //     try {
    //         await axios.post("http://localhost:3001/saveAddressToDatabase", { address });
    //         console.log("Address saved to the database successfully.");
    //     } catch (error) {
    //         console.error("Error saving address:", error);
    //     }
    // };
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
        // saveAddressToDatabase(address)
        axios
            .post("http://localhost:3001/location", location, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((res) => {
                const data = res.data;
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const handleShareOnClick = () => {
        setShowSharePopUp(true)
    }

    const handleClosePopupOnClick = () => {
        setShowSharePopUp(false);
    }

    function convertToBase64(e) {
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            console.log(reader.result);
            setImage(reader.result);
        };

        reader.onerror = error => {
            console.log("Error: ", error);
        };
    }

    const handleSubmit = async () => {
        try {
            const res = await axios.post("http://localhost:3001/upload-file", {
                base64: image,
                address:input,
            });

            console.log("data", res.data);
            navigate("/data")
        } catch (error) {
            console.error("Error:", error);
        }

    }
    const handleInput = (e) => {
        setInput(e.target.value);
    }

    const handleAllPicturesOnClick = async () => {
        try {
            const res = await axios.get("http://localhost:3001/getAllImages");
            setAllImages(res.data);

        } catch (error) {
            console.error("Error:", error);
        }
    }

    return (
        <div className="container relative flex flex-col justify-center items-center gap-4">
            <button
                onClick={handleShareOnClick}
                className="w-[300px] h-8 bg-slate-600 rounded-[15px] text-[#FFF]"
            >
                Share your location
            </button>

            {showSharePopup &&
                <div className="fixed inset-0 bg-[#000000A6] bg-opacity-25 backdrop-blur-none flex flex-col justify-center items-center">
                    <div className="container relative rounded-t-lg h-[720px] bg-[#FFF] flex flex-col justify-center items-center gap-[10px]">
                        <button onClick={handleClosePopupOnClick} className="absolute top-[16px] right-[16px]">X</button>
                        {location === null ?
                            <button
                                onClick={shareLocation}
                                className="w-[200px] h-8 bg-slate-600 rounded-[15px] text-[#FFF]"
                            >
                                Share your location
                            </button>
                            :
                            <div className="flex flex-col items-center">
                                {location && <Map location={location} />}
                                <p>Address: {address}</p>
                            </div>
                        }
                        <div className=" container text-center cursor-pointer w-[200px] h-8 bg-slate-600 rounded-[15px] text-[#FFF]">
                            <label htmlFor="files">Ladda upp din bild</label>
                            <input id="files" style={{visibility: "hidden"}} type="file" onChange={convertToBase64}/>
                        </div>

                        {image === "" || image === null ? ""
                            :
                            <>
                                <img className="container w-[300px] h-[200px]" src={image}/>
                                <input placeholder="Address" className="container border-2 border-rose-300 rounded-[5px] ml-10 w-[300px] h-[30px]" type="text" size={50} onChange={handleInput}/>
                            </>
                        }

                        <button className="container w-[100px] h-8 bg-slate-600 rounded-[15px] text-[#FFF]" onClick={handleSubmit}>Submit</button>
                    </div>
                // </div>
            }
            <button
                onClick={handleAllPicturesOnClick}
                className="w-[300px] h-8 bg-slate-600 rounded-[15px] text-[#FFF]"
            >
                Lediga platser
            </button>
            <NavBar></NavBar>
        </div>
    );
};

export default Location;

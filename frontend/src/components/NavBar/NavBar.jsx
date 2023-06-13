import React, { useState } from "react";
import {useNavigate} from "react-router-dom";

const NavBar = () => {

    const [open, setOpen] = useState(false);
    const navigate = useNavigate()
    const handleLogout = () => {
        navigate('/');
    };
    const handleSettings = () => {
        setOpen(!open);
    };
    return (
        <div className="container flex justify-around absolute bottom-0 h-[70px] bg-[#D9D9D9] w-full rounded-t-lg">
            <div
                className={` duration-300 container absolute bottom-0 left-0 flex flex-col justify-around items-center bg-[#D9D9D9] ${
                    open ? "w-[250px]" : "w-[0px]"
                }`}
            >
                <div
                    className={` flex flex-col gap-[80px] items-center justify-around ${
                        !open && "scale-0"
                    } `}
                >
                    <div className=" cursor-pointer relative flex flex-col">
                        <p className="absolute bottom-[150px] left-[-50px] ">Settings</p>
                        <img src="./assets/Address.png" alt="" />
                        <p></p>
                    </div>
                    <div className="flex flex-col gap-[40px]">
                        <div className=" cursor-pointer flex gap-[10px]">
                            <img src="./assets/User.png" alt="" />
                            <p>Edit profile</p>
                        </div>
                        <div className=" cursor-pointer flex gap-[10px]">
                            <img src="./assets/Notification.png" alt="" />
                            <p>Notifikation</p>
                        </div>
                        <div className=" cursor-pointer flex gap-[10px]">
                            <img src="./assets/Question.png" alt="" />
                            <p>Help</p>
                        </div>
                        <div className="cursor-pointer flex gap-[10px]">
                            <img src="./assets/eye.png" alt="" />
                            <p>Darktheme</p>
                        </div>
                        <div className="cursor-pointer flex gap-[10px]">
                            <img src="./assets/Union.png" alt="" />
                            <p>Accessibility</p>
                        </div>
                    </div>
                    <div className="cursor-pointer flex gap-[10px]"  onClick={handleLogout}>
                        <img src="./assets/logout.png" alt="" />
                        <p>Log out</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col cursor-pointer justify-center items-center">
                <img src="./assets/Save.png" alt="" />
                <p>Saved</p>
            </div>
            <div className="flex flex-col cursor-pointer justify-center items-center">
                <img src="./assets/Address.png" alt="" />
                <p>Home</p>
            </div>
            <div className="flex flex-col cursor-pointer justify-center items-center">
                <img src="./assets/Address.png" alt="" />
                <p>Community</p>
            </div>
            <div
                onClick={handleSettings}
                className=" cursor-pointer flex flex-col justify-center items-center"
            >
                <img src="./assets/Gear.png" alt="" />
                <p>Settings</p>
            </div>
        </div>
    );
};

export default NavBar;

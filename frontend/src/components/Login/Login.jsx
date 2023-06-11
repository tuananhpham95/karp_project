import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/login", {
        username,
        password,
      });
      const data = res.data;
      console.log(data);
      navigate("/location");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="container flex items-center flex-col gap-[30px]">
      <div className="login-logo mr-[110px]">
        <p className="Logo mt-[50px] text-primary font-bold text-[32px]">
          Logga in
        </p>
        <p className="text-stuckgrey">
          Ny användare?{" "}
          <span className="text-luckyblue underline cursor-pointer">
            <Link to="/register">skapa ett konto</Link>
          </span>
        </p>
      </div>
      <form onSubmit={handleLogin} className=" flex flex-col gap-[30px]">
        <input
          onChange={(e) => setUsername(e.target.value)}
          className="w-[327px] h-[64px] rounded-[15px] border border-stuckgrey"
          type="text"
          id="username"
          placeholder="E-post eller användarnamn"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          className="w-[327px] h-[64px] rounded-[15px] border border-stuckgrey"
          type="password"
          id="password"
          placeholder="Lösenord"
        />
        <p className="text-luckyblue underline cursor-pointer">
          Glömt lösenordet?
        </p>
        <button
          className="rounded-[15px] bg-stuckgrey w-[327px] h-[66px] font-bold text-[18px]"
          type="submit"
        >
          Logga in
        </button>
      </form>
      <div className="btn flex flex-col gap-[15px] items-center">
        <p className="text-stuckgrey font-medium">eller</p>
        <button className="bg-stuckgrey w-[300px] h-[50px] rounded-[30px]">
          Fortsätt med Google
        </button>
        <button className="bg-stuckgrey w-[300px] h-[50px] rounded-[30px] text-[#FFF]">
          Fortsätt med Facebook
        </button>
        <button className="bg-black w-[300px] h-[50px] rounded-[30px] text-[#FFF]">
          Fortsätt med Apple
        </button>
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [popup, setPopup] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      //validation
      if (!username || !password) {
        setError("Missing username or password");
        return;
      }
      if (confirmPassword !== password) {
        setError("The password doesn't match");
        return;
      }
      if (password.length < 5) {
        setError("your password is too short");
        return;
      }
      const res = await axios.post("http://localhost:3001/register", {
        username,
        password,
      });
      const data = res.data;
      console.log(data);
      setPopup(true);
    } catch (error) {
      setError(`${error.response.data.message}`);
    }
  };
  const handleNavigateToLogin = () => {
    navigate("/location");
  };
  return (
    <div className="container flex flex-col justify-center items-center">
      <div className="mt-[50px] text-[32px] font-bold text-primary">
        Skapa ett konto
      </div>
      <form
        onSubmit={handleRegister}
        className="flex flex-col gap-[10px] mt-[50px]"
      >
        <input
          onChange={(e) => setUsername(e.target.value)}
          className="w-[337px] h-[43px] border border-stuckgrey rounded-[5px]"
          type="text"
          placeholder="Användarnamn"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          className="w-[337px] h-[43px] border border-stuckgrey rounded-[5px]"
          type=""
          placeholder="Lösenord"
        />
        <input
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-[337px] h-[43px] border border-stuckgrey rounded-[5px]"
          type=""
          placeholder="Bekräfta lösenord"
        />
        <button
          className="mt-[80px] rounded-[15px] bg-stuckgrey w-[327px] h-[66px] text-[18px] font-semibold text-[#FFF]"
          type="submit"
        >
          Skapa konto
        </button>
      </form>
      {error && <div className="text-red-500 mt-4">{error}</div>}
      {popup && (
        <div className="fixed inset-0 bg-[#000000A6] bg-opacity-25 backdrop-blur-none flex justify-center items-center ">
          <div className="container rounded-[20px] w-[272px] h-[387px] bg-[#FFF] flex flex-col justify-center items-center gap-[30px] ">
            <div className="relative">
              <img src="./Vector.png" alt="" />
              <img
                className="absolute top-[10px] left-[20px]"
                src="./v.png"
                alt=""
              />
            </div>
            <div>
              <p className=" mb-5 font-semibold text-[23px] text-vanitygrey text-center">
                Grattis
              </p>
              <p className="text-center text-stuckgrey">
                ditt konto är klart att användas
              </p>
            </div>
            <button
              onClick={handleNavigateToLogin}
              className="w-[123px] h-30 rounded-[30px] border-2 font-semibold border-stuckgrey"
            >
              Kom igång
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;

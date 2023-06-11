import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container flex flex-col gap-[60px] w-[320px] h-[39px]">
      <h1 className="mt-[50px] text-primary font-bold text-[32px]">
        Välkommen till KARP
      </h1>
      <div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic
          doloribus, dolor, excepturi consequuntur quibusdam, ea quasi dolore
          officia temporibus at cumque magnam sint animi deleniti saepe
          recusandae nemo? Nostrum optio laudantium impedit quia ipsam!
          Blanditiis esse voluptas at quidem quo repudiandae totam quod, quae
          eius minima repellat distinctio autem ut!
        </p>
      </div>
      <div className="mt-[35px] font-semibold text-[21px]">
        <Link to="/parking">Hitta lediga platser i närheten</Link>
      </div>
      <div className="font-semibold text-[21px]">
        <Link to="/register">Skapa ett konto</Link>
      </div>
      <div className="font-semibold text-[21px]">
        <Link to="/login">Logga in</Link>
      </div>
    </div>
  );
};

export default Home;

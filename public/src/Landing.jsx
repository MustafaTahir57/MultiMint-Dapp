import React, { useState } from "react";
import App from "./App";
import img from "./assets/mythic.png";
import monster from "./assets/monsterheader.png";
import my from "./assets/mainlogo.png";
import somman from "./assets/MintNow.png";
import Mint_area from "./Mint_area";
function Landing() {
  const [address,setAddress] = useState('')
  return (
    <div className="constainer mt-3">
      <div className="land">
        <div className="row">
          <div className="col-12 col-lg-4">
            <img className="header-my" src={img} alt="" />
          </div>
          <div className="col-12 col-lg-4">
            <img className="header-img" src={my} alt="" />
          </div>
          <div className="col-12 col-lg-4">
            <img className="header-mo" src={monster} alt="" />
          </div>
        </div>
      </div>
      <div className="div mt-5">
        <h4 className="head">
          <img src={somman} className="header-m" />
        </h4>
      </div>
      <div className="app_center">
        <App setAddress={setAddress}/>
      </div>

      <Mint_area address={address}/>
    </div>
  );
}

export default Landing;

import React, { useState } from "react";
import "../scss/Register.scss";
import Wave from "../img/wave.svg";
import Navbar from "../components/Navbar";
import "../scss/Settings.scss";
import { Link } from "react-router-dom";

const Settings = () => {
  return (
    <div className="settings">
      <Navbar />
      <div className="settings-container">
        <div className="register-container__bgc">
          <img src={Wave} alt="" />
        </div>

        <div className="settings-options">
          <Link to="changemail">
            <button>CHANGE EMAIL</button>
          </Link>
          <Link to="changepassword">
            <button>CHANGE PASSWORD</button>
          </Link>
          <Link to="deleteaccount">
            <button>DELETE ACCOUNT</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Settings;

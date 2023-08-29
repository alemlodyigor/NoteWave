import React from "react";
import Wave from "../img/wave.svg";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const Settings = () => {
  return (
    <div className="settings">
      <Navbar />
      <div className="settings-container">
        <div className="register-container__bgc">
          <img src={Wave} alt="" />
        </div>
        <div className="settings-options">
          <Link to="archivednotes">
            <button>ARCHIVED NOTES</button>
          </Link>
          <Link to="changemail">
            <button>CHANGE EMAIL</button>
          </Link>
          <Link to="changepassword">
            <button>CHANGE PASSWORD</button>
          </Link>
          <Link to="deleteaccount">
            <button>DELETE ACCOUNT</button>
          </Link>
          <button onClick={() => signOut(auth)}>LOG OUT</button>
        </div>
      </div>
    </div>
  );
};

export default Settings;

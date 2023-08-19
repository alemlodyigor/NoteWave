import React, { useContext, useState } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "../scss/Navbar.scss";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  const [options, setOptions] = useState(false);

  const handleProfile = () => {
    setOptions(true);
  };

  return (
    <div className="nav">
      <h1 className="nav__title">
        <Link to="/">NoteWave</Link>
      </h1>
      <div className="nav__options">
        <ul className="nav__options__list">
          {currentUser && !options && (
            <Link to="settings" onClick={handleProfile}>
              <li className="nav__options__list__element">
                <img
                  src={currentUser.photoURL}
                  alt=""
                  className="nav__options__list__element__img"
                />
              </li>
            </Link>
          )}
          {!currentUser && (
            <>
              <li className="nav__options__list__element">
                <Link to="/login">LOGIN</Link>
              </li>
              <li className="nav__options__list__element">
                <Link to="/register">REGISTER</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

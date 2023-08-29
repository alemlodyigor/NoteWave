import React, { useContext, useState } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  const [options, setOptions] = useState(false);

  const handleProfile = () => {
    if (!options) setOptions(true);
    else setOptions(false);
  };

  return (
    <div className="nav">
      <h1 className="nav__title">
        <Link to="/">NoteWave</Link>
      </h1>
      <div className="nav__options">
        <ul className="nav__options__list">
          {currentUser && (
            <li className="nav__options__list__element">
              <img
                src={currentUser.photoURL}
                alt=""
                className="nav__options__list__element__img"
                onClick={handleProfile}
              />
              {options && (
                <ul className="nav__options__list__element__profile">
                  <li className="nav__options__list__element__profile__element">
                    Theme switch
                  </li>
                  <li className="nav__options__list__element__profile__element">
                    Archived
                  </li>
                  <li className="nav__options__list__element__profile__element">
                    <Link to="settings">Settings</Link>
                  </li>
                  <li
                    className="nav__options__list__element__profile__element"
                    onClick={() => signOut(auth)}
                  >
                    Logout
                  </li>
                </ul>
              )}
            </li>
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

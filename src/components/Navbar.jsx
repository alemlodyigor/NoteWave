import React from "react";
import "../scss/Navbar.scss";
const Navbar = () => {
  return (
    <div className="nav">
      <h1 className="nav__title">NoteWave</h1>
      <div className="nav__options">
        <ul className="nav__options__list">
          <li className="nav__options__list__element">LOGIN</li>
          <li className="nav__options__list__element">REGISTER</li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

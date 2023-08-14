import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import "../scss/Register.scss";
import Navbar from "../components/Navbar";

const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const nick = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    try {
    } catch (error) {
      setErr(true);
    }
  };

  return (
    <div className="register">
      <Navbar />
      <div className="register-container">
        <form className="register-form" onSubmit={handleSubmit}>
        <h2 className="register-form__title">SIGN UP FOR FREE</h2>
          <label htmlFor="nick">Name</label>
          <input
            className="register-form__input"
            type="text"
            id="nick"
            required
          />
          <label htmlFor="email">Email</label>
          <input
            className="register-form__input"
            type="email"
            id="email"
            required
          />
          <label htmlFor="password1">Password</label>
          <input
            className="register-form__input"
            type="password"
            id="password1"
            required
          />
          {err && <span>Something went wrong!</span>}
          {loading && <span>Registering</span>}
          <input
            className="register-form__btn"
            type="submit"
            value="JUMP INTO WAVE"
          />
        </form>
      </div>
    </div>
  );
};

export default Register;

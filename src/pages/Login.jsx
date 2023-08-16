import React, { useState } from "react";
import "../scss/Register.scss";
import Navbar from "../components/Navbar";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import Wave from "../img/wave.svg";

const Login = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      setErr(true);
    }
    setLoading(false);
  };

  return (
    <div className="register">
      <Navbar />
      <div className="register-container">
        <div className="register-container__bgc">
          <img src={Wave} alt="" />
        </div>
        <form className="register-form" onSubmit={handleSubmit}>
          <h2 className="register-form__title">LOGIN</h2>
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
          <button type="submit" className="register-form__btn">
            {!loading && "COME BACK ON WAVE"}
            {loading && "BIG WAVE IS COMING"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

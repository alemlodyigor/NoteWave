import React, { useState } from "react";
import "../scss/Register.scss";
import Navbar from "../components/Navbar";

const Login = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSubmit = () => {};

  return (
    <div className="register">
      <Navbar />
      <div className="register-container">
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
          {loading && <span>Registering</span>}
          <input
            className="register-form__btn"
            type="submit"
            value="COME BACK ON WAVE"
          />
        </form>
      </div>
    </div>
  );
};

export default Login;

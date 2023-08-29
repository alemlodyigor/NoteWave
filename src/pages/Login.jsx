import React, { useState } from "react";
import Navbar from "../components/Navbar";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import Wave from "../img/wave.svg";

const Login = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reset, setReset] = useState(false);
  const [forgot, setForgot] = useState(false);
  const navigate = useNavigate();

  const switchForms = () => {
    setReset(true);
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;

    try {
      await sendPasswordResetEmail(auth, email);
      setForgot(true);
    } catch (error) {
      setForgot(false);
      setErr(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      const userCrednetial = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCrednetial.user.emailVerified);
      if (userCrednetial.user && userCrednetial.user.emailVerified) {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
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
        <div className="register-form__container">
          {!reset ? (
            <>
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
                <button
                  className="register-form__btn-reset"
                  onClick={switchForms}
                >
                  Forgot password?
                </button>
                {err && <span>Something went wrong!</span>}
                <button type="submit" className="register-form__btn">
                  {!loading && "COME BACK ON WAVE"}
                  {loading && "BIG WAVE IS COMING"}
                </button>
              </form>
            </>
          ) : (
            <form className="register-form" onSubmit={handleForgotPassword}>
              <label htmlFor="emil">Enter your email:</label>
              <input
                className="register-form__input"
                type="email"
                id="email"
                required
              />
              <button type="submit" className="register-form__btn">
                {forgot ? "Check your email!" : "Send reset email"}
                {err && "Something went wrong!"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;

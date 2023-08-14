import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase";

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
      <form onSubmit={handleSubmit}>
        <label htmlFor="nick">Nick</label>
        <input type="text" id="nick" required />
        <label htmlFor="email">Email</label>
        <input type="email" id="email" required />
        <label htmlFor="password1">Password</label>
        <input type="password" id="password1" required />
        {err && <span>Something went wrong!</span>}
        {setLoading && <span>Registering</span>}
        <input type="submit" />
      </form>
    </div>
  );
};

export default Register;

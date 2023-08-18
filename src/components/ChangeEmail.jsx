import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  updateEmail,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { db } from "../firebase";
import Navbar from "./Navbar";
import Wave from "../img/wave.svg";

const ChangeEmail = () => {
  const { currentUser } = useContext(AuthContext);
  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");

  const hadnleChangeEmail = async () => {
    try {
      const credential = EmailAuthProvider.credential(
        currentUser.email,
        password
      );
      await reauthenticateWithCredential(currentUser, credential);

      await updateEmail(currentUser, newEmail);

      const userRef = db.collection("users").doc(currentUser.uid);
      await userRef.update({ email: newEmail });

      setSuccess("Email changed successfully");
      setErr("");
    } catch (error) {
      setErr("Failed to change email");
    }
  };

  const handleNewEmailChange = (e) => {
    setNewEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="register">
      <Navbar />
      <div className="register-container">
        <div className="register-container__bgc">
          <img src={Wave} alt="" />
        </div>
        <form className="register-form" onSubmit={hadnleChangeEmail}>
          <h2 className="register-form__title">CHANGE EMAIL</h2>
          <label htmlFor="newemail">Enter new email</label>
          <input
            type="email"
            id="newemail"
            className="register-form__input"
            value={newEmail}
            onChange={handleNewEmailChange}
            required
          />
          <label htmlFor="passwd">Enter your password</label>
          <input
            type="password"
            id="passwd"
            className="register-form__input"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          {err && <p>{err}</p>}
          {success && <p>{success}</p>}
          <input
            type="submit"
            value="Change Email"
            className="register-form__btn"
          />
        </form>
      </div>
    </div>
  );
};

export default ChangeEmail;

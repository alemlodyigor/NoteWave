import React, { useContext, useState } from "react";
import Navbar from "./Navbar";
import "../scss/Register.scss";
import Wave from "../img/wave.svg";
import { AuthContext } from "../context/AuthContext";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";

const ChangePassword = () => {
  const { currentUser } = useContext(AuthContext);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setError("Password do not match");
      return;
    }

    const credentials = EmailAuthProvider.credential(
      currentUser.email,
      currentPassword
    );

    try {
      await reauthenticateWithCredential(currentUser, credentials);

      await updatePassword(currentUser, newPassword);

      setSuccess("Password updated succesfully");
      setError("");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      setError(
        "Failed to update password. Make sure your current password is correct"
      );
    }
  };

  return (
    <div className="register">
      <Navbar />
      <div className="register-container">
        <div className="register-container__bgc">
          <img src={Wave} alt="" />
        </div>
        <form className="register-form" onSubmit={handleChangePassword}>
          <h2 className="register-form__title">CHANGE PASSWORD</h2>
          <label htmlFor="curpasswd">Enter current password</label>
          <input
            type="password"
            id="curpasswd"
            className="register-form__input"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
          <label htmlFor="newpasswd1">Enter new password</label>
          <input
            type="password"
            id="newpasswd1"
            className="register-form__input"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <label htmlFor="newpasswd2">Confirm new password</label>
          <input
            type="password"
            id="newpasswd2"
            className="register-form__input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {error && <p>{error}</p>}
          {success && <p>{success}</p>}
          <input
            type="submit"
            value="Change password"
            className="register-form__btn"
          />
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;

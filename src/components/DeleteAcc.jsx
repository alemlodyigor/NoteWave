import React, { useContext, useState } from "react";
import Wave from "../img/wave.svg";
import { AuthContext } from "../context/AuthContext";
import {
  deleteUser,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import {
  doc,
  deleteDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase";
import Navbar from "./Navbar";

const DeleteAcc = () => {
  const { currentUser } = useContext(AuthContext);
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");

  const handleDelete = async () => {
    try {
      const credential = EmailAuthProvider.credential(
        currentUser.email,
        password
      );
      await reauthenticateWithCredential(currentUser, credential);

      await deleteUser(currentUser);

      const userRef = doc(db, "users", currentUser.uid);
      await deleteDoc(userRef);

      const notesQuery = query(collection(db, "notes", currentUser.uid));
      const notesSnapshot = await getDocs(notesQuery);

      notesSnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });

      setSuccess("Account deleted successfully");
      setErr("");
    } catch (error) {
      setErr("Failed to delete account");
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="register" onSubmit={handleDelete}>
      <Navbar />
      <div className="register-container">
        <div className="register-container__bgc">
          <img src={Wave} alt="" />
        </div>
        <form className="register-form">
          <h2 className="register-form__title">DELETE ACCOUNT</h2>
          <label htmlFor="passwd">Enter your password</label>
          <input
            type="password"
            id="passwd"
            className="register-form__input"
            value={password}
            onClick={handlePasswordChange}
            required
          />
          {err && <p>{err}</p>}
          {success && <p>{success}</p>}
          <input
            type="submit"
            value="Delete account"
            className="register-form__btn"
          />
        </form>
      </div>
    </div>
  );
};

export default DeleteAcc;

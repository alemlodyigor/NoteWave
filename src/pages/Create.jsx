import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import "../scss/Create.scss";
import { Link } from "react-router-dom";

const Create = () => {
  const { currentUser } = useContext(AuthContext);

  const handleSave = async () => {
    console.log(currentUser);
    const title = document.querySelector(
      ".create-content__contener__title"
    ).value;
    const note = document.querySelector(
      ".create-content__contener__note"
    ).value;
    const createdAt = new Date();

    try {
      const userDocRef = doc(db, "notes", currentUser.uid);
      await updateDoc(userDocRef, {
        notes: arrayUnion({ title, note, createdAt }),
      });
      console.log("Note saved successfully!");
    } catch (error) {
      console.error("Error sacing note: ", error);
    }
  };

  return (
    <div className="create">
      <div className="create-header">
        <h1 className="create-header__title">
          <Link to="/">NoteWave</Link>
        </h1>
        <nav className="create-header__nav">
          <ul className="create-header__nav__options">
            <li className="create-header__nav__options__element">
              Customize the card
            </li>
            <li
              className="create-header__nav__options__element"
              onClick={handleSave}
            >
              Save
            </li>
          </ul>
        </nav>
      </div>

      <div className="create-content">
        <div className="create-content__contener">
          <input
            type="text"
            className="create-content__contener__title"
            placeholder="Title..."
          />
          <textarea
            className="create-content__contener__note"
            placeholder="Type here..."
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default Create;

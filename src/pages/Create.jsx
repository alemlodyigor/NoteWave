import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import "../scss/Create.scss";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const Create = () => {
  const { currentUser } = useContext(AuthContext);
  const [save, setSave] = useState(false);
  const [err, setError] = useState(false);
  const [note, setNote] = useState({ title: "", content: "" });

  const handleSave = async () => {
    const createdAt = new Date();
    const id = uuidv4();

    try {
      const userDocRef = doc(db, "notes", currentUser.uid);
      await updateDoc(userDocRef, {
        notes: arrayUnion({
          id,
          title: note.title,
          note: note.content,
          createdAt,
          editedAt: createdAt,
          createdBy: currentUser.uid,
        }),
      });
      setSave(true);
    } catch (error) {
      setError(true);
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
              {save && "Saved"}
              {err && "Error"}
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
            onChange={(e) => setNote({ ...note, title: e.target.value })}
          />
          <textarea
            className="create-content__contener__note"
            placeholder="Type here..."
            onChange={(e) => setNote({ ...note, content: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
};

export default Create;

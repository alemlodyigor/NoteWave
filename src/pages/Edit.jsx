import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import "../scss/Create.scss";

const Edit = () => {
  const { currentUser } = useContext(AuthContext);
  const { id } = useParams();

  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const noteRef = doc(db, "notes", currentUser.uid);
        const noteDoc = await getDoc(noteRef);

        if (noteDoc.exists()) {
          const notesData = noteDoc.data().notes;
          const currentNote = notesData.find((n) => n.id === id);

          if (currentNote) {
            setNote({
              title: currentNote.title,
              content: currentNote.note,
            });
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchNote();
  }, [id, currentUser.uid]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNote({
      ...note,
      [name]: value,
    });
  };

  const handleSave = async () => {
    const noteRef = doc(db, "notes", currentUser.uid);

    const noteDoc = await getDoc(noteRef);
    const notesData = noteDoc.data().notes;

    const noteIndex = notesData.findIndex((n) => n.id === id);
    const editedAt = new Date();
    if (noteIndex !== -1) {
      notesData[noteIndex] = {
        ...notesData[noteIndex],
        title: note.title,
        note: note.content,
        editedAt,
      };

      await updateDoc(noteRef, { notes: notesData });
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
            name="title"
            className="create-content__contener__title"
            value={note.title}
            onChange={handleInputChange}
          />
          <textarea
            className="create-content__contener__note"
            name="content"
            value={note.content}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Edit;

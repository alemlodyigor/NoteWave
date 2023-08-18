import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const Note = () => {
  const { uid, noteId } = useParams();
  const [note, setNote] = useState(null);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const userRef = doc(db, "notes", uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const userNotes = userDoc.data().notes;
          const foundNote = userNotes.find((note) => note.id === noteId);

          if (foundNote) {
            setNote(foundNote);
          } else {
            alert("Note not found!");
          }
        } else {
          alert("User not found!");
        }
      } catch (error) {
        console.error("Error fetching note:", error);
      }
    };
    fetchNote();
  }, [noteId]);

  return (
    <div className="create">
      <div className="create-header">
        <h1 className="create-header__title">
          <Link to="/">NoteWave</Link>
        </h1>
      </div>

      {note ? (
        <div className="create-content">
          <div className="create-content__contener">
            <input
              type="text"
              className="create-content__contener__title"
              value={note.title}
              disabled
            />
            <textarea
              className="create-content__contener__note"
              value={note.note}
              disabled
            />
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Note;

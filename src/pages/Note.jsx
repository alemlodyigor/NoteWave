import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import Wave from "../img/wave.svg";
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
      <div className="create__bgc">
        <img src={Wave} alt="" />
      </div>
      {note ? (
        <div className="create-content">
          <div className={`create-content__contener ${note.cardType}`}>
            <input
              type="text"
              className="create-content__contener__title"
              value={note.title}
              disabled
            />
            <div
              className="create-content__contener__note"
              id="myDiv"
              dangerouslySetInnerHTML={{ __html: note.note }}
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

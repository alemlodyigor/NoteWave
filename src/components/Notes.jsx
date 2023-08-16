import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";

const Notes = () => {
  const { currentUser } = useContext(AuthContext);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      if (currentUser) {
        const docRef = doc(db, "notes", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log(docSnap.data().notes);
          const notesList = docSnap.data().notes;
          setNotes(notesList);
        } else {
          console.log("You don't have notes!");
        }
      }
    };
    fetchNotes();
  }, [currentUser]);

  return (
    <>
      {!notes && (
        <button>
          <Link to="/create">Create new note</Link>
        </button>
      )}
      {notes.map((note, index) => (
        <div className="home-content__container__notes__element">
          <div className="test"></div>
          <h2>{note.title}</h2>
        </div>
      ))}
    </>
  );
};

export default Notes;

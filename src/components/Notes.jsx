import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";

const Notes = () => {
  const { currentUser } = useContext(AuthContext);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const userNotesRef = db.collection("notes").doc(currentUser.uid);

    userNotesRef.get().then((doc) => {
      if (doc.exists) {
        setNotes(doc.data().notes);
      } else {
        console.log("any notes?");
      }
    });
  }, [currentUser]);

  return (
    <div>
      {notes.map((note, index) => (
        <div className="main-content__container__notes__element" key={index}>
          <div className="test"></div>
          <h4>{note.title}</h4>
          <p>{note.note}</p>
        </div>
      ))}
    </div>
  );
};

export default Notes;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const NoteDetail = () => {
  const { noteId } = useParams();
  const [note, setNote] = useState({ title: "", content: "" });

  useEffect(() => {
    const fetchNote = async () => {
      const docRef = doc(db, "notes", noteId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const noteData = docSnap.data();
        setNote({
          title: noteData.title,
          content: noteData.content,
        });
      }
    };
    fetchNote();
  }, [noteId]);

  return (
    <div>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
    </div>
  );
};

export default NoteDetail;

import React, { useContext, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  AuthContext,
} from "../context/AuthContext";
import { db } from "../firebase";

const Edit = () => {
  const { currentUser } = useContext(AuthContext);
  const { noteId } = useParams();
  const history = useHistory();
  const [note, setNote] = useState(false);

  useEffect(() => {
    const fetchNote = async () => {
      if (currentUser) {
        const docRef = doc(db, "notes", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const notesList = docSnap.data().notes;
          const selectedNote = noteList.find((n) => n.id === noteId);
          if (selectedNote) setNote(selectedNote);
          else history.push("/");
        }
      }
    };
  }, [currentUser, noteId, history]);

  const handleEdit = async () => {
    if (note && note.createdBy === currentUser.uid) {
      // Tu będzie edycja
    }
    else console.log('nie możesz tego edytować');
  }

  const handleDelete = async () => {
    if(note && note.createdBy === currentUser.uid) {
      try {
        const userDocRef = doc(db, "notes", currentUser.uid);
        await updateDoc(userDocRef, {
          notes: notes.filter((n) => n.id !== noteId)
        });
        history.push("/");
      } catch (error) {
        console.log("You don't have permission to delete this note!");
      }
    }
  }

  return <div>Edit</div>;
};

export default Edit;

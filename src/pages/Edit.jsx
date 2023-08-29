import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import Wave from "../img/wave.svg";
import CustomMenu from "../components/CustomMenu";

const Edit = () => {
  const { currentUser } = useContext(AuthContext);
  const { noteId } = useParams();
  const [note, setNote] = useState({ title: "", content: "" });
  const [cardType, setCardType] = useState("");
  const [options, setOptions] = useState(false);

  const handleContentChange = (newContent) => {
    setNote((prevNote) => ({ ...prevNote, content: newContent }));
  };

  const handleShowOptions = () => {
    options ? setOptions(false) : setOptions(true);
  };

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const noteRef = doc(db, "notes", currentUser.uid);
        const noteDoc = await getDoc(noteRef);

        if (noteDoc.exists()) {
          const notesData = noteDoc.data().notes;
          const currentNote = notesData.find((n) => n.id === noteId);
          if (currentNote) {
            setNote({
              title: currentNote.title,
              content: currentNote.note,
            });
            setCardType(currentNote.cardType);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchNote();
  }, [noteId, currentUser.uid]);

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

    const noteIndex = notesData.findIndex((n) => n.id === noteId);
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
              <p onClick={handleShowOptions}>Customize the card</p>
              {options && (
                <ul className="card-options__list">
                  <li
                    className="card-options__list__element"
                    onClick={() => setCardType("blank")}
                  >
                    Czysta
                  </li>
                  <li
                    className="card-options__list__element"
                    onClick={() => setCardType("lines")}
                  >
                    Linia
                  </li>
                  <li
                    className="card-options__list__element"
                    onClick={() => setCardType("squares")}
                  >
                    Kratka
                  </li>
                  <li
                    className="card-options__list__element"
                    onClick={() => setCardType("dots")}
                  >
                    Kropka
                  </li>
                </ul>
              )}
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
      <div className="create__bgc">
        <img src={Wave} alt="" />
      </div>
      <div className="create-content">
        <div className={`create-content__contener ${cardType}`}>
          <input
            type="text"
            className="create-content__contener__title"
            placeholder="Title..."
            onChange={(e) => setNote({ ...note, title: e.target.value })}
          />
          <div
            className="create-content__contener__note"
            id="myDiv"
            contentEditable="true"
            onBlur={(e) => handleContentChange(e.target.innerHTML)}
            dangerouslySetInnerHTML={{ __html: note.content }}
          ></div>
        </div>
      </div>
      <CustomMenu updateContent={handleContentChange} />
    </div>
  );
};

export default Edit;

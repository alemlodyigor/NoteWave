import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import "../scss/Create.scss";
import Wave from "../img/wave.svg";
import { CustomMenu } from "../functions/context-menu";


const Edit = () => {
  const { currentUser } = useContext(AuthContext);
  const { noteId } = useParams();
  const [cardType, setCardType] = useState("");
  const [options, setOptions] = useState(false);

  const handleShowOptions = () => {
    options ? setOptions(false) : setOptions(true);
  };

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
          const currentNote = notesData.find((n) => n.id === noteId);
          console.log(currentNote);
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

  CustomMenu();

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
      <div className="context-menu">
        <div className="context-menu__option">
          Change font
          <ul className="context-menu__option__list">
            <li className="context-menu__option__list__element">
              Czcionka numer 1
            </li>
            <li className="context-menu__option__list__element">
              Czcionka numer 2
            </li>
            <li className="context-menu__option__list__element">
              Czcionka numer 3
            </li>
            <li className="context-menu__option__list__element">
              Czcionka numer 4
            </li>
            <li className="context-menu__option__list__element">
              Czcionka numer 5
            </li>
            <li className="context-menu__option__list__element">
              Czcionka numer 6
            </li>
          </ul>
        </div>
        <div className="context-menu__option">Increase</div>
        <div className="context-menu__option">Decrease</div>
        <div className="context-menu__option">Bold</div>
        <div className="context-menu__option">Italic</div>
        <div className="context-menu__option">
          Change font color
          <ul className="context-menu__option__list">
            <li className="context-menu__option__list__element">GREEN</li>
            <li className="context-menu__option__list__element">RED</li>
            <li className="context-menu__option__list__element">BLUE</li>
            <li className="context-menu__option__list__element">ORANGE</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Edit;

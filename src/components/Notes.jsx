import React, { useContext, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const Notes = ({ notes }) => {
  const { currentUser } = useContext(AuthContext);
  const [noteId, setNoteId] = useState();

  const [optionsOpen, setOptionsOpen] = useState(
    new Array(notes.length).fill(false)
  );

  const handleArchive = async (note) => {
    setNoteId(note.id);

    const noteRef = doc(db, "notes", currentUser.uid);

    const noteDoc = await getDoc(noteRef);
    const notesData = noteDoc.data().notes;

    const noteIndex = notesData.findIndex((n) => n.id === noteId);
    if (noteIndex !== -1) {
      notesData[noteIndex] = {
        ...notesData[noteIndex],
        archived: true,
      };
      await updateDoc(noteRef, { notes: notesData });
    }
  };

  const handleOptions = (index) => {
    const newOptionsOpen = [...optionsOpen];
    newOptionsOpen[index] = !newOptionsOpen[index];
    setOptionsOpen(newOptionsOpen);
  };

  return (
    <div>
      {notes.length === 0 ? (
        <button className="home-content__container__notes__btn">
          <Link to="/create">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </Link>
        </button>
      ) : (
        notes.map((note, index) => (
          <div key={note.id} className="home-content__container__notes__note">
            <div className="home-content__container__notes__note__preview">
              <div
                className={`home-content__container__notes__note__preview__card ${note.cardType}`}
              >
                <div
                  className="home-content__container__notes__note__preview__card__note"
                  dangerouslySetInnerHTML={{ __html: note.note }}
                />
              </div>
              <button
                className="home-content__container__notes__note__preview__btn"
                onClick={() => handleOptions(index)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                  />
                </svg>
                {optionsOpen[index] && (
                  <ul className="preview__options__list">
                    <li
                      className="preview__options__list__element"
                      onClick={() => handleArchive(note)}
                    >
                      Zarchiwizuj
                    </li>
                    <CopyToClipboard
                      text={`${window.location.origin}/note/${note.createdBy}/${note.id}`}
                    >
                      <li className="preview__options__list__element">
                        Udostępnij
                      </li>
                    </CopyToClipboard>
                  </ul>
                )}
              </button>
            </div>

            <div className="home-content__container__notes__note__info">
              <Link to={`/edit/${note.id}`}>
                <h2>{note.title}</h2>
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Notes;

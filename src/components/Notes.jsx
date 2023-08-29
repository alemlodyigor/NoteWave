import React, { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { Link } from "react-router-dom";

const Notes = ({ notes }) => {
  const [options, setOptions] = useState(false);
  const handleOptions = () => {
    if (options) setOptions(false);
    else setOptions(true);
  };
  console.log(notes);

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
        notes.map((note) => (
          <div key={note.id} className="home-content__container__notes__note">
            <div className="home-content__container__notes__note__preview">
              <div className={`home-content__container__notes__note__preview__card ${note.cardType}`}>
                <textarea
                  className="home-content__container__notes__note__preview__card__note"
                  value={note.note} disabled
                />
              </div>
              <button
                className="home-content__container__notes__note__preview__btn"
                onClick={handleOptions}
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
                {options && (
                  <ul className="preview__options__list">
                    <li className="preview__options__list__element">
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

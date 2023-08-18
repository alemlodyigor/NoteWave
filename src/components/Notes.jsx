import React from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { Link } from "react-router-dom";

const Notes = ({ notes }) => {
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
            <Link to={`/edit/${note.id}`}>
              <div className="test"></div>
            </Link>
            <div className="home-content__container__notes__note__info">
              <h2>{note.title}</h2>
              <CopyToClipboard
                text={`${window.location.origin}/note/${note.createdBy}/${note.id}`}
              >
                <button className="home-content__container__notes__note__info__share">
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
                      d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
                    />
                  </svg>
                </button>
              </CopyToClipboard>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Notes;

import React from "react";
import { Link } from "react-router-dom";

const Notes = ({notes}) => {
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
          <div className="home-content__container__notes__note" key={index}>
            <div className="test"></div>
            <h2>{note.title}</h2>
          </div>
        ))
      )}
    </div>
  );
};

export default Notes;

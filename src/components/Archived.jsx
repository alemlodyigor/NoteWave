import React, { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import Wave from "../img/wave.svg";
import { AuthContext } from "../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import Notes from "./Notes";
import { Link } from "react-router-dom";
import slider from "../functions/slider";

const Archived = () => {
  const { currentUser } = useContext(AuthContext);
  const [notes, setNotes] = useState([]);
  const [sliderInitialized, setSliderInitialized] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      if (currentUser) {
        const docRef = doc(db, "notes", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const notesList = docSnap.data().notes;
          const Archived = notesList.filter((note) => note.archived === true);
          setNotes(Archived);
        }
      }
    };
    fetchNotes();
  }, [currentUser]);

  useEffect(() => {
    if (notes.length > 0 && !sliderInitialized) {
      setSliderInitialized(true);
      slider();
    }
  }, [notes, sliderInitialized]);

  return (
    <div className="home">
      <Navbar />
      <div className="home-content__bgc">
        <img src={Wave} alt="" />
      </div>
      <div className="home-content">
        <h2 className="home-content__title">
          Welcome <br />
          to ARCHIVED notes
        </h2>
        <div className="home-content__container">
          <div className="home-content__container__options">
            <p className="home-content__container__options__add">
              {/* <Link to="create">CREATE</Link> */}
            </p>
            <div className="home-content__container__options__sites">
              <button className="home-content__container__options__sites__btn notes__btn-left">
                &larr;
              </button>
              <p className="home-content__container__options__sites__p">1/4</p>
              <button className="home-content__container__options__sites__btn notes__btn-right">
                &rarr;
              </button>
            </div>
          </div>
          <div className="home-content__container__notes">
            <Notes notes={notes} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Archived;

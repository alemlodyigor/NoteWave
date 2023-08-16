import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../scss/Home.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      if (currentUser) {
        const docRef = doc(db, "notes", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log(docSnap.data().notes);
          const notesList = docSnap.data().notes;
          setNotes(notesList);
        } else {
          console.log("You don't have notes!");
        }
      }
    };
    fetchNotes();
  }, [currentUser]);

  return (
    <div className="home">
      <Navbar />
      <div className="home-content">
        <h2 className="home-content__title">
          Welcome <br />
          to note wave
        </h2>
        <div className="home-content__container">
          <div className="home-content__container__options">
            <p className="home-content__container__options__add">
              <Link to="/create"> CREATE</Link>
            </p>
            <div className="home-content__container__options__sites">
              <button className="home-content__container__options__sites__btn">
                &larr;
              </button>
              <p className="home-content__container__options__sites__p">1/4</p>
              <button className="home-content__container__options__sites__btn">
                &rarr;
              </button>
            </div>
          </div>
          <div className="home-content__container__notes">
              {notes.map((note, index) => (
                <div className="home-content__container__notes__element">
                  <div className="test"></div>
                  <h2>{note.title}</h2>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

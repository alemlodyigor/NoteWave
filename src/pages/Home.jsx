import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../scss/Home.scss";
import { Link } from "react-router-dom";
import Notes from "../components/Notes";
import { AuthContext } from "../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const Home = () => {
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
          setNotes(notesList);
        }
      }
    };
    fetchNotes();
  }, [currentUser]);

  useEffect(() => {
    const slider = () => {
      const slides = document.querySelectorAll(
        ".home-content__container__notes__note"
      );
      const btnLeft = document.querySelector(".notes__btn-left");
      const btnRight = document.querySelector(".notes__btn-right");
      const sites = document.querySelector(
        ".home-content__container__options__sites__p"
      );

      let curSlide = 0;
      const maxSlide = slides.length;

      const goToSlide = (slide) => {
        slides.forEach(
          (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
        );
        sites.textContent = `${curSlide + 1}/${slides.length}`;
      };

      const nextSlide = () => {
        if (curSlide === maxSlide - 1) curSlide = 0;
        else curSlide++;

        goToSlide(curSlide);
      };

      const prevSlide = () => {
        if (curSlide === 0) curSlide = maxSlide - 1;
        else curSlide--;

        goToSlide(curSlide);
      };

      const init = () => {
        goToSlide(0);
      };

      init();

      btnRight.addEventListener("click", nextSlide);
      btnLeft.addEventListener("click", prevSlide);
    };

    if (notes.length > 0 && !sliderInitialized) {
      setSliderInitialized(true);
      slider();
    }
  }, [notes, sliderInitialized]);

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
              <Link to="create">CREATE</Link>
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

export default Home;
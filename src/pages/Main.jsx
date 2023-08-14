import React from "react";
import Navbar from "../components/Navbar";
import "../scss/Main.scss";
import Notes from "../components/Notes";

const Main = () => {
  return (
    <div className="main">
      <Navbar />
      <div className="main-content">
        <h2 className="main-content__title">
          Welcome <br />
          to note wave
        </h2>
        <div className="main-content__container">
          <div className="main-content__container__options">
            <p className="main-content__container__options__add">CREATE</p>
            <div className="main-content__container__options__sites">
              <button className="main-content__container__options__sites__btn">
                &larr;
              </button>
              <p className="main-content__container__options__sites__p">1/4</p>
              <button className="main-content__container__options__sites__btn">
                &rarr;
              </button>
            </div>
          </div>
          <div className="main-content__container__notes">
            <Notes />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;

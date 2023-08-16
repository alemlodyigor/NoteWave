import React from "react";
import Navbar from "../components/Navbar";
import "../scss/Home.scss";
import { Link } from "react-router-dom";
import Notes from "../components/Notes";

const Home = () => {
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
            <Notes />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

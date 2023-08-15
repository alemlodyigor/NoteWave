import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import Notes from "../components/Notes";

import { AuthContext } from "../context/AuthContext";
import {auth} from '../firebase';
import { signOut } from "firebase/auth";

const Home = () => {
  const {currentUser} = useContext(AuthContext);
  console.log(currentUser.displayName);
  return (
    <div className="home">
      <Navbar />
      <div className="home-content">
        <button onClick={() => signOut(auth)}>Logout</button>
        <h2 className="home-content__title">
          Welcome <br />
          to note wave
        </h2>
        <div className="home-content__container">
          <div className="home-content__container__options">
            <p className="home-content__container__options__add">CREATE</p>
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
            <Notes />
            <Notes />
            <Notes />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

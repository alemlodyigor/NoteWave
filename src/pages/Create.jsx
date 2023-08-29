import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import "../scss/Create.scss";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Wave from "../img/wave.svg";
import CustomMenu from "../components/CustomMenu";

const Create = () => {
  const { currentUser } = useContext(AuthContext);
  const [save, setSave] = useState(false);
  const [err, setError] = useState(false);
  const [note, setNote] = useState({ title: "", content: "" });
  const [cardType, setCardType] = useState("");
  const [options, setOptions] = useState(false);

  const handleContentChange = (newContent) => {
    setNote((prevNote) => ({ ...prevNote, content: newContent }));
  };

  const handleShowOptions = () => {
    options ? setOptions(false) : setOptions(true);
  };

  const handleSave = async () => {
    const createdAt = new Date();
    const id = uuidv4();

    try {
      const userDocRef = doc(db, "notes", currentUser.uid);
      await updateDoc(userDocRef, {
        notes: arrayUnion({
          id,
          title: note.title,
          note: note.content,
          createdAt,
          editedAt: createdAt,
          createdBy: currentUser.uid,
          cardType: cardType,
        }),
      });
      setSave(true);
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className="create">
      <div className="create-header">
        <h1 className="create-header__title">
          <Link to="/">NoteWave</Link>
        </h1>
        <nav className="create-header__nav">
          <ul className="create-header__nav__options">
            <li className="create-header__nav__options__element">
              <p onClick={handleShowOptions}>Customize the card</p>
              {options && (
                <ul className="card-options__list">
                  <li
                    className="card-options__list__element"
                    onClick={() => setCardType("blank")}
                  >
                    Czysta
                  </li>
                  <li
                    className="card-options__list__element"
                    onClick={() => setCardType("lines")}
                  >
                    Linia
                  </li>
                  <li
                    className="card-options__list__element"
                    onClick={() => setCardType("squares")}
                  >
                    Kratka
                  </li>
                  <li
                    className="card-options__list__element"
                    onClick={() => setCardType("dots")}
                  >
                    Kropka
                  </li>
                </ul>
              )}
            </li>
            <li
              className="create-header__nav__options__element"
              onClick={handleSave}
            >
              Save
              {save && "Saved"}
              {err && "Error"}
            </li>
          </ul>
        </nav>
      </div>

      <div className="create__bgc">
        <img src={Wave} alt="" />
      </div>
      <div className="create-content">
        <div className={`create-content__contener ${cardType}`}>
          <input
            type="text"
            className="create-content__contener__title"
            placeholder="Title..."
            onChange={(e) => setNote({ ...note, title: e.target.value })}
          />
          <div
            className="create-content__contener__note"
            id="myDiv"
            contentEditable="true"
            onBlur={(e) => handleContentChange(e.target.innerHTML)}
            dangerouslySetInnerHTML={{ __html: note.content }}
          ></div>
        </div>
      </div>
      <CustomMenu />
    </div>
  );
};

export default Create;

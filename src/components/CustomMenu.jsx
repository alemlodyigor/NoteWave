import React from "react";
import "../scss/custommenu.scss";

const CustomMenu = () => {
  const increaseFontSize = () => {
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();
    if (selectedText !== "") {
      const range = selection.getRangeAt(0);
      const span = document.createElement("span");
      const currentSize =
        parseInt(
          range.startContainer.parentElement.getAttribute("data-font-size")
        ) || 16;
      const newSize = Math.min(currentSize + 6, 32);
      span.style.fontSize = newSize + "px";
      span.appendChild(document.createTextNode(selectedText));
      range.deleteContents();
      range.insertNode(span);
    }
  };

  const normalFontSize = () => {
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();
    if (selectedText !== "") {
      const range = selection.getRangeAt(0);
      const span = document.createElement("span");
      span.style.fontSize = 16 + "px";
      span.appendChild(document.createTextNode(selectedText));
      range.deleteContents();
      range.insertNode(span);
    }
  };

  const decreaseFontSize = () => {
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();
    if (selectedText !== "") {
      const range = selection.getRangeAt(0);
      const span = document.createElement("span");
      const currentSize =
        parseInt(
          range.startContainer.parentElement.getAttribute("data-font-size")
        ) || 16;
      const newSize = Math.max(currentSize - 6, 6);
      span.style.fontSize = newSize + "px";
      span.appendChild(document.createTextNode(selectedText));
      range.deleteContents();
      range.insertNode(span);
    }
  };

  const toggleBold = () => {
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();
    if (selectedText !== "") {
      const range = selection.getRangeAt(0);
      const span = document.createElement("span");
      span.appendChild(document.createTextNode(selectedText));
      const currentWeight = window.getComputedStyle(
        range.startContainer.parentElement
      ).fontWeight;

      if (currentWeight === "700") {
        span.style.fontWeight = "normal";
      } else {
        span.style.fontWeight = "bold";
      }

      range.deleteContents();
      range.insertNode(span);
    }
  };

  const toggleItalic = () => {
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();
    if (selectedText !== "") {
      const range = selection.getRangeAt(0);
      const span = document.createElement("span");
      span.appendChild(document.createTextNode(selectedText));
      const currentStyle = window.getComputedStyle(
        range.startContainer.parentElement
      ).fontStyle;

      if (currentStyle === "italic") {
        span.style.fontStyle = "normal";
      } else {
        span.style.fontStyle = "italic";
      }

      range.deleteContents();
      range.insertNode(span);
    }
  };

  const changeFont = (fontFamily) => {
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();
    if (selectedText !== "") {
      const range = selection.getRangeAt(0);
      const span = document.createElement("span");
      span.style.fontFamily = fontFamily;
      span.appendChild(document.createTextNode(selectedText));
      range.deleteContents();
      range.insertNode(span);
    }
  };

  const changeFontColor = (color) => {
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();
    if (selectedText !== "") {
      const range = selection.getRangeAt(0);
      const span = document.createElement("span");
      span.style.color = color;
      span.appendChild(document.createTextNode(selectedText));
      range.deleteContents();
      range.insertNode(span);
    }
  };

  const CustomMenu = () => {
    const menu = document.querySelector(".context-menu");

    const hideMenu = () => (menu.style.display = "none");

    const rightClick = (e) => {
      e.preventDefault();
      if (menu.style.display == "block") hideMenu();
      else {
        menu.style.display = "block";
        menu.style.left = e.pageX + "px";
        menu.style.top = e.pageY + "px";
      }
    };

    document.onclick = hideMenu;
    document.oncontextmenu = rightClick;
  };
  CustomMenu();

  return (
    <div className="context-menu">
      <div className="context-menu__option">
        Change font
        <ul className="context-menu__option__list">
          <button
            className="context-menu__option__list__element"
            onClick={() => changeFont("Arial")}
          >
            Arial
          </button>
          <button
            className="context-menu__option__list__element"
            onClick={() => changeFont("Times New Roman")}
          >
            Times New Roman
          </button>
          <button className="context-menu__option__list__element">
            Czcionka numer 3
          </button>
          <button className="context-menu__option__list__element">
            Czcionka numer 4
          </button>
          <button className="context-menu__option__list__element">
            Czcionka numer 5
          </button>
          <button className="context-menu__option__list__element">
            Czcionka numer 6
          </button>
        </ul>
      </div>
      <button className="context-menu__option" onClick={increaseFontSize()}>
        Increase
      </button>
      <button className="context-menu__option" onClick={normalFontSize()}>
        Normal
      </button>
      <button className="context-menu__option" onClick={decreaseFontSize()}>
        Decrease
      </button>
      <button className="context-menu__option" onClick={toggleBold()}>
        Bold
      </button>
      <button className="context-menu__option" onClick={toggleItalic()}>
        Italic
      </button>
      <div className="context-menu__option">
        Change font color
        <ul className="context-menu__option__list">
          <button
            className="context-menu__option__list__element"
            onClick={changeFontColor("green")}
          >
            GREEN
          </button>
          <button
            className="context-menu__option__list__element"
            onClick={changeFontColor("red")}
          >
            RED
          </button>
          <button
            className="context-menu__option__list__element"
            onClick={changeFontColor("blue")}
          >
            BLUE
          </button>
          <button
            className="context-menu__option__list__element"
            onClick={changeFontColor("orange")}
          >
            ORANGE
          </button>
        </ul>
      </div>
    </div>
  );
};

export default CustomMenu;

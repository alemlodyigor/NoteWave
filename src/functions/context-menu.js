'use strict';

export const increaseFontSize = () => {
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();
    if (selectedText !== "") {
      const range = selection.getRangeAt(0);
      const span = document.createElement("span");
      const currentSize = window
        .getComputedStyle(range.startContainer.parentElement)
        .fontSize.replace("px", "");
      const newSize = parseInt(currentSize) + 6;
      span.style.fontSize = newSize + "px";
      span.appendChild(document.createTextNode(selectedText));
      range.deleteContents();
      range.insertNode(span);
    }
};

export const decreaseFontSize = () => {
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();
    if (selectedText !== "") {
      const range = selection.getRangeAt(0);
      const span = document.createElement("span");
      const currentSize = window
        .getComputedStyle(range.startContainer.parentElement)
        .fontSize.replace("px", "");
      const newSize = Math.max(parseInt(currentSize) - 6, 6);
      span.style.fontSize = newSize + "px";
      span.appendChild(document.createTextNode(selectedText));
      range.deleteContents();
      range.insertNode(span);
    }
};

export const toggleBold = () => {
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();
    console.log(selectedText);
    if (selectedText !== "") {
      const range = selection.getRangeAt(0);
      const span = document.createElement("span");
      span.appendChild(document.createTextNode(selectedText));
      const currentWeight = window.getComputedStyle(
        range.startContainer.parentElement
      ).fontWeight;

      if (currentWeight === "bold") {
        span.style.fontWeight = "normal";
      } else {
        span.style.fontWeight = "bold";
      }

      range.deleteContents();
      range.insertNode(span);
    }
};

export const toggleItalic = () => {
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();
    console.log(selectedText);
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

export const changeFont = (fontFamily) => {
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();
    console.log(selectedText);
    if (selectedText !== "") {
      const range = selection.getRangeAt(0);
      const span = document.createElement("span");
      span.style.fontFamily = fontFamily;
      span.appendChild(document.createTextNode(selectedText));
      range.deleteContents();
      range.insertNode(span);
    }
};

export const changeFontColor = (color) => {
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();
    console.log(selectedText);
    if (selectedText !== "") {
      const range = selection.getRangeAt(0);
      const span = document.createElement("span");
      span.style.color = color;
      span.appendChild(document.createTextNode(selectedText));
      range.deleteContents();
      range.insertNode(span);
    }
};

export const CustomMenu = () => {
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
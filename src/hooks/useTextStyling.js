import { useEffect } from "react";

const useTextStyling = () => {
  const applyStyle = (styleFunction) => {
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();
    if (selectedText !== "") {
      const range = selection.getRangeAt(0);
      const span = document.createElement("span");
      styleFunction(span);
      span.appendChild(document.createTextNode(selectedText));
      range.deleteContents();
      range.insertNode(span);
    }
  };

  useEffect(() => {
    const initializeContextMenu = () => {
      const menu = document.querySelector(".context-menu");

      const hideMenu = () => (menu.style.display = "none");

      const rightClick = (e) => {
        e.preventDefault();
        if (menu.style.display === "block") hideMenu();
        else {
          menu.style.display = "block";
          menu.style.left = e.pageX + "px";
          menu.style.top = e.pageY + "px";
        }
      };

      document.onclick = hideMenu;
      document.oncontextmenu = rightClick;
    };

    initializeContextMenu();
  }, []);

  return { applyStyle };
};

export default useTextStyling;

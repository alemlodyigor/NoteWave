import React from "react";
import useTextStyling from "../hooks/useTextStyling.js";

const CustomMenu = () => {
  const { applyStyle } = useTextStyling();

  return (
    <div className="context-menu">
      <div className="context-menu__option">
        Change font
        <ul className="context-menu__option__list">
          <button
            className="context-menu__option__list__element"
            onClick={() =>
              applyStyle((span) => (span.style.fontFamily = "Arial"))
            }
          >
            Arial
          </button>
          <button
            className="context-menu__option__list__element"
            onClick={() =>
              applyStyle((span) => (span.style.fontFamily = "Times New Roman"))
            }
          >
            Times New Roman
          </button>
        </ul>
      </div>
      <button
        className="context-menu__option"
        onClick={() => applyStyle((span) => (span.style.fontSize = "12px"))}
      >
        Decrease
      </button>
      <button
        className="context-menu__option"
        onClick={() => applyStyle((span) => (span.style.fontSize = "16px"))}
      >
        Normal
      </button>
      <button
        className="context-menu__option"
        onClick={() => applyStyle((span) => (span.style.fontSize = "24px"))}
      >
        Increase
      </button>
      <button
        className="context-menu__option"
        onClick={() =>
          applyStyle((span) => {
            const currentWeight = window.getComputedStyle(span).fontWeight;
            span.style.fontWeight =
              currentWeight === "bold" ? "normal" : "bold";
          })
        }
      >
        Bold
      </button>
      <button
        className="context-menu__option"
        onClick={() =>
          applyStyle((span) => {
            const currentStyle = window.getComputedStyle(span).fontStyle;
            span.style.fontStyle =
              currentStyle === "italic" ? "normal" : "italic";
          })
        }
      >
        Italic
      </button>
      <div className="context-menu__option">
        Change font color
        <ul className="context-menu__option__list">
          <button
            className="context-menu__option__list__element"
            onClick={() => applyStyle((span) => (span.style.color = "green"))}
          >
            GREEN
          </button>
          <button
            className="context-menu__option__list__element"
            onClick={() => applyStyle((span) => (span.style.color = "red"))}
          >
            RED
          </button>
          <button
            className="context-menu__option__list__element"
            onClick={() => applyStyle((span) => (span.style.color = "blue"))}
          >
            BLUE
          </button>
          <button
            className="context-menu__option__list__element"
            onClick={() => applyStyle((span) => (span.style.color = "orange"))}
          >
            ORANGE
          </button>
        </ul>
      </div>
    </div>
  );
};

export default CustomMenu;

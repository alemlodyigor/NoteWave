import React from "react";

const Notes = () => {
  const note = false;
  return (
    <>
      {note && (
        <div className="main-content__container__notes__element">
          <div className="test"></div>
          <h4>PRZEPISY</h4>
        </div>
      )}
    </>
  );
};

export default Notes;

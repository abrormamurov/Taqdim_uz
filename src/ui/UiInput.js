import React from "react";

function UiInput({ placeholder, type, name, setState, state }) {
  return (
    <>
      <input
        placeholder={placeholder}
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
    </>
  );
}

export default UiInput;

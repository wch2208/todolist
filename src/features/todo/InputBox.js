import React, { useContext } from "react";
import { dispatchContext, idContext } from "../../app/store";

export default function InputBox() {
  const todoDispatch = useContext(dispatchContext);
  const id = useContext(idContext);

  function handleSubmit(e) {
    e.preventDefault();
    if (e.target[0]) {
      todoDispatch({
        type: "ADD_TODO",
        text: e.target[0].value,
        id: id,
      });
      e.target[0].value = "";
    } else if (e.target[1]) {
      todoDispatch({ type: "DEL_ALL" });
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        autoFocus
        placeholder="Write and press 'Enter' "
        className="inputBox"
      />
    </form>
  );
}

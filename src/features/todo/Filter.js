import React, { useContext } from "react";
import { hideContext, dispatchContext } from "../../app/store";

export default function Filter() {
  let hide = useContext(hideContext);
  let dispatch = useContext(dispatchContext);
  return (
    <form>
      <input
        type={"checkbox"}
        id={"filter"}
        className="filter"
        onChange={() => {
          hide === false ? (hide = true) : (hide = false);
          dispatch({ type: "HIDE_FILTER", hide });
        }}
      />
      <label htmlFor="filter" className="label">
        Hide completed
      </label>
      <button className="delBtn">clearAll</button>
    </form>
  );
}

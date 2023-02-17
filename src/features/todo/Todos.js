import React, { useContext, useState } from "react";
import {
  todosContext,
  dispatchContext,
  textContext,
  hideContext,
} from "../../app/store";

export default function Todos() {
  let todos = useContext(todosContext);
  let hide = useContext(hideContext);
  const listDispatch = useContext(dispatchContext);
  let text = useContext(textContext);
  const [modi, setModi] = useState(999);

  function listHandleSubmit(e) {
    e.preventDefault();
    if (e.target.className === "delBtn") {
      listDispatch({ type: "DEL_TODO", targetId: +e.target.id });
    } else if (e.target.className === "modiBtn") {
      listDispatch({
        type: "MODIFY_TODO",
        targetId: +e.target.id,
        text: text,
      });
    }

    setModi(e.target.parentElement[1]);
    if (e.target.innerText === "완료") {
      setModi(999);
    }
  }

  const todoItems = todos.map(todo => {
    return (
      <form key={todo.id} className={hide && todo.isChecked ? "hide" : ""}>
        <input
          type={"checkbox"}
          id={todo.id}
          className={"check"}
          checked={todo.isChecked ? "checked" : ""}
          onChange={e => {
            listDispatch({
              type: "CHECK_TODO",
              targetId: +e.target.id,
              isChecked: true,
            });
          }}
        />
        <input
          id={todo.id}
          className={"modiOn"}
          type={"text"}
          defaultValue={todo.text}
          readOnly={+modi.id !== todo.id ? "readOnly" : null}
          onChange={e => {
            text = e.target.value;
          }}
        />

        <button
          type="button"
          className={"modiBtn"}
          id={todo.id}
          onClick={listHandleSubmit}
        >
          {+modi.id !== todo.id ? "수정" : "완료"}
        </button>
        <button
          type="button"
          className={"delBtn"}
          id={todo.id}
          onClick={listHandleSubmit}
        >
          삭제
        </button>
      </form>
    );
  });

  return <>{todoItems}</>;
}

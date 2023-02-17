import React, { createContext, useReducer } from "react";

export const todosContext = createContext();
export const dispatchContext = createContext();
export const idContext = createContext();
export const textContext = createContext();
export const hideContext = createContext();

let initialState = [];
let id = 0;
let text = "";
let hide = false;

const todoReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      id = action.id + 1;
      return (initialState = [
        ...state,
        { id: id, text: action.text, isChecked: false },
      ]);
      break;

    case "DEL_TODO":
      return (initialState = state.filter(v => v.id !== action.targetId));
      break;

    case "DEL_ALL":
      return (initialState = []);
      break;

    case "MODIFY_TODO":
      return (initialState = state.map(v => ({
        id: v.id,
        text: v.id === action.targetId ? action.text : v.text,
        isChecked: v.isChecked,
      })));
      break;
    case "CHECK_TODO":
      return (initialState = state.map(v => ({
        id: v.id,
        text: v.text,
        isChecked:
          v.id === action.targetId
            ? v.isChecked === false
              ? true
              : false
            : v.isChecked,
      })));
      break;
    case "HIDE_FILTER":
      hide = action.hide;
      return (initialState = state.map(v => ({
        id: v.id,
        text: v.text,
        isChecked: v.isChecked,
        hide: hide,
      })));

    default:
      break;
  }
};

export const Store = props => {
  const [state, todoDispatch] = useReducer(todoReducer, initialState);

  return (
    <hideContext.Provider value={hide}>
      <textContext.Provider value={text}>
        <dispatchContext.Provider value={todoDispatch}>
          <todosContext.Provider value={initialState}>
            <idContext.Provider value={id}>{props.children}</idContext.Provider>
          </todosContext.Provider>
        </dispatchContext.Provider>
      </textContext.Provider>
    </hideContext.Provider>
  );
};

import React from "react";
import "./App.css";
import InputBox from "./features/todo/InputBox";
import Filter from "./features/todo/Filter";
import Todos from "./features/todo/Todos";

function App() {
  return (
    <div className="App">
      <h1>To do List</h1>
      <InputBox />
      <Filter />
      <Todos />
    </div>
  );
}

export default App;

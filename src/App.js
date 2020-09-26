import React from "react";
import "./App.css";
import Pacman from "./components/Pacman";

function App() {
  return (
    <div className="app">
      <div className="score">
        <p className="result">Score: 0</p>
      </div>
      <div className="board">
        <Pacman />
      </div>
    </div>
  );
}

export default App;

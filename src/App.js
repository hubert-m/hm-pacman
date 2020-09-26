import React from "react";
import "./App.css";
import Pacman from "./components/Pacman";
import Ghost from "./components/Ghost";

function App() {
  return (
    <div className="app">
      <div className="score">
        <p className="result">Score: 0</p>
      </div>
      <div className="board">
        <Pacman />
        <Ghost color="pink" position={{ top: 50 * 2, left: 50 * 6}}/>
          <Ghost color="red" position={{ top: 50 * 7, left: 50 * 2}}/>
          <Ghost color="blue" position={{ top: 50 * 4, left: 50 * 11}}/>
          <Ghost color="yellow" position={{ top: 50 * 7, left: 50 * 10}}/>
      </div>
    </div>
  );
}

export default App;

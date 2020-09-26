import React, { useState } from "react";
import "./App.css";
import Score from "./components/Score";
import Board from "./components/Board";

function App() {
  const [score, setScore] = useState(0);
  return (
    <div className="app">
      <Score score={score}/>
      <Board setScore={setScore}/>
    </div>
  );
}

export default App;

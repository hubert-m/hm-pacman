import React, { useState, useEffect, useRef } from "react";
import useWindowSize from "./helpers/useWindowSize";
import "./App.css";
import Score from "./components/Score";
import Board from "./components/Board";
import RefreshButton from "./components/RefreshButton";
import ResizedPage from "./components/ResizedPage";
import StateBoard from "./constants/StateBoard";
import LosePage from "./components/LosePage";

let resizePrevent = false;
function App() {
  const windowSize = useWindowSize();
  const pacmanRef = useRef(null);
  const [score, setScore] = useState(0);
  const [stateBoard, setStateBoard] = useState(StateBoard.PLAY);

  useEffect(() => {
    if (windowSize.width) {
      if (resizePrevent) setStateBoard(StateBoard.RESIZED);
      resizePrevent = true;
    }
  }, [windowSize]);

  return (
    <div className="app">
      {stateBoard === StateBoard.RESIZED && <ResizedPage />}
      {stateBoard === StateBoard.LOSE && <LosePage />}
      <RefreshButton />
      <Score score={score} />
      <Board
        setScore={setScore}
        pacmanRef={pacmanRef}
        stateBoard={stateBoard}
        setStateBoard={setStateBoard}
      />
    </div>
  );
}

export default App;

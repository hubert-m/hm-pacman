import React, { useState, useEffect, useRef } from "react";
import useWindowSize from "./helpers/useWindowSize";
import "./App.css";
import Score from "./components/Score";
import Board from "./components/Board";
import ResizedPage from "./components/ResizedPage";
import StateBoard from "./constants/StateBoard";
import LosePage from "./components/LosePage";
import WonPage from "./components/WonPage";
import PausePage from "./components/PausePage";
import maxStepsHeight from "./helpers/maxStepsHeight";
import maxStepsWidth from "./helpers/maxStepsWidth";
import { PauseButton, RefreshButton } from "./components/Buttons";

let resizePrevent = false;
function App() {
  const windowSize = useWindowSize();
  const pacmanRef = useRef(null);
  const allCoins =
    maxStepsHeight(windowSize.height) * maxStepsWidth(windowSize.width) - 1;
  const [score, setScore] = useState(0);
  const [stateBoard, setStateBoard] = useState(StateBoard.PLAY);

  useEffect(() => {
    if (windowSize.width) {
      if (resizePrevent) setStateBoard(StateBoard.RESIZED);
      resizePrevent = true;
    }
  }, [windowSize]);

  useEffect(() => {
    if (score === allCoins && stateBoard === StateBoard.PLAY)
      setStateBoard(StateBoard.WON);
  }, [score, allCoins, stateBoard]);

  return (
    <div className="app">
      {stateBoard === StateBoard.RESIZED && <ResizedPage />}
      {stateBoard === StateBoard.LOSE && <LosePage />}
      {stateBoard === StateBoard.WON && <WonPage score={score} />}
      {stateBoard === StateBoard.PAUSE && (
        <PausePage setStateBoard={setStateBoard} />
      )}
      <RefreshButton />
      <PauseButton stateBoard={stateBoard} setStateBoard={setStateBoard} />
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

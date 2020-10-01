import React, { useState, useEffect, useRef } from "react";
import useWindowSize from "./helpers/useWindowSize";
import "./App.css";
import Score from "./components/Score";
import Board from "./components/Board";
import RefreshButton from "./components/RefreshButton";
import ResizedPage from "./components/ResizedPage";

let resizePrevent = false;
function App() {
  const size = useWindowSize();
  const pacmanRef = useRef(null);
  const [score, setScore] = useState(0);
  const [isWindowResized, setWindowResized] = useState(false);

  useEffect(() => {
    if (size.width) {
      if (resizePrevent) setWindowResized(true);
      resizePrevent = true;
    }
  }, [size]);

  return (
    <div className="app">
      {isWindowResized && <ResizedPage />}
      <RefreshButton />
      <Score score={score} />
      <Board setScore={setScore} isWindowResized={isWindowResized} pacmanRef={pacmanRef} />
    </div>
  );
}

export default App;

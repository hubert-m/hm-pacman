import React from "react";
import { ReactComponent as PlayImg } from "../assets/images/play.svg";
import StateBoard from "../constants/StateBoard";

const PausePage = ({ setStateBoard }) => {
  const handlePlay = () => {
    setStateBoard(StateBoard.PLAY);
  };

  return (
    <div className="pause-page">
      <button onClick={handlePlay} className="play-button">
        <PlayImg className="play-svg" alt="Pause" />
      </button>
      <div className="author">
        Author: <a href="https://machalahubert.pl">Hubert Machała</a>
      </div>
      <div className="instruction">
        <p className="headline">Control:</p>
        <p className="keys">
          <i>W</i>
          <i>S</i>
          <i>A</i>
          <i>D</i>
        </p>
        <p className="keys-or">or</p>
        <p className="keys">
          <i>&#8593;</i>
          <i>&#8595;</i>
          <i>&#8592;</i>
          <i>&#8594;</i>
        </p>
      </div>
    </div>
  );
};

export default PausePage;

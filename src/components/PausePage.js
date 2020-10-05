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
        <PlayImg className="play-svg" />
      </button>
    </div>
  );
};

export default PausePage;

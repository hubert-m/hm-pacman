import React, { useState } from "react";
import Settings from "../constants/Settings";
import StateBoard from "../constants/StateBoard";

export const PauseButton = ({ stateBoard, setStateBoard }) => {
  const [variant, setVariant] = useState(StateBoard.PAUSE);
  const handlePauseButton = () => {
    if (stateBoard === StateBoard.PLAY) {
      setStateBoard(StateBoard.PAUSE);
      setVariant(StateBoard.PLAY);
    } else if (stateBoard === StateBoard.PAUSE) {
      setStateBoard(StateBoard.PLAY);
      setVariant(StateBoard.PAUSE);
    }
  };
  return (
    <button
      onClick={handlePauseButton}
      className={"button_top " + variant}
    />
  );
};

export const RefreshButton = () => {
  return (
    <button className="refresh-button" style={{ right: Settings.BORDER }}>
      Refresh
    </button>
  );
};

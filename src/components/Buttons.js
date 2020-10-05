import React, { useState, useEffect } from "react";
import Settings from "../constants/Settings";
import StateBoard from "../constants/StateBoard";

export const PauseButton = ({ stateBoard, setStateBoard }) => {
  const [variant, setVariant] = useState(StateBoard.PAUSE);
  const handlePauseButton = () => {
    if (stateBoard === StateBoard.PLAY) {
      setStateBoard(StateBoard.PAUSE);
    } else if (stateBoard === StateBoard.PAUSE) {
      setStateBoard(StateBoard.PLAY);
    }
  };
  useEffect(() => {
    if (stateBoard === StateBoard.PLAY) {
      setVariant(StateBoard.PAUSE);
    } else if (stateBoard === StateBoard.PAUSE) {
      setVariant(StateBoard.PLAY);
    }
  }, [stateBoard]);
  return (
    <button onClick={handlePauseButton} className={"button_top " + variant} />
  );
};

export const RefreshButton = () => {
  const handleRefresh = () => {
    window.location.reload(false);
  };
  return (
    <button
      className="refresh-button"
      onClick={handleRefresh}
      style={{ right: Settings.BORDER }}
    >
      Refresh
    </button>
  );
};

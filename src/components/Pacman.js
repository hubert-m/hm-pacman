import React from "react";
import PropTypes from "prop-types";
import { ReactComponent as PacmanSvg } from "../assets/images/pacman.svg";
import Settings from "../constants/Settings";
import Directions from "../constants/Directions";

// TODO: rebuild to functional component
const Pacman = ({
  position,
  setPosition,
  direction,
  setDirection,
  pacmanRef,
}) => {
  const handleKeyDown = ({ keyCode, key }) => {
    const currentTop = position.top;
    const currentLeft = position.left;

    if (
      (keyCode === 39 && key === "ArrowRight") ||
      (keyCode === 68 && key === "d")
    ) {
      if (
        currentLeft + Settings.STEP <=
        window.innerWidth - Settings.BORDER - Settings.STEP
      ) {
        setDirection(Directions.RIGHT);
        setPosition({
          top: currentTop,
          left: currentLeft + Settings.STEP,
        });
      }
    } else if (
      (keyCode === 40 && key === "ArrowDown") ||
      (keyCode === 83 && key === "s")
    ) {
      if (
        currentTop + Settings.STEP <=
        window.innerHeight - Settings.BORDER - Settings.STEP
      ) {
        setDirection(Directions.DOWN);
        setPosition({
          top: currentTop + Settings.STEP,
          left: currentLeft,
        });
      }
    } else if (
      (keyCode === 37 && key === "ArrowLeft") ||
      (keyCode === 65 && key === "a")
    ) {
      setDirection(Directions.LEFT);
      setPosition({
        top: currentTop,
        left: Math.max(currentLeft - Settings.STEP, Settings.BORDER),
      });
    } else if (
      (keyCode === 38 && key === "ArrowUp") ||
      (keyCode === 87 && key === "w")
    ) {
      setDirection(Directions.UP);
      setPosition({
        top: Math.max(
          currentTop - Settings.STEP,
          Settings.BORDER + Settings.TOP_SCORE_BOARD_HEIGHT
        ),
        left: currentLeft,
      });
    }
  };
  return (
    <div
      ref={pacmanRef}
      className={`pacman pacman-${direction}`}
      tabIndex="0"
      style={{
        top: position.top,
        left: position.left,
        width: Settings.STEP,
        height: Settings.STEP,
      }}
      onKeyDown={handleKeyDown}
    >
      <PacmanSvg style={{ width: Settings.SIZE, height: Settings.SIZE }} />
    </div>
  );
};


Pacman.propTypes = {
  position: PropTypes.object.isRequired,
  setPosition: PropTypes.func.isRequired,
  direction: PropTypes.string.isRequired,
  setDirection: PropTypes.func.isRequired,
  pacmanRef: PropTypes.object.isRequired,
};

export default Pacman;

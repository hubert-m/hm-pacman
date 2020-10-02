import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { ReactComponent as GhostSvg } from "../assets/images/ghost.svg";
import "../assets/css/Ghost.css";
import Settings from "../constants/Settings";
import Directions from "../constants/Directions";

const Ghost = ({ color, startPosition }) => {
  const [direction, setDirection] = useState(Directions.LEFT);
  const [position, setPosition] = useState({
    top: Settings.TOP_SCORE_BOARD_HEIGHT + Settings.BORDER + startPosition.top,
    left: Settings.BORDER + startPosition.left,
  });

  // TODO: FIX MOVE GHOSTS WHILE MOVING PACMAN
  useEffect(() => {
    const changeDirectionInterval = setInterval(changeDirection, 2000);
    const moveInterval = setInterval(move, 2000);
    return () => {
      clearInterval(changeDirectionInterval);
      clearInterval(moveInterval);
    };
  });

  const changeDirection = () => {
    const arrayOfMovement = Object.values(Directions);
    const movement = Math.floor(Math.random() * arrayOfMovement.length);
    setDirection(arrayOfMovement[movement]);
    console.log("123");
  };

  const move = () => {
    const currentTop = position.top;
    const currentLeft = position.left;

    if (direction === "right") {
      if (
        currentLeft + Settings.STEP <=
        window.innerWidth - Settings.BORDER - Settings.STEP
      ) {
        setPosition({
          top: currentTop,
          left: currentLeft + Settings.STEP,
        });
      }
    } else if (direction === "down") {
      if (
        currentTop + Settings.STEP <=
        window.innerHeight - Settings.BORDER - Settings.STEP
      ) {
        setPosition({
          top: currentTop + Settings.STEP,
          left: currentLeft,
        });
      }
    } else if (direction === "left") {
      setPosition({
        top: currentTop,
        left: Math.max(currentLeft - Settings.STEP, Settings.BORDER),
      });
    } else if (direction === "up") {
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
      className="ghost"
      style={{
        top: position.top,
        left: position.left,
        width: Settings.STEP,
        height: Settings.STEP,
      }}
    >
      <GhostSvg
        className={`ghost-${color}`}
        style={{ width: Settings.SIZE, height: Settings.SIZE }}
      />
    </div>
  );
};

Ghost.propTypes = {
  color: PropTypes.string.isRequired,
  startPosition: PropTypes.object.isRequired,
};

export default Ghost;

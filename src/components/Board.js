import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Pacman from "./Pacman";
import Ghost from "./Ghost";
import Food from "./Food";
import Settings from "../constants/Settings";
import maxStepsWidth from "../helpers/maxStepsWidth";
import maxStepsHeight from "../helpers/maxStepsHeight";
import Directions from "../constants/Directions";
import Control from "./Control";
import useWindowSize from "../helpers/useWindowSize";
import StateBoard from "../constants/StateBoard";
import setGhostsLoop from "../helpers/setGhostsLoop";

const Board = ({ setScore, pacmanRef, stateBoard, setStateBoard }) => {
  const windowSize = useWindowSize();
  const [pacmanDirection, pacmanSetDirection] = useState(Directions.RIGHT);
  const [pacmanPosition, pacmanSetPosition] = useState({
    top: Settings.BORDER + Settings.TOP_SCORE_BOARD_HEIGHT,
    left: Settings.BORDER,
  });
  const [ghosts, setGhosts] = useState([]);
  const [generateGhosts, setGenerateGhosts] = useState(true);

  const foodsRef = [];
  const amountOfFood =
    ((windowSize.width - Settings.STEP) *
      (windowSize.height - Settings.TOP_SCORE_BOARD_HEIGHT)) /
      (Settings.STEP * Settings.STEP) -
    1;

  for (let i = 0; i < amountOfFood; i++) {
    foodsRef[i] = React.createRef();
  }

  useEffect(() => {
    if (stateBoard === StateBoard.PLAY) {
      if (pacmanRef) pacmanRef.current.focus();
      const intervalFood = setInterval(lookForEat, 100);
      const intervalGhost = setInterval(ghostCollision, 100);
      return () => {
        clearInterval(intervalFood);
        clearInterval(intervalGhost);
      };
    } else {
      if (pacmanRef) pacmanRef.current.blur();
    }
  });

  const lookForEat = () => {
    const pacmanX = pacmanPosition.left;
    const pacmanY = pacmanPosition.top;

    const pacmanLastX = pacmanX + Settings.SIZE / 2;
    const pacmanLastY = pacmanY + Settings.SIZE / 2;

    for (let i = 0; i <= amountOfFood; i++) {
      const currentFood = foodsRef[i].current;
      if (currentFood) {
        const currentFoodX = currentFood.state.position.left;
        const currentFoodY = currentFood.state.position.top;
        const currentFoodLastX = currentFoodX + Settings.STEP / 2;
        const currentFoodLastY = currentFoodY + Settings.STEP / 2;

        if (
          (pacmanX >= currentFoodX && pacmanX <= currentFoodLastX) ||
          (pacmanLastX >= currentFoodX && pacmanLastX <= currentFoodLastX)
        ) {
          if (
            (pacmanY >= currentFoodY && pacmanY <= currentFoodLastY) ||
            (pacmanLastY >= currentFoodY && pacmanLastY <= currentFoodLastY)
          ) {
            if (!currentFood.state.hidden) {
              currentFood.ate();
              setScore((value) => value + 1);
            }
          }
        }
      }
    }
  };

  const foods = [];
  let countOfCoins = 0;
  for (let i = 0; i < maxStepsHeight(window.innerHeight); i++) {
    for (let j = 0; j < maxStepsWidth(window.innerWidth); j++) {
      if (i === 0 && j === 0) j = 1;

      const position = {
        left: Settings.BORDER + j * Settings.STEP,
        top:
          Settings.TOP_SCORE_BOARD_HEIGHT + Settings.BORDER + i * Settings.STEP,
      };

      countOfCoins++;
      foods.push(
        <Food
          key={`food-elem-${countOfCoins}`}
          position={position}
          ref={foodsRef[countOfCoins]}
        />
      );
    }
  }

  const numberOfGhosts = Math.ceil(foods.length / Settings.GHOST_PER_X_POINTS);
  const ghostsRef = [];

  for (let i = 0; i < numberOfGhosts; i++) {
    ghostsRef[i] = React.createRef();
  }

  const ghostCollision = () => {
    const pacmanX = pacmanPosition?.left;
    const pacmanY = pacmanPosition?.top;
    for (let i = 0; i < numberOfGhosts; i++) {
      const currentGhost = ghostsRef[i]?.current;
      const currentGhostX = currentGhost?.state?.position?.left;
      const currentGhostY = currentGhost?.state?.position?.top;
      if (
        pacmanX === currentGhostX &&
        pacmanY === currentGhostY &&
        pacmanX &&
        pacmanY &&
        currentGhostX &&
        currentGhostY
      ) {
        setStateBoard(StateBoard.LOSE);
      }
    }
  };

  useEffect(() => {
    if (generateGhosts) setGhosts([...setGhostsLoop(numberOfGhosts, windowSize)]);
    setGenerateGhosts(false);
  }, [generateGhosts, numberOfGhosts, windowSize]);

  return (
    <div className="board">
      {foods}
      <Pacman
        position={pacmanPosition}
        setPosition={pacmanSetPosition}
        direction={pacmanDirection}
        setDirection={pacmanSetDirection}
        pacmanRef={pacmanRef}
      />
      {stateBoard === StateBoard.PLAY && (
        <Control
          position={pacmanPosition}
          setPosition={pacmanSetPosition}
          setDirection={pacmanSetDirection}
        />
      )}
      {ghosts.map((item, index) => {
        return (
          <Ghost
            ref={ghostsRef[index]}
            key={`ghost-elem-${index}`}
            color={item?.color}
            position={item?.position}
            stateBoard={stateBoard}
          />
        );
      })}
    </div>
  );
};

Board.defaultProps = {
  setScore: () => {},
  pacmanRef: {},
};
Board.propTypes = {
  setScore: PropTypes.func,
  pacmanRef: PropTypes.object,
  stateBoard: PropTypes.string.isRequired,
  setStateBoard: PropTypes.func.isRequired,
};

export default Board;

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Pacman from "./Pacman";
import Ghost from "./Ghost";
import Food from "./Food";
import Settings from "../constants/Settings";
import maxStepsWidth from "../helpers/maxStepsWidth";
import maxStepsHeight from "../helpers/maxStepsHeight";
import GhostColors from "../constants/GhostColors";
import Directions from "../constants/Directions";
import Control from "./Control";

const setGhostsLoop = (numberOfGhosts) => {
  const result = [];
  for (let i = 0; i < numberOfGhosts; i++) {
    const randomHeight = Math.floor(
        Math.random() * maxStepsHeight(window.innerHeight)
    );
    const randomWidth = Math.floor(
        Math.random() * maxStepsWidth(window.innerWidth)
    );
    const position = {
      top: Settings.STEP * randomHeight,
      left: Settings.STEP * randomWidth,
    };
    const randomColorIndex = Math.floor(
        Math.random() * Object.values(GhostColors).length
    );

    result.push({
      color: Object.values(GhostColors)[randomColorIndex],
      startPosition: position,
    })
  }
  return result;
}

const Board = ({ setScore, isWindowResized, pacmanRef }) => {
  const [pacmanDirection, pacmanSetDirection] = useState(Directions.RIGHT);
  const [pacmanPosition, pacmanSetPosition] = useState({
    top: Settings.BORDER + Settings.TOP_SCORE_BOARD_HEIGHT,
    left: Settings.BORDER,
  });
  const [ghosts, setGhosts] = useState([]);
  const [generateGhosts, setGenerateGhosts] = useState(true);

  const foodsRef = [];
  const amountOfFood =
    ((window.innerWidth - Settings.STEP) *
      (window.innerHeight - Settings.TOP_SCORE_BOARD_HEIGHT)) /
      (Settings.STEP * Settings.STEP) -
    1;

  for (let i = 0; i < amountOfFood; i++) {
    foodsRef["food" + i] = React.createRef();
  }

  useEffect(() => {
    if (!isWindowResized && pacmanRef) pacmanRef.current.focus();
    if (isWindowResized && pacmanRef) pacmanRef.current.blur();
  }, [pacmanRef, isWindowResized]);

  useEffect(() => {
    const intervalFood = setInterval(lookForEat, 100);
    return () => {
      clearInterval(intervalFood);
    };
  });

  const lookForEat = () => {
    const pacmanX = pacmanPosition.left;
    const pacmanY = pacmanPosition.top;
    const pacmanSize = Settings.SIZE;

    const pacmanLastX = pacmanX + pacmanSize / 2;
    const pacmanLastY = pacmanY + pacmanSize / 2;

    for (let i = 0; i <= amountOfFood; i++) {
      const currentFood = foodsRef["food" + i].current;
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
          ref={foodsRef["food" + countOfCoins]}
        />
      );
    }
  }

  const numberOfGhosts = Math.ceil(foods.length / Settings.GHOST_PER_X_POINTS);

  useEffect(() => {
    if(generateGhosts) {
      const tmp = setGhostsLoop(numberOfGhosts);
      setGhosts([...tmp]);
    }
    setGenerateGhosts(false);
  }, [generateGhosts, numberOfGhosts])

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
      <Control
        position={pacmanPosition}
        setPosition={pacmanSetPosition}
        setDirection={pacmanSetDirection}
      />
      {ghosts.map((item, index) => {
        return (
            <Ghost
                key={`ghost-elem-${index}`}
                color={item?.color}
                startPosition={item?.startPosition}
            />
        )
      })}
    </div>
  );
};

Board.defaultProps = {
  setScore: () => {},
  isWindowResized: false,
  pacmanRef: {},
};
Board.propTypes = {
  setScore: PropTypes.func,
  isWindowResized: PropTypes.bool,
  pacmanRef: PropTypes.object,
};

export default Board;

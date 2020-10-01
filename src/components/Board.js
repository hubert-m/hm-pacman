import React, { Component } from "react";
import PropTypes from "prop-types";
import Pacman from "./Pacman";
import Ghost from "./Ghost";
import Food from "./Food";
import Settings from "../constants/Settings";

class Board extends Component {
  constructor(props) {
    super(props);

    this.pacmanRef = React.createRef();

    this.foods = [];
    this.amountOfFood =
      ((window.innerWidth - Settings.STEP) *
        (window.innerHeight - Settings.TOP_SCORE_BOARD_HEIGHT)) /
        (Settings.STEP * Settings.STEP) -
      1;

    console.log(this.amountOfFood);
    for (let i = 0; i < this.amountOfFood; i++) {
      this["food" + i] = React.createRef();
    }
  }

  componentDidMount() {
    this.intervalFood = setInterval(this.lookForEat, 100);
  }

  componentWillUnmount() {
    clearInterval(this.intervalFood);
  }

  lookForEat = () => {
    const pacmanX = this.pacmanRef.current.state.position.left;
    const pacmanY = this.pacmanRef.current.state.position.top;
    const pacmanSize = this.pacmanRef.current.props.size;

    const pacmanLastX = pacmanX + pacmanSize / 2;
    const pacmanLastY = pacmanY + pacmanSize / 2;

    for (let i = 0; i <= this.amountOfFood; i++) {
      const currentFood = this["food" + i].current;
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
              this.props.setScore((value) => value + 1);
            }
          }
        }
      }
    }
  };
  render() {
    let foods = [];
    let currentTop = 0;
    let currentLeft = Settings.STEP;
    for (let i = 0; i < this.amountOfFood; i++) {
      if (currentLeft + Settings.STEP >= window.innerWidth - Settings.BORDER) {
        currentTop += Settings.STEP;
        currentLeft = 0;
      }

      if (
        currentTop + Settings.STEP >=
        window.innerHeight - Settings.BORDER - Settings.TOP_SCORE_BOARD_HEIGHT
      ) {
        break;
      }

      const position = {
        left: currentLeft + Settings.BORDER,
        top: currentTop + Settings.BORDER + Settings.TOP_SCORE_BOARD_HEIGHT,
      };
      currentLeft += Settings.STEP;
      foods.push(
        <Food
          key={`food-elem-${i}`}
          position={position}
          ref={this["food" + i]}
        />
      );
    }
    return (
      <div className="board">
        {foods}
        <Pacman ref={this.pacmanRef} />
        <Ghost color="pink" position={{ top: 50 * 2, left: 50 * 6 }} />
        <Ghost color="red" position={{ top: 50 * 7, left: 50 * 2 }} />
        <Ghost color="blue" position={{ top: 50 * 4, left: 50 * 11 }} />
        <Ghost color="yellow" position={{ top: 50 * 7, left: 50 * 10 }} />
      </div>
    );
  }
}

Board.defaultProps = {
  setScore: () => {},
};
Board.propTypes = {
  setScore: PropTypes.func,
};

export default Board;

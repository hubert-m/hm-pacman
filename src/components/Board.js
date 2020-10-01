import React, { Component } from "react";
import PropTypes from "prop-types";
import Pacman from "./Pacman";
import Ghost from "./Ghost";
import Food from "./Food";
import Settings from "../constants/Settings";
import maxStepsWidth from "../helpers/maxStepsWidth";
import maxStepsHeight from "../helpers/maxStepsHeight";

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
    let countOfCoins = 0;
    for (let i = 0; i < maxStepsHeight(window.innerHeight); i++) {
      for (let j = 0; j < maxStepsWidth(window.innerWidth); j++) {

        const position = {
          left: Settings.BORDER + (j * Settings.STEP),
          top: Settings.TOP_SCORE_BOARD_HEIGHT + Settings.BORDER + (i * Settings.STEP),
        }

        countOfCoins++;
        foods.push(
            <Food
                key={`food-elem-${countOfCoins}`}
                position={position}
                ref={this["food" + countOfCoins]}
            />
        );
      }
    }

    return (
      <div className="board">
        {foods}
        <Pacman ref={this.pacmanRef} isFocusOn={!this.props.isWindowResized} />
        <Ghost
          color="pink"
          position={{ top: Settings.STEP * 2, left: Settings.STEP * 2 }}
        />
        <Ghost
          color="red"
          position={{ top: Settings.STEP * 7, left: Settings.STEP * 2 }}
        />
        <Ghost
          color="blue"
          position={{ top: Settings.STEP * 4, left: Settings.STEP * 11 }}
        />
        <Ghost
          color="yellow"
          position={{ top: Settings.STEP * 7, left: Settings.STEP * 10 }}
        />
      </div>
    );
  }
}

Board.defaultProps = {
  setScore: () => {},
  isWindowResized: false,
};
Board.propTypes = {
  setScore: PropTypes.func,
  isWindowResized: PropTypes.bool,
};

export default Board;

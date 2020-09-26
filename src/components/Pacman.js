import React, { Component } from "react";
import propTypes from "prop-types";
import { ReactComponent as PacmanSvg } from "../assets/images/pacman.svg";

class Pacman extends Component {
  state = {
    direction: "right",
    position: {
      top: 50,
      left: 50,
    },
  };

  handleKeyDown = (event) => {
    console.log(event.keyCode, event.key);
  };

  render() {
    return (
      <div className="pacman" style={this.state.position}>
        <PacmanSvg />
      </div>
    );
  }
}

Pacman.defaultProps = {
  step: 50,
  size: 50,
  border: 10 * 2,
  topScoreBoardHeight: 50,
};

Pacman.propTypes = {
  step: propTypes.number,
  size: propTypes.number,
  border: propTypes.number,
  topScoreBoardHeight: propTypes.number,
};

export default Pacman;

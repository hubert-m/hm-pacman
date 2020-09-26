import React, { Component } from "react";
import propTypes from "prop-types";
import { ReactComponent as PacmanSvg } from "../assets/images/pacman.svg";

class Pacman extends Component {
  state = {
    direction: "right",
    position: {
      top: this.props.border + this.props.topScoreBoardHeight,
      left: this.props.border,
    },
  };

  constructor(props) {
    super(props);
    this.pacmanRef = React.createRef();
  }

  componentDidMount() {
    this.pacmanRef.current.focus();
  }

  handleKeyDown = ({ keyCode, key }) => {
    console.log(keyCode, key);

    const currentTop = this.state.position.top;
    const currentLeft = this.state.position.left;
    const { step, size, border, topScoreBoardHeight } = this.props;

    if (
      (keyCode === 39 && key === "ArrowRight") ||
      (keyCode === 68 && key === "d")
    ) {
      this.setState({
        direction: "right",
        position: {
          top: currentTop,
          left: Math.min(currentLeft + step, window.innerWidth - border - size),
        },
      });
    } else if (
      (keyCode === 40 && key === "ArrowDown") ||
      (keyCode === 83 && key === "s")
    ) {
      this.setState({
        direction: "down",
        position: {
          top: Math.min(currentTop + step, window.innerHeight - border - size),
          left: currentLeft,
        },
      });
    } else if (
      (keyCode === 37 && key === "ArrowLeft") ||
      (keyCode === 65 && key === "a")
    ) {
      this.setState({
        direction: "left",
        position: {
          top: currentTop,
          left: Math.max(currentLeft - step, border),
        },
      });
    } else if (
      (keyCode === 38 && key === "ArrowUp") ||
      (keyCode === 87 && key === "w")
    ) {
      this.setState({
        direction: "up",
        position: {
          top: Math.max(currentTop - step, border + topScoreBoardHeight),
          left: currentLeft,
        },
      });
    }
  };

  render() {
    const { direction, position } = this.state;
    return (
      <div
        ref={this.pacmanRef}
        className={`pacman pacman-${direction}`}
        tabIndex="0"
        style={position}
        onKeyDown={this.handleKeyDown}
      >
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

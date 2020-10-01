import React, { Component } from "react";
import PropTypes from "prop-types";
import { ReactComponent as PacmanSvg } from "../assets/images/pacman.svg";
import Settings from "../constants/Settings";
import Directions from "../constants/Directions";

class Pacman extends Component {
  state = {
    direction: Directions.RIGHT,
    position: {
      top: Settings.BORDER + Settings.TOP_SCORE_BOARD_HEIGHT,
      left: Settings.BORDER,
    },
  };

  constructor(props) {
    super(props);
    this.pacmanRef = React.createRef();
  }

  componentDidMount() {
    if (this.props.isFocusOn) this.pacmanRef.current.focus();
  }

  handleKeyDown = ({ keyCode, key }) => {
    const currentTop = this.state.position.top;
    const currentLeft = this.state.position.left;

    if (
      (keyCode === 39 && key === "ArrowRight") ||
      (keyCode === 68 && key === "d")
    ) {
      if (
        currentLeft + Settings.STEP <=
        window.innerWidth - Settings.BORDER - Settings.SIZE
      ) {
        this.setState({
          direction: Directions.RIGHT,
          position: {
            top: currentTop,
            left: currentLeft + Settings.STEP,
          },
        });
      }
    } else if (
      (keyCode === 40 && key === "ArrowDown") ||
      (keyCode === 83 && key === "s")
    ) {
      if (
        currentTop + Settings.STEP <=
        window.innerHeight - Settings.BORDER - Settings.SIZE
      ) {
        this.setState({
          direction: Directions.DOWN,
          position: {
            top: currentTop + Settings.STEP,
            left: currentLeft,
          },
        });
      }
    } else if (
      (keyCode === 37 && key === "ArrowLeft") ||
      (keyCode === 65 && key === "a")
    ) {
      this.setState({
        direction: Directions.LEFT,
        position: {
          top: currentTop,
          left: Math.max(currentLeft - Settings.STEP, Settings.BORDER),
        },
      });
    } else if (
      (keyCode === 38 && key === "ArrowUp") ||
      (keyCode === 87 && key === "w")
    ) {
      this.setState({
        direction: Directions.UP,
        position: {
          top: Math.max(
            currentTop - Settings.STEP,
            Settings.BORDER + Settings.TOP_SCORE_BOARD_HEIGHT
          ),
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
        style={{
          top: position.top,
          left: position.left,
          width: Settings.STEP,
          height: Settings.STEP,
        }}
        onKeyDown={this.handleKeyDown}
      >
        <PacmanSvg style={{ width: Settings.SIZE, height: Settings.SIZE }} />
      </div>
    );
  }
}

Pacman.defaultProps = {
  isFocusOn: true,
};

Pacman.propTypes = {
  isFocusOn: PropTypes.bool,
};

export default Pacman;

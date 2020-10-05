import React, { Component } from "react";
import PropTypes from "prop-types";
import { ReactComponent as GhostSvg } from "../assets/images/ghost.svg";
import "../assets/css/Ghost.css";
import Settings from "../constants/Settings";
import Directions from "../constants/Directions";
import StateBoard from "../constants/StateBoard";

class Ghost extends Component {
  state = {
    direction: this.props.direction,
    position: {
      top:
        Settings.TOP_SCORE_BOARD_HEIGHT +
        Settings.BORDER +
        this.props.position.top,
      left: Settings.BORDER + this.props.position.left,
    },
  };

  componentDidMount() {
    if (this.props.stateBoard === StateBoard.PLAY) {
      this.changeDirectionInterval = setInterval(this.changeDirection, 2000);
      this.moveInterval = setInterval(this.move, 2000);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.stateBoard !== prevProps.stateBoard) {
      if (this.props.stateBoard === StateBoard.PLAY) {
        this.changeDirectionInterval = setInterval(this.changeDirection, 2000);
        this.moveInterval = setInterval(this.move, 2000);
      } else {
        clearInterval(this.changeDirectionInterval);
        clearInterval(this.moveInterval);
      }
    }
  }

  componentWillUnmount() {
    if (this.props.stateBoard === StateBoard.PLAY) {
      clearInterval(this.changeDirectionInterval);
      clearInterval(this.moveInterval);
    }
  }

  changeDirection = () => {
    const arrayOfMovement = Object.values(Directions);
    const movement = Math.floor(Math.random() * arrayOfMovement.length);
    this.setState({ direction: arrayOfMovement[movement] });
  };

  move = () => {
    const currentTop = this.state.position.top;
    const currentLeft = this.state.position.left;
    const { direction } = this.state;

    if (direction === "right") {
      if (
        currentLeft + Settings.STEP <=
        window.innerWidth - Settings.BORDER - Settings.STEP
      ) {
        this.setState({
          position: {
            top: currentTop,
            left: currentLeft + Settings.STEP,
          },
        });
      }
    } else if (direction === "down") {
      if (
        currentTop + Settings.STEP <=
        window.innerHeight - Settings.BORDER - Settings.STEP
      ) {
        this.setState({
          position: {
            top: currentTop + Settings.STEP,
            left: currentLeft,
          },
        });
      }
    } else if (direction === "left") {
      this.setState({
        position: {
          top: currentTop,
          left: Math.max(currentLeft - Settings.STEP, Settings.BORDER),
        },
      });
    } else if (direction === "up") {
      this.setState({
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
    const { color } = this.props;
    const { position } = this.state;
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
  }
}

Ghost.defaultProps = {
  stateBoard: StateBoard.PLAY,
};

Ghost.propTypes = {
  color: PropTypes.string.isRequired,
  position: PropTypes.object.isRequired,
  stateBoard: PropTypes.string,
};

export default Ghost;

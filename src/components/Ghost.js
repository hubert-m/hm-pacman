import React, { Component } from "react";
import { ReactComponent as GhostSvg } from "../assets/images/ghost.svg";
import "../assets/css/Ghost.css";
import Settings from "../constants/Settings";
import GhostColors from "../constants/GhostColors";
import Directions from "../constants/Directions";

class Ghost extends Component {
  state = {
    direction: Directions.LEFT,
    position: {
      top:
        Settings.TOP_SCORE_BOARD_HEIGHT +
        Settings.BORDER +
        this.props.position.top,
      left: Settings.BORDER + this.props.position.left,
    },
  };

  componentDidMount() {
    this.changeDirectionInterval = setInterval(this.changeDirection, 2000);
    this.moveInterval = setInterval(this.move, 2000);
  }

  componentWillUnmount() {
    clearInterval(this.changeDirectionInterval);
    clearInterval(this.moveInterval);
  }

  changeDirection = () => {
    const arrayOfMovement = Object.values(Directions);
    const movement = Math.floor(Math.random() * arrayOfMovement.length);
    this.setState({ direction: arrayOfMovement[movement] });
  };

  move = () => {
    // TODO: refactor

    const currentTop = this.state.position.top;
    const currentLeft = this.state.position.left;
    const { direction } = this.state;

    if (direction === "right") {
      if (
        currentLeft + Settings.STEP <=
        window.innerWidth - Settings.BORDER - Settings.SIZE
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
        window.innerHeight - Settings.BORDER - Settings.SIZE
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
    return (
      <div
        className="ghost"
        style={{
          top: this.state.position.top,
          left: this.state.position.left,
          width: Settings.SIZE,
          height: Settings.SIZE,
        }}
      >
        <GhostSvg className={`ghost-${color}`} />
      </div>
    );
  }
}

Ghost.defaultProps = {
  color: GhostColors.PINK,
  position: {
    top: 50 * 3,
    left: 50 * 3,
  },
};

export default Ghost;

import React, { Component } from "react";
import { ReactComponent as GhostSvg } from "../assets/images/ghost.svg";
import "../assets/css/Ghost.css";

class Ghost extends Component {
  state = {
    direction: "left",
    position: {
      top: this.props.position.top,
      left: this.props.position.left,
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
    const arrayOfMovement = ["left", "up", "down", "right"];
    const movement = Math.floor(Math.random() * 4);

    this.setState({ direction: arrayOfMovement[movement] });
  };

  move = () => {
    // TODO: refactor

    const currentTop = this.state.position.top;
    const currentLeft = this.state.position.left;
    const { direction } = this.state;
    const { step, border, size, topScoreBoardHeight } = this.props;

    if (direction === "right") {
      this.setState({
        position: {
          top: currentTop,
          left: Math.min(currentLeft + step, window.innerWidth - border - size),
        },
      });
    } else if (direction === "down") {
      this.setState({
        position: {
          top: Math.min(
            currentTop + step,
            window.innerHeight - border - size - topScoreBoardHeight
          ),
          left: currentLeft,
        },
      });
    } else if (direction === "left") {
      this.setState({
        position: {
          top: currentTop,
          left: Math.max(currentLeft - step, border),
        },
      });
    } else if (direction === "up") {
      this.setState({
        position: {
          top: Math.max(currentTop - step, border + topScoreBoardHeight),
          left: currentLeft,
        },
      });
    }
  };

  render() {
    const { color } = this.props;
    return (
      <div style={this.state.position} className="ghost">
        <GhostSvg className={`ghost-${color}`} />
      </div>
    );
  }
}

Ghost.defaultProps = {
  color: "pink",
  step: 50,
  size: 50,
  position: {
    top: 50 * 3,
    left: 50 * 3,
  },
  border: 10 * 2,
  topScoreBoardHeight: 50,
};

export default Ghost;

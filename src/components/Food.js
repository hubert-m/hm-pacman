import React, { Component } from "react";
import "../assets/css/Food.css";
import Settings from "../constants/Settings";

class Food extends Component {
  state = {
    position: {
      top: this.props.position.top,
      left: this.props.position.left,
    },
    hidden: false,
  };

  ate() {
    this.setState({ hidden: !this.hidden });
  }

  render() {
    const { position, hidden } = this.state;
    return (
      <div
        style={{
          top: position.top,
          left: position.left,
          width: Settings.STEP,
          height: Settings.STEP,
        }}
        className={hidden ? "food hidden" : "food"}
      >
        <div
          className="food-dot"
          style={{
            width: Settings.COIN_SIZE,
            height: Settings.COIN_SIZE,
          }}
        />
      </div>
    );
  }
}

Food.defaultProps = {
  position: { top: 0, left: 0 },
};

export default Food;

import React, { Component } from "react";
import "../assets/css/Coin.css";
import Settings from "../constants/Settings";

class Coin extends Component {
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
        className={hidden ? "coin hidden" : "coin"}
      >
        <div
          className="coin-dot"
          style={{
            width: Settings.COIN_SIZE,
            height: Settings.COIN_SIZE,
          }}
        />
      </div>
    );
  }
}

Coin.defaultProps = {
  position: { top: 0, left: 0 },
};

export default Coin;

import React from "react";
import { Col, Row } from "reactstrap";
import Directions from "../constants/Directions";
import Settings from "../constants/Settings";

const Control = ({ state, pacmanRef }) => {
  const currentTop = state.position.top;
  const currentLeft = state.position.left;

  const handleClickUp = () => {
    pacmanRef.current.setState({
      direction: Directions.UP,
      position: {
        top: Math.max(
          currentTop - Settings.STEP,
          Settings.BORDER + Settings.TOP_SCORE_BOARD_HEIGHT
        ),
        left: currentLeft,
      },
    });
  };
  const handleClickLeft = () => {
    pacmanRef.current.setState({
      direction: Directions.LEFT,
      position: {
        top: currentTop,
        left: Math.max(currentLeft - Settings.STEP, Settings.BORDER),
      },
    });
  };
  const handleClickRight = () => {
    if (
      currentLeft + Settings.STEP <=
      window.innerWidth - Settings.BORDER - Settings.STEP
    ) {
      pacmanRef.current.setState({
        direction: Directions.RIGHT,
        position: {
          top: currentTop,
          left: currentLeft + Settings.STEP,
        },
      });
    }
  };
  const handleClickDown = () => {
    if (
      currentTop + Settings.STEP <=
      window.innerHeight - Settings.BORDER - Settings.STEP
    ) {
      pacmanRef.current.setState({
        direction: Directions.DOWN,
        position: {
          top: currentTop + Settings.STEP,
          left: currentLeft,
        },
      });
    }
  };
  return (
    <div className="control">
      <Row>
        <Col xs={{ size: 4, offset: 4 }} className="control-button-container">
          <button className="control-button" onClick={handleClickUp}>
            Up
          </button>
        </Col>
      </Row>
      <Row>
        <Col xs="4" className="control-button-container">
          <button className="control-button" onClick={handleClickLeft}>
            Left
          </button>
        </Col>
        <Col xs="4" className="control-button-container">
          <button className="control-button" onClick={handleClickDown}>
            Down
          </button>
        </Col>
        <Col xs="4" className="control-button-container">
          <button className="control-button" onClick={handleClickRight}>
            Right
          </button>
        </Col>
      </Row>
    </div>
  );
};

export default Control;

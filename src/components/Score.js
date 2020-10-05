import React from "react";
import PropTypes from "prop-types";
import Settings from "../constants/Settings";

const Score = ({ score }) => {
  return (
    <div className="score" style={{ minHeight: Settings.TOP_SCORE_BOARD_HEIGHT, height: Settings.TOP_SCORE_BOARD_HEIGHT }}>
      <p
        className="result"
        data-text={"Score: "+score}
      >
        Score: {score}
      </p>
    </div>
  );
};
Score.defaultProps = {
  score: 0,
};
Score.propTypes = {
  score: PropTypes.number,
};

export default Score;

import React from "react";
import PropTypes from 'prop-types';

const Score = ({ score }) => {
    return (
        <div className="score">
            <p className="result">Score: {score}</p>
        </div>
    )
}
Score.defaultProps = {
    score: 0,
}
Score.propTypes = {
    score: PropTypes.number,
}

export default Score;
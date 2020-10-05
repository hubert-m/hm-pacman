import React from "react";
import PropTypes from "prop-types";

const WonPage = ({ score }) => {
  return (
    <div className="won-page">
      <p className="won-page__text-success">You won!</p>
        <p className="won-page__text">You earned {score} coins</p>
      <p className="won-page__text">Refresh the page to play again</p>
    </div>
  );
};

WonPage.propTypes = {
  score: PropTypes.number.isRequired,
};

export default WonPage;

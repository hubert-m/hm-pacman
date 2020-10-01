import Settings from "../constants/Settings";

const maxStepsHeight = (height) => {
    return Math.floor((height -
        2 * Settings.BORDER -
        Settings.TOP_SCORE_BOARD_HEIGHT) /
        Settings.STEP);
};

export default maxStepsHeight;
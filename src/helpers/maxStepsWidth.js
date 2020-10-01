import Settings from "../constants/Settings";

const maxStepsWidth = (width) => {
    return Math.floor((width - 2 * Settings.BORDER) / Settings.STEP);
};

export default maxStepsWidth;
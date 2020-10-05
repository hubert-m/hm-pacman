import maxStepsHeight from "./maxStepsHeight";
import maxStepsWidth from "./maxStepsWidth";
import Settings from "../constants/Settings";
import GhostColors from "../constants/GhostColors";

const setGhostsLoop = (numberOfGhosts, windowSize) => {
    const result = [];
    for (let i = 0; i < numberOfGhosts; i++) {
        const randomHeight = Math.floor(
            Math.random() * maxStepsHeight(windowSize.height)
        );
        const randomWidth = Math.floor(
            Math.random() * maxStepsWidth(windowSize.width)
        );
        const position = {
            top: Settings.STEP * randomHeight,
            left: Settings.STEP * randomWidth,
        };
        const randomColorIndex = Math.floor(
            Math.random() * Object.values(GhostColors).length
        );

        result.push({
            color: Object.values(GhostColors)[randomColorIndex],
            position,
        });
    }
    return result;
};

export default setGhostsLoop;
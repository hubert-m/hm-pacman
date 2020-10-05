import maxStepsHeight from "./maxStepsHeight";
import maxStepsWidth from "./maxStepsWidth";
import Settings from "../constants/Settings";
import GhostColors from "../constants/GhostColors";

const setGhostsLoop = (numberOfGhosts, windowSize) => {
    const result = [];
    for (let i = 0; i < numberOfGhosts; i++) {
        let randomHeight = Math.floor(
            Math.random() * maxStepsHeight(windowSize.height)
        );
        let randomWidth = Math.floor(
            Math.random() * maxStepsWidth(windowSize.width)
        );
        if(randomHeight === 0 && randomWidth < 2) {
            randomHeight = Math.max(randomHeight, 2);
        }
        if(randomWidth === 0 && randomHeight < 2) {
            randomWidth = Math.max(randomWidth, 2);
        }
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
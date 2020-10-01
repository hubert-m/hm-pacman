import React from 'react';
import Settings from "../constants/Settings";

const RefreshButton = () => {
    return (
        <button className="refresh-button" style={{ right: Settings.BORDER }}>
            Refresh
        </button>
    )
}

export default RefreshButton;
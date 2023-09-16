import React from "react";
import styles from "./RightPanel.module.css";

const RightPanel = (props) => {
    return (
        <div className={styles.rightPanel}>
            {props.children}
        </div>
    );
}

export default RightPanel;
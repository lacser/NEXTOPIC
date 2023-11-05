import React from "react";
import styles from "./RightPanel.module.css";

const RightPanel = (props) => {
    return (
        <div className={styles.rightPanel}>
            <div className={styles.content}>
                {props.children}
            </div>
        </div>
    );
}

export default RightPanel;
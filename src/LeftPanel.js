import React from "react";
import styles from "./LeftPanel.module.css";
import LoginWidget from "./components/Login";
import { StartNewTopicInPanel } from "./components/NewTopic";

const LeftPanel = () => {
    return (
        <div className={styles.leftPanel}>
            <div className={styles.topContent}>
                <h1 className={styles.appTitle}>NEXTOPIC</h1>
                <StartNewTopicInPanel className={styles.StartNewTopicInPanel} />
            </div>
            <LoginWidget className={styles.LoginWidget} />
        </div>
    );
}

export default LeftPanel;
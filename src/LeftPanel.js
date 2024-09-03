import React from "react";
import styles from "./LeftPanel.module.css";
import LoginWidget from "./components/Login.js";
import { StartNewTopicInPanel } from "./components/NewTopic.js";
import { ChatHistory } from "./features/ChatHistoryPanel/ChatHistory.js";

const LeftPanel = () => {
    return (
        <div className={styles.leftPanel}>
            <div className={styles.topContent}>
                <StartNewTopicInPanel className={styles.StartNewTopicInPanel} />
                <ChatHistory />
            </div>
            {/*<LoginWidget className={styles.LoginWidget} />*/}
        </div>
    );
}

export default LeftPanel;
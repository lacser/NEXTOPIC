import React from "react";
import styles from './stylesheets/NewTopic.module.css'

const StartNewTopicInPanel = () => {
    return(
        <label for='userChatTextInput' className={styles.newTopicButtonInPanel}>
            Start New Topic
        </label>
    );
}

export {StartNewTopicInPanel};
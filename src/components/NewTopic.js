import React from "react";
import styles from './stylesheets/NewTopic.module.css'

const StartNewTopicInPanel = () => {
    return(
        <button className={styles.newTopicButtonInPanel}>
            Start New Topic
        </button>
    );
}

export {StartNewTopicInPanel};
import React from "react";
import styles from './stylesheets/NewTopic.module.css'
import { useNavigate } from "react-router-dom";

const StartNewTopicInPanel = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/');
    }

    return (
        <label 
            for='ChatBoxInput'
            className={styles.newTopicButtonInPanel}
            onClick={handleClick} >

            Start New Topic
            
        </label>
    );
}

export { StartNewTopicInPanel };
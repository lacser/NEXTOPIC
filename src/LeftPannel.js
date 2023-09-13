import React from "react";
import styles from "./LeftPannel.module.css";
import LoginWidget from "./Login";

const LeftPannel = () => {
    return (
        <div className={styles.leftPannel}>
            <h1 className={styles.appTitle}>TopicPot</h1>
            <LoginWidget/>
        </div>
    );
}

export default LeftPannel;
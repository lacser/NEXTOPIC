import React from "react";
import styles from './Homepage.module.css'

const Homepage = () => {
    return (
        <div className={styles.homePage}>
            <div className={styles.chatInputAndTitle}>
                <h1 className={styles.title}>
                    Let's mix inspiration
                </h1>
                <div className={styles.chatBoxBorder}>
                    <form className={styles.chatBox}>
                        <input type="text" name="userChatTextInput" id='userChatTextInput' className={styles.userChatTextInput} />
                        <button className={styles.sendChat}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="40" height="40">
                                <g fill="#0d5765">
                                    <path d="M464 256c0-114.87-93.13-208-208-208S48 141.13 48 256s93.13 208 208 208 208-93.13 208-208zm-212.65 91.36a16 16 0 01-.09-22.63L303.58 272H170a16 16 0 010-32h133.58l-52.32-52.73A16 16 0 11274 164.73l79.39 80a16 16 0 010 22.54l-79.39 80a16 16 0 01-22.65.09z"/>
                                </g>
                            </svg>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export { Homepage };
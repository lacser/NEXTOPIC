import React, { useState } from "react";
import styles from './Homepage.module.css';
import { ChatInput } from "../../components/ChatInput";

const Homepage = () => {
    return (
        <div className={styles.homePage}>
            <div className={styles.chatInputAndTitle}>
                <h1 className={styles.title}>
                    Let's mix inspiration
                </h1>
                <ChatInput behaviour='homepage' />
            </div>
        </div>
    );
}

export { Homepage };
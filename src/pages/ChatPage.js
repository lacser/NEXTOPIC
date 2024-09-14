import React from "react";
import styles from "./stylesheets/ChatPage.module.css";
import LeftPanel from "../features/LeftPanel/LeftPanel.js";
import Chat from "../features/ChatPanel/Chat.js";
import ChatToolBar from "../components/ChatToolBar.js";

const ChatPage = () => {
    return (
        <div className={styles.chatPage}>
            <LeftPanel />
            <ChatToolBar />
            <Chat />
        </div>
    );
}

export default ChatPage;
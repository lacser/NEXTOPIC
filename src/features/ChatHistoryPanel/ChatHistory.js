import styles from "./ChatHistory.module.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { chatContext } from '../../Root';
import store from "../../store";
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { set } from "firebase/database";

export const ChatHistory = () => {
    const [conversationNum, setConversationNum] = useState(0);
    const [chatHistoryElements, setChatHistoryElements] = useState([]);
    const [refreshTrigger, setRefreshTrigger] = useState(false);
    const [refreshState, setRefreshState] = useState("loading");
    const conversationIndex = useParams().chatIndex;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClick = (mode, index) => {
        if (mode === undefined) {
            mode = "creative";
        }
        navigate(`/${mode}/conversation/${index}`);
    }

    useEffect(() => {
        setConversationNum(store.getState().chatHistory.conversationNum);
        const unsubscribe = store.subscribe(() => {
            setConversationNum(store.getState().chatHistory.conversationNum);
        });
        return unsubscribe;
    }, []);

    useEffect(() => {
        const conversations = store.getState().chatHistory.conversations;
        let tempElements = [];
        for (let i = 0; i < conversationNum; i++) {
            tempElements.push(
                <div key={i} className={ i == conversationIndex ? `${styles.chatHistoryBox} ${styles.chatHistoryBoxSelected}` : styles.chatHistoryBox } 
                    onClick={() => handleClick(conversations[i].initialMode, i)}>

                    <li className={styles.chatHistoryElements}>
                        {conversations[i].questionArray[0]}
                        <div className={styles.overflowShadow} />
                    </li>
                    
                </div>
            );
        }
        setChatHistoryElements(tempElements);

    }, [conversationNum, conversationIndex, refreshTrigger]);

    return (
        <ol className={styles.chatHistoryContainer}>
            {[chatHistoryElements]}
        </ol>
    );
}
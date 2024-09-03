import styles from "./ChatHistory.module.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { chatContext } from '../../Root';
import store from "../../store";
import { useLocation } from 'react-router-dom';
import { set } from "firebase/database";

export const ChatHistory = () => {
    const [conversationNum, setConversationNum] = useState(0);
    const [chatHistoryElements, setChatHistoryElements] = useState([]);
    const navigate = useNavigate();
    const handleClick = (index) => {
        navigate('/conversation/' + index);
    }

    useEffect(() => {
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
                <div key={i} className={styles.chatHistoryBox} onClick={() => handleClick(i)}>

                    <li className={styles.chatHistoryElements}>
                        {conversations[i].questionArray[0]}
                        <div className={styles.overflowShadow} />
                    </li>
                    

                </div>
            );
        }
        setChatHistoryElements(tempElements);

    }, [conversationNum])

    return (
        <ol className={styles.chatHistoryContainer}>
            {[chatHistoryElements]}
        </ol>
    );
}
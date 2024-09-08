import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from './stylesheets/ChatInput.module.css';
import { useParams } from "react-router-dom";
import { newConversation, addQuestion } from "../features/ChatHistoryPanel/chatHistorySlice";
import store from "../store";

export const ChatInput = (props) => {
    const conversationIndex = useParams().chatIndex;
    const mode = useParams().mode;
    const behaviour = conversationIndex ? 'conversation' : 'homepage'; //判断输入框所在界面，以切换样式
    const navigate = useNavigate(); //输入新问题后切换地址
    const [chatText, setChatText] = useState(''); //记录输入框内容

    let sendChatButtonStyle = '';
    let sendChatButtonStatus = false;
    if (behaviour === 'homepage' && chatText) {
        sendChatButtonStyle = styles.sendChatActive;
        sendChatButtonStatus = true;
    } else if (props.isStreamFinished && chatText) {
        sendChatButtonStyle = styles.sendChatActive;
        sendChatButtonStatus = true;
    } else {
        sendChatButtonStyle = styles.sendChatInactive;
        sendChatButtonStatus = false;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (behaviour === 'homepage') {
            store.dispatch(newConversation({mode: mode, question: chatText}));
            const conversationIndex = store.getState().chatHistory.conversationNum - 1;
            setChatText('');
            navigate(`/${mode}/conversation/${conversationIndex}`);
        }
        else if (behaviour === 'conversation') {
            store.dispatch(addQuestion({conversationIndex: conversationIndex, question: chatText}));
            setChatText('');
        }
    }
    
    return (
        <div className={behaviour === 'homepage' ? styles.homepageChatBoxBorder : styles.conversationChatBoxBorder}>
            <form className={styles.chatForm}>
                <input
                    type="text"
                    name="ChatBoxInput"
                    id='ChatBoxInput'
                    className={styles.chatFormInput}
                    placeholder="Message ChatBot..."
                    onChange={({ target }) => setChatText(target.value)}
                    value={chatText} />
                <button
                    className={sendChatButtonStyle}
                    disabled={!sendChatButtonStatus}
                    onClick={handleSubmit} >
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                        <g fill="#fff">
                            <path d="M434.5-633.848 247.826-447.174q-13.674 13.674-32.065 13.294-18.391-.381-32.065-14.055-12.674-13.674-13.055-32.065-.38-18.391 13.294-32.065l264-264q6.717-6.718 14.913-9.816 8.195-3.097 17.152-3.097t17.152 3.097q8.196 3.098 14.913 9.816l264.239 264.239q12.914 12.913 12.914 31.565t-12.914 32.326q-13.674 13.674-32.445 13.674-18.772 0-32.446-13.674L525.5-633.848v436.478q0 19.153-13.174 32.327T480-151.869q-19.152 0-32.326-13.174T434.5-197.37v-436.478Z" />
                        </g>
                    </svg>
                </button>
            </form>
        </div>
    );
}
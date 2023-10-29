import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import styles from './stylesheets/ChatInput.module.css';
import { newConversation } from "../tempBase";

export const ChatInput = (props) =>{
    
    const behaviour = props.behaviour;
    const navigate = useNavigate();
    const [chatText, setChatText] = useState('');

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(behaviour==='homepage'){
            const conversationIndex = newConversation(chatText);
            navigate(`/conversation/${conversationIndex}`);
            setChatText('');
        }
        else if(behaviour==='conversation'){
            props.conversationSession.newQuestion = chatText;
            props.setNewQuestion(chatText);
            setChatText('');
        }
    }

    return(
        <div className={behaviour === 'homepage' ? styles.homepageChatBoxBorder : styles.conversationChatBoxBorder}>
            <form className={styles.chatBox}>
                <input 
                    type="text" 
                    name="ChatBoxInput" 
                    id='ChatBoxInput'
                    className={styles.ChatBoxInput} 
                    onChange={({target}) => setChatText(target.value)}
                    value={chatText} />
                <button 
                    className={styles.sendChat}
                    onClick={handleSubmit} >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="40" height="40">
                        <g fill="#0d5765">
                            <path d="M464 256c0-114.87-93.13-208-208-208S48 141.13 48 256s93.13 208 208 208 208-93.13 208-208zm-212.65 91.36a16 16 0 01-.09-22.63L303.58 272H170a16 16 0 010-32h133.58l-52.32-52.73A16 16 0 11274 164.73l79.39 80a16 16 0 010 22.54l-79.39 80a16 16 0 01-22.65.09z"/>
                        </g>
                    </svg>
                </button>
            </form>
        </div>
    );
}
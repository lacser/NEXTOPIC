import styles from './stylesheets/ChatModeSwitch.module.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const ChatModePopup = ({ showPopup }) => {

    if (!showPopup) {
        return null;
    }

    return (
        <div className={styles.chatModePopup}>
            <div className={styles.popupItem}>
                <span>Creative</span>
            </div>
            <div className={styles.popupItem}>
                <span>Accurate</span>
            </div>
            <div className={styles.popupItem}>
                <span>Fast</span>
            </div>
            
        </div>
    );
}

const ChatModeSwitch = () => {
    const { mode } = useParams();
    const [chatMode, setChatMode] = useState(mode);
    const [showPopup, setShowPopup] = useState(false);
    useEffect(() => {
        switch (mode) {
            case 'creative':
                setChatMode('Creative');
                break;
            case 'accurate':
                setChatMode('Accurate');
                break;
            case 'fast':
                setChatMode('Fast');
                break;
            default:
                console.error('Invalid chat mode');
                setChatMode('Undefined');
        }
    }, [mode]);

    const handleShowPopup = () => {
        setShowPopup(!showPopup);
    }

    return (
        <div className={styles.chatModeSwitch}>
            <button className={styles.chatModeSwitchButton} onClick={ handleShowPopup }>
                <span className={styles.buttonText}>{ chatMode }</span>
                <svg className={styles.dropDownIcon} xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#7d7d7d">
                    <path d="M480-333 240-573l51-51 189 189 189-189 51 51-240 240Z" />
                </svg>
            </button>
            <ChatModePopup showPopup={showPopup} />
        </div>
    );
}

export default ChatModeSwitch;
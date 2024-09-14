import styles from './stylesheets/ChatToolBar.module.css';
import AccountWidget from './AccountWidget';
import ChatModeSwitch from './ChatModeSwitch';


const ChatToolBar = () => {
    return (
        <div className={styles.chatToolBar}>
            <ChatModeSwitch />
            <AccountWidget />
        </div>
    );
}

export default ChatToolBar;
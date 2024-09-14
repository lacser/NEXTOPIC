import styles from './stylesheets/AccountWidget.module.css';
import { useState, useEffect } from 'react';

const AccountPopup = ({ showPopup }) => {

    if (!showPopup) {
        return null;
    }

    return (
        <div className={styles.accountPopup}>
            <div className={styles.popupItem}>
                <span>Account</span>
            </div>
            <div className={styles.popupItem}>
                <span>Settings</span>
            </div>
            <div className={styles.popupItem}>
                <span>Logout</span>
            </div>
            
        </div>
    );
}

const AccountWidget = () => {
    const [showPopup, setShowPopup] = useState(false);
    const handleShowPopup = () => {
        setShowPopup(!showPopup);
    }

    return (
        <div className={styles.accountWidget}>
            <button className={styles.accountSettingsButton} onClick={handleShowPopup}>
                <svg className={styles.settingsIcon} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                    <path d="M710-150q-63 0-106.5-43.5T560-300q0-63 43.5-106.5T710-450q63 0 106.5 43.5T860-300q0 63-43.5 106.5T710-150Zm0-80q29 0 49.5-20.5T780-300q0-29-20.5-49.5T710-370q-29 0-49.5 20.5T640-300q0 29 20.5 49.5T710-230Zm-550-30v-80h320v80H160Zm90-250q-63 0-106.5-43.5T100-660q0-63 43.5-106.5T250-810q63 0 106.5 43.5T400-660q0 63-43.5 106.5T250-510Zm0-80q29 0 49.5-20.5T320-660q0-29-20.5-49.5T250-730q-29 0-49.5 20.5T180-660q0 29 20.5 49.5T250-590Zm230-30v-80h320v80H480Zm230 320ZM250-660Z" />
                </svg>
            </button>
            <AccountPopup showPopup={showPopup} />
        </div>
    );
}

export default AccountWidget;
import React from "react";
import styles from "./RightPanel.module.css";

const RightPanel = (props) => {
    return (
        <div className={styles.rightPanel}>
            {/*Because direct max-width limit in Homepage.module.css causes overflow problem, so I made this.*/}
            <div className={styles.content}>
               {props.children} 
            </div>
        </div>
    );
}

export default RightPanel;
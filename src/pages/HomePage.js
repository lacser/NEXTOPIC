import React from 'react';
import styles from './stylesheets/HomePage.module.css';
import LeftPanel from '../features/LeftPanel/LeftPanel';
import Startpage from '../features/HomePage/Startpage';

const HomePage = () => {
    return (
        <div className={styles.homepage}>
            <LeftPanel />
            <Startpage />
        </div>
    );
}

export default HomePage;
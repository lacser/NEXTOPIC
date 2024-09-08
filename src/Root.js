import React, { useEffect } from 'react';
import styles from './Root.module.css';
import { Outlet } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';



function Root() {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.pathname === '/') {
            navigate('/creative');
        }
    }, []);

    return (
        <div className={styles.Root}>
            <Outlet />
        </div>
    );
}

export { Root };
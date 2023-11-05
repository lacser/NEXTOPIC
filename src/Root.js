import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import styles from './Root.module.css';
import { Outlet } from 'react-router-dom';

function Root() {
  return (
    <div className={styles.Root}>
      <LeftPanel />
      <RightPanel>
        <Outlet />
      </RightPanel>
    </div>
  );
}

export { Root };
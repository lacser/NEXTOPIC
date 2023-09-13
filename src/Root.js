import LeftPannel from './LeftPannel';
import RightPannel from './RightPannel';
import styles from './Root.module.css';

function Root() {
    return (
      <div className={styles.Root}>
        <LeftPannel />
        <RightPannel />
      </div>
    );
}

export { Root };
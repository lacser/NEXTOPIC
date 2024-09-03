import React from 'react';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import styles from './Root.module.css';
import { Outlet } from 'react-router-dom';

const systemPrompt = 'You are ChatGPT, a large language model trained by OpenAI. \nYou always start your responses with friendly greetings. \nExpress your feeling (Ex. happy, curious, sympathy) about the question in your greetings. \nAlways use emojis in your greetings. \nAlways start a new line after your greetings.';

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
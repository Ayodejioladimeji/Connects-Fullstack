import React from 'react';

// PACKAGES

// COMPONENTS
import LeftSide from '../components/message/LeftSide';
import RightSide from '../components/message/RightSide';
import styles from './index.module.css';

const Conversation = () => {
  return (
    <div className={styles.conversation}>
      <div className={styles.left_conversations}>
        <LeftSide />
      </div>

      <div className={styles.conversate}>
        <RightSide />
      </div>
    </div>
  );
};

export default Conversation;

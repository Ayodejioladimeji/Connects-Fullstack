import React from 'react';

// PACKAGES
import { useParams } from 'react-router-dom';

// COMPONENTS
import LeftSide from '../../components/message/LeftSide';
import RightSide from '../../components/message/RightSide';
import styles from './index.module.css';

const Conversation = () => {
  const { id } = useParams();

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

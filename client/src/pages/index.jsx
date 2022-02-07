import React from 'react';
import LeftSide from '../components/message/LeftSide';
import styles from './index.module.css';

import logo from '../images/logo.png';

const Message = () => {
  return (
    <div className={styles.conversation}>
      <div className={styles.left_conversation}>
        <LeftSide />
        <div className={styles.friends}>Search for friends</div>
      </div>

      <div className={styles.right_conversation}>
        <div className={styles.right_center}>
          <img src={logo} alt='logo' />
          <h4>Connects Chat App</h4>
          <p>
            Connect is a social messenger connecting people together without
            stress
          </p>
        </div>
      </div>
    </div>
  );
};

export default Message;

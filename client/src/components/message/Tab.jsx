import React, { useState, useEffect } from 'react';

// COMPONENTS
import styles from './Tab.module.css';
import ChatList from './ChatList';
import Online from './Online';

const Tab = () => {
  const [toggleState, setToggleState] = useState(1);
  const [menu, setMenu] = useState(true);

  useEffect(() => {
    setMenu(!menu);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <div className={styles.tabcontainer}>
      <div className={styles.tabcenter}>
        {/* THE SECTION OF THE TABS */}
        <div className={styles.tab_underline}>
          <div className={styles.bloctabs} onClick={() => setMenu(!menu)}>
            <button
              className={toggleState === 1 ? styles.activetabs : styles.tabs}
              onClick={() => toggleTab(1)}
            >
              Chats
            </button>

            <button
              className={toggleState === 2 ? styles.activetabs : styles.tabs}
              onClick={() => toggleTab(2)}
            >
              Members
            </button>
          </div>
        </div>

        {/* THE SECTION OF THE CONTENT */}
        <div className={styles.contenttabs}>
          <div
            className={
              toggleState === 1 ? styles.activecontent : styles.content
            }
          >
            <ChatList />
          </div>

          <div
            className={
              toggleState === 2 ? styles.activecontent : styles.content
            }
          >
            <Online />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tab;

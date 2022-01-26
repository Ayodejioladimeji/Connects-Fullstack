import React, { useState, useRef, useEffect } from 'react';
import styles from './Icons.module.css';

const Icons = ({ setContent, content }) => {
  const [emoji, setEmoji] = useState(false);
  const clickRef = useRef();

  const reactions = [
    '❤️',
    '😆',
    '😯',
    '😢',
    '😡',
    '👍',
    '👎',
    '😄',
    '😂',
    '😍',
    '😘',
    '😗',
    '😚',
    '😳',
    '😭',
    '😓',
    '😤',
    '🤤',
    '👻',
    '💀',
    '🤐',
    '😴',
    '😷',
    '😵',
  ];

  // Click outside side effect
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
  }, []);

  //   The handleClick outside function
  const handleClickOutside = (e) => {
    if (clickRef.current && !clickRef.current.contains(e.target)) {
      setEmoji(false);
    }
  };

  return (
    <div className={styles.dropdown}>
      <div
        onClick={() => setEmoji(!emoji)}
        style={{ opacity: 0.9, cursor: 'pointer' }}
      >
        😄
      </div>

      {emoji && (
        <div className={styles.reactions} ref={clickRef}>
          {reactions.map((icon) => (
            <span key={icon} onClick={() => setContent(content + icon)}>
              {icon}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default Icons;

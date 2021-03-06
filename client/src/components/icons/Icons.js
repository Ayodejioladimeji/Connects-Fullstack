import React, { useState, useRef, useEffect } from 'react';
import styles from './Icons.module.css';

const Icons = ({ setContent, content }) => {
  const [emoji, setEmoji] = useState(false);
  const clickRef = useRef();

  const reactions = [
    'โค๏ธ',
    '๐',
    '๐ฏ',
    '๐ข',
    '๐ก',
    '๐',
    '๐',
    '๐',
    '๐',
    '๐',
    '๐',
    '๐',
    '๐',
    '๐ณ',
    '๐ญ',
    '๐',
    '๐ค',
    '๐คค',
    '๐ป',
    '๐',
    '๐ค',
    '๐ด',
    '๐ท',
    '๐ต',
    '๐จ',
    '๐ง',
    '๐ง',
    '๐ง๐ป',
    '๐ง๐ผ',
    '๐ง๐ฝ',
    '๐ง๐พ',
    '๐จ',
    '๐จ๐ป',
    '๐จ๐ผ',
    '๐จ๐ฝ',
    '๐จ๐พ',
    '๐จ๐ฟ',
    '๐ฉ',
    '๐ฉ๐ป',
    '๐ฉ๐ผ',
    '๐ฉ๐ฝ',
    '๐ฉ๐พ',
    '๐ฉ๐ฟ',
    '๐ฆ',
    ' ๐จโ๐ฆ',
    '๐จโ๐ฆโ๐ฆ',
    '๐จโ๐จโ๐ฆ',
    '๐จโ๐จโ๐ฆโ๐ฆ',
    ' ๐จโ๐จโ๐งโ๐ฆ',
    '๐จโ๐ฉโ๐ฆ',
    '๐จโ๐ฉโ๐ฆโ๐ฆ',
    ' ๐จโ๐ฉโ๐งโ๐ฆ',
    ' ๐ฉโ๐ฉโ๐ฆ',
    '๐ฉโ๐ฉโ๐ฆโ๐ฆ',
    '๐ฉโ๐ฉโ๐งโ๐ฆ',
    'โ๏ธ',
    '๐บ',
    '๐ด๏ธ',
    '๐คต',
    '๐ฒ',
    '๐ฑโโ๏ธ',
    '๐น',
    '๐ด',
    '๐ต',
    '๐คด',
    '๐ฌ',
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
        ๐
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

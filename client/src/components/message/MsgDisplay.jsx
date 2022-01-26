import React, { useState, useEffect } from 'react';

// PACKAGES
import { useSelector, useDispatch } from 'react-redux';
import { FiPhoneCall } from 'react-icons/fi';
import { FcMissedCall } from 'react-icons/fc';
import { FaTrash, FaVideoSlash, FaVideo } from 'react-icons/fa';
import { format } from 'timeago.js';

// COMPONENTS
import { deleteMessages } from '../../redux/actions/messageAction';
import { imageShow, videoShow } from '../../utils/mediaShow';
import styles from './RightSide.module.css';

const MsgDisplay = ({ user, msg, data }) => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [time, setTime] = useState(null);

  useEffect(() => {
    showTime();
  }, [showTime]);

  const handleDeleteMessages = () => {
    if (!data) return;

    dispatch(deleteMessages({ msg, data, auth }));
  };

  // THE TIME
  // The section that shows the time in 12 hours
  function showTime() {
    var date = new Date(msg.createdAt);
    var h = date.getHours();
    var m = date.getMinutes();
    var session = 'AM';

    if (h > 12) {
      h = h - 12;
      session = 'PM';
    }

    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;

    const times = h + ':' + m + ':' + session;
    setTime(times);

    // setTimeout(showTime, 1000);
  }

  return (
    <>
      <div className={styles.you_content}>
        {user._id === auth.user._id && (
          <FaTrash className={styles.fa_trash} onClick={handleDeleteMessages} />
        )}

        <div>
          {msg.text && (
            <div className={styles.chat_text}>
              <small className={styles.time}>{time}</small>
              {msg.text}
              <div className={styles.chat_time}>
                <small>{format(msg.createdAt)}</small>
              </div>
            </div>
          )}
          {msg.media.map((item, index) => (
            <div key={index} className={styles.pics}>
              {item.url.match(/video/i)
                ? videoShow(item.url)
                : imageShow(item.url)}
            </div>
          ))}
        </div>

        {msg.call && (
          <div className={styles.video_box}>
            {msg.call.times === 0 ? (
              msg.call.video ? (
                <FaVideoSlash
                  style={{
                    fontSize: '1rem',
                    marginRight: '10px',
                    color: msg.call.times === 0 ? 'crimson' : 'green',
                  }}
                />
              ) : (
                <FcMissedCall
                  style={{
                    fontSize: '1rem',
                    marginRight: '10px',
                    color: msg.call.times === 0 ? 'crimson' : 'green',
                  }}
                />
              )
            ) : msg.call.video ? (
              <FaVideo
                style={{
                  fontSize: '1rem',
                  marginRight: '10px',
                  color: msg.call.times === 0 ? 'crimson' : 'green',
                }}
              />
            ) : (
              <FiPhoneCall
                style={{
                  fontSize: '1rem',
                  marginRight: '10px',
                  color: msg.call.times === 0 ? 'crimson' : 'green',
                }}
              />
            )}

            <div className={styles.text_left}>
              {msg.call.video
                ? 'Video call at ' +
                  new Date(msg.createdAt).toLocaleTimeString()
                : 'Audio call at ' +
                  new Date(msg.createdAt).toLocaleTimeString()}

              {/* <small>
                {msg.call.times > 0 && <Times total={msg.call.times} />}
              </small> */}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MsgDisplay;

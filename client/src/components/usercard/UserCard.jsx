import React from 'react';
import styles from './UserCard.module.css';
import { FaImage, FaVideo, FaVideoSlash } from 'react-icons/fa';
import { FcMissedCall } from 'react-icons/fc';
import { FiPhoneCall } from 'react-icons/fi';

const UserCard = ({ children, user, handleClose, msg }) => {
  const handleCloseAll = () => {
    if (handleClose) handleClose();
  };

  const showMsg = (user) => {
    const { text } = user;
    return (
      <>
        {text ? (
          <div
            dangerouslySetInnerHTML={{
              __html: text.substring(0, 20).trim(),
            }}
          ></div>
        ) : (
          <>
            {user.call ? (
              <div>
                {user.call.times === 0 ? (
                  user.call.video ? (
                    <FaVideoSlash />
                  ) : (
                    <FcMissedCall />
                  )
                ) : user.call.video ? (
                  <FaVideo />
                ) : (
                  <FiPhoneCall />
                )}
              </div>
            ) : (
              user.media.length > 0 && (
                <div>
                  {user.media.length} <FaImage />
                </div>
              )
            )}
          </>
        )}
      </>
    );
  };

  return (
    <div className={styles.user_card}>
      <div>
        <div onClick={handleCloseAll} className={styles.user_link}>
          <img src={user.avatar} alt='user_avatar' />

          <div className={styles.user_card_div}>
            <span>{user.username}</span>

            <small>{msg ? showMsg(user) : user.email}</small>
          </div>
        </div>
      </div>

      {children}
    </div>
  );
};

export default UserCard;

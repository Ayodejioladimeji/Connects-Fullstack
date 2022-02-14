import React from 'react';

// PACKAGES
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

// COMPONENTS
import styles from './ProfileCard.module.css';
import { FaArrowLeft } from 'react-icons/fa';
import { PROFILE_TYPES } from './../../redux/actions/profileAction';

const ProfileCard = ({ children, user }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <div className={styles.profile_card}>
      <div className='d-flex align-items-center'>
        <FaArrowLeft
          className={styles.profile_arrow}
          onClick={() => history.push('/')}
        />
        <div
          className={styles.profile_link}
          onClick={() =>
            dispatch({ type: PROFILE_TYPES.SHOW_MODAL, payload: true })
          }
        >
          <img src={user.avatar} alt='profile_avatar' />

          <div className={styles.profile_card_div}>
            <span>{user.username}</span>

            <small>{user.online ? 'online' : 'offline'}</small>
          </div>
        </div>
      </div>

      {children}
    </div>
  );
};

export default ProfileCard;

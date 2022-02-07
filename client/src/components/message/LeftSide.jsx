import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import Search from './../search/Search';
import EditProfile from './../editprofile/Edit';
import Tab from './Tab';
import styles from './LeftSide.module.css';
import { FaBell, FaBellSlash, FaCircle, FaArrowLeft } from 'react-icons/fa';
import {
  isReadNotify,
  deleteAllNotifies,
  NOTIFY_TYPES,
} from './../../redux/actions/notifyAction';
import { removeModal } from '../../redux/actions/messageAction';

const LeftSide = () => {
  const { auth, message, notify, profile } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleIsRead = (msg) => {
    dispatch(isReadNotify({ msg, auth }));
  };

  const handleSound = () => {
    dispatch({ type: NOTIFY_TYPES.UPDATE_SOUND, payload: !notify.sound });
  };

  const handleDeleteAll = () => {
    const newArr = notify.data.filter((item) => item.isRead === false);
    if (newArr.length === 0) return dispatch(deleteAllNotifies(auth.token));

    if (
      window.confirm(
        `You have ${newArr.length} unread notices. Are you sure you want to delete all?`
      )
    ) {
      return dispatch(deleteAllNotifies(auth.token));
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* THE SEARCH SECTION */}
      <Search />

      {profile.editModal && <EditProfile />}

      <Tab />

      {message.showModal && (
        <div className={styles.ring}>
          <p>Notifications</p>
          <div className={styles.ring_top}>
            <FaArrowLeft
              className={styles.arrow}
              onClick={() => dispatch(removeModal())}
            />

            {notify.sound ? (
              <FaBell onClick={handleSound} className={styles.bell_on} />
            ) : (
              <FaBellSlash onClick={handleSound} className={styles.bell_off} />
            )}
          </div>

          {notify.data.map((item) => (
            <Link to={item.url} onClick={() => handleIsRead(item)}>
              <div className={styles.ring_down}>
                <div className={styles.ring_bottom}>
                  <img src={item.user.avatar} alt='ring_pic' />
                  <div>
                    <small>{item.user.username}</small>
                    <small className={styles.ring_content}>
                      {item.content}
                    </small>
                  </div>
                </div>
                <FaCircle className={styles.read} />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default LeftSide;

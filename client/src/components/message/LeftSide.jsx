import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';

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
import { removeNotifyModal } from '../../redux/actions/messageAction';

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

      {message.notifyModal && notify.data.length !== 0 && (
        <div className={styles.ring}>
          <p>Notifications</p>
          <div className={styles.ring_top}>
            <FaArrowLeft
              className={styles.arrow}
              onClick={() => dispatch(removeNotifyModal())}
            />

            {notify.sound ? (
              <FaBell onClick={handleSound} className={styles.bell_on} />
            ) : (
              <FaBellSlash onClick={handleSound} className={styles.bell_off} />
            )}
          </div>

          {notify.data.map((item, index) => (
            <Link key={index} to={item.url} onClick={() => handleIsRead(item)}>
              <div className={styles.ring_link}>
                <div className={styles.ring_down}>
                  <div className={styles.ring_bottom}>
                    <img src={item.user.avatar} alt='ring_pic' />
                    <div>
                      <small>{item.user.username}</small>
                      <small className={styles.ring_content}>
                        {item.content === ''
                          ? 'called you'
                          : item.content.slice(0, 20)}
                      </small>
                      <small className={styles.ring_contents}>
                        {moment(item.createdAt).fromNow()}
                      </small>
                    </div>
                  </div>
                  {!item.isRead && <FaCircle className={styles.read} />}
                </div>
              </div>
            </Link>
          ))}
          <div className={styles.ring_button}>
            <button onClick={handleDeleteAll} className='btn'>
              Clear Notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeftSide;

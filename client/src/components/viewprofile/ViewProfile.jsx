import React, { useEffect, useState } from 'react';

// PACKAGES
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

// COMPONENTS
import styles from './ViewProfile.module.css';
import { FaArrowLeft } from 'react-icons/fa';
import { PROFILE_TYPES } from './../../redux/actions/profileAction';

const ViewProfile = () => {
  const { message } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [user, setUser] = useState([]);
  const { id } = useParams();

  //   GETTING CLICKED USER
  useEffect(() => {
    const newUser = message.users.find((user) => user._id === id);
    if (newUser) setUser(newUser);
  }, [message.users, id]);

  return (
    <div className={styles.view_profile}>
      <div className={styles.profile_image}>
        <img src={user.avatar} alt='' />
      </div>

      <div className={styles.profile_info}>
        <h2>{user.username}</h2>
        <h4>{user.mobile}</h4>
        <small>{user.email}</small>
        <small>{user.website}</small>
      </div>

      <FaArrowLeft
        className={styles.arrow}
        onClick={() =>
          dispatch({ type: PROFILE_TYPES.REMOVE_MODAL, payload: false })
        }
      />
    </div>
  );
};

export default ViewProfile;

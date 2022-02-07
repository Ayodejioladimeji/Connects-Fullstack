import React, { useEffect } from 'react';

// PACKAGES
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

// COMPONENTS
import { getProfileUsers } from '../redux/actions/profileAction';
import Info from '../components/info/Info';
import styles from './index.module.css';
import logo from '../images/logo.png';

const Profile = () => {
  const { auth, profile } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (profile.ids.every((item) => item !== id)) {
      dispatch(getProfileUsers({ id, auth }));
    }
  }, [id, auth, dispatch, profile.ids]);

  return (
    <div className={styles.conversation}>
      <div className={styles.left_conversation}>
        <Info auth={auth} profile={profile} dispatch={dispatch} id={id} />
      </div>

      <div className={styles.right_conversation}>
        <div className={styles.right_center}>
          <img src={logo} alt='logo' />
          <h4>Connects Chat App</h4>
          <p>
            Connect is a social messenger connecting people together without
            stressing
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;

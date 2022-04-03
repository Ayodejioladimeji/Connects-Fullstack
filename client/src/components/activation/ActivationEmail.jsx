import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import rejected from './rejected.jpg';
import download from './verified.jpg';
import logo from '../../images/logo.png';

import styles from './activationEmail.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { activation } from '../../redux/actions/authAction';

import left from '../../images/lefti.png';

const ActivationEmail = () => {
  const { activation_token } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { alert } = useSelector((state) => state);

  useEffect(() => {
    if (activation_token) {
      dispatch(activation({ activation_token }));
    }
  }, [activation_token, dispatch]);

  //   THE VERIFIED FUNCTION

  const activate = () => {
    return (
      <>
        <div className={styles.activated_image}>
          <img src={download} alt='active' />
        </div>

        <div className={styles.active_div}>
          <h2>VERIFIED</h2>
          <p>{alert.success && 'success'}</p>
          <button onClick={() => history.push('/login')}>Start Chatting</button>
        </div>
      </>
    );
  };

  const nonactivate = () => {
    return (
      <>
        <div className={styles.activated_image}>
          <img src={rejected} alt='active' />
        </div>

        <div className={styles.active_div}>
          <h2>UNVERIFIED</h2>
          <p>{alert.error && 'Session Expired'}</p>
          <button onClick={() => history.push('/register')}>
            Kindly Re-register or Login
          </button>
        </div>
      </>
    );
  };

  return (
    <div className={styles.activated}>
      <div className={styles.activated_centers}>
        <div className={styles.activated_left}>
          <img src={left} alt='left_image' />
          <p>
            Reach out to your loved ones
            <br /> as soon as you can...
          </p>
        </div>

        <div className={styles.activated_right}>
          <div className={styles.activated_right_div}>
            <img src={logo} alt='logo' className={styles.logo_div} />
            <div className={styles.activated_center}>
              {alert.success ? activate() : ''}
              {alert.error ? nonactivate() : ''}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivationEmail;

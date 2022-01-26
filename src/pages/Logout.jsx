import React from 'react';

// PACKAGES
import { Link } from 'react-router-dom';

// COMPONENTS
import styles from './Register.module.css';
import logo from '../images/logo.png';
import left from '../images/lefti.png';

const Logout = () => {
  return (
    <div className={styles.register}>
      <div className={styles.register_center}>
        <div className={styles.register_left}>
          <img src={left} alt='left_image' />
          <p>
            Reach out to your loved ones
            <br /> as soon as you can...
          </p>
        </div>

        <div className={styles.register_right}>
          <div className={styles.register_right_div}>
            <div className={styles.register_right_top}>
              <img src={logo} alt='logo' />
              <h3>You are Logged Out</h3>
              <p>
                Thanks for using <b style={{ color: 'blue' }}>Connects</b>
              </p>
            </div>

            <div className={styles.register_right_bottom}>
              <div className={styles.form_group}>
                <Link to='/login'>
                  <button type='submit'>Sign in</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logout;

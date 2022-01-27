import React from 'react';
import styles from './verification.module.css';

import verify from './verify.png';
import left from '../images/lefti.png';

const Verification = () => {
  return (
    <div className={styles.verification}>
      <div className={styles.verification_center}>
        <div className={styles.verification_left}>
          <img src={left} alt='left_image' />
          <p>
            Reach out to your loved ones
            <br /> as soon as you can...
          </p>
        </div>

        <div className={styles.verification_right}>
          <div className={styles.verification_right_div}>
            <div className={styles.verified_center}>
              <div className={styles.verify_image}>
                <img src={verify} alt='verify-pic' />
              </div>

              <div className={styles.verify_div}>
                <h2>Confirm Your Email Address</h2>
                <p>We sent a confirmation mail to you</p>
                <p>
                  Check your email and click on the confirmation button to
                  Activate your Account
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verification;

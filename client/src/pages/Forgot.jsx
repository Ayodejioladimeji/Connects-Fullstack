import React from 'react';
import { Formik } from 'formik';
import * as EmailValidator from 'email-validator';

import styles from './Login.module.css';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';
import left from '../images/lefti.png';

const Forgot = () => {
  return (
    <Formik
      initialValues={{ email: '', username: '', password: '' }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          console.log('Logging in', values);
          setSubmitting(false);
        }, 500);
      }}
      //   HANDLING VALIDATION MESSAGES
      validate={(values) => {
        let errors = {};

        // EMAIL SECTION
        if (!values.email) {
          errors.email = 'Email is Required';
        } else if (!EmailValidator.validate(values.email)) {
          errors.email = 'Invalid email address';
        }

        return errors;
      }}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
        } = props;

        return (
          <div className={styles.login}>
            <div className={styles.login_center}>
              <div className={styles.login_left}>
                <img src={left} alt='left_image' />
                <p>
                  Reach out to your loved ones
                  <br /> as soon as you can...
                </p>
              </div>

              <div className={styles.login_right}>
                <div className={styles.login_right_div}>
                  <div className={styles.login_right_top}>
                    <img src={logo} alt='logo' />
                    <h3>Forgot your Password?</h3>
                    <p>Confirm your email to continue</p>
                  </div>

                  <div className={styles.login_right_bottom}>
                    <form onSubmit={handleSubmit}>
                      <div className={styles.form_group}>
                        <label htmlFor='email'>Email Address</label>
                        <input
                          name='email'
                          type='text'
                          placeholder='bright@example.com'
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={errors.email && touched.email && 'error'}
                        />
                        {errors.email && touched.email && (
                          <div className={styles.input_feedback}>
                            {errors.email}
                          </div>
                        )}
                      </div>

                      <div className={styles.form_group}>
                        <button type='submit' disabled={isSubmitting}>
                          Confirm Email
                        </button>
                      </div>
                    </form>

                    {/* <div className={styles.social}>
                      <p>Sign up using</p>
                      <div className={styles.social_div}></div>
                    </div> */}

                    <div className={styles.reg}>
                      <small>
                        Remember your password? <Link to='/login'>Login</Link>
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

export default Forgot;

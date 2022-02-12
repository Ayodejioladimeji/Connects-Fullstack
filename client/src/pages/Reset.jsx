import React, { useState } from 'react';
import { Formik } from 'formik';

import styles from './Login.module.css';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';
import left from '../images/lefti.png';
import { FaCheck, FaEye, FaEyeSlash, FaTimes } from 'react-icons/fa';

const passwordUpper = /(?=.*[A-Z])/;
const passwordSpecial = /(?=.*[!@#$%^&*])/;
const passwordLower = /(?=.*[a-z])/;
const passwordRegex = /(?=.*[0-9])/;

const Reset = () => {
  const [typePass, setTypePass] = useState(false);
  const [typePas, setTypePas] = useState(false);
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

        //   THE PASSWORD SECTION
        if (!values.password) {
          errors.password = 'Password is Required';
        } else if (values.password.length < 8) {
          errors.password = 'Password must be 8 characters long.';
        } else if (!passwordUpper.test(values.password)) {
          errors.password = 'Password must contain one UpperCase letter';
        } else if (!passwordLower.test(values.password)) {
          errors.password = 'Password must contain one LowerCase letter';
        } else if (!passwordRegex.test(values.password)) {
          errors.password = 'password Must contain one number';
        } else if (!passwordSpecial.test(values.password)) {
          errors.password = 'password Must contain one special character';
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
          <div className={styles.Login}>
            <div className={styles.Login_center}>
              <div className={styles.Login_left}>
                <img src={left} alt='left_image' />
                <p>
                  Reach out to your loved ones
                  <br /> as soon as you can...
                </p>
              </div>

              <div className={styles.Login_right}>
                <div className={styles.Login_right_div}>
                  <div className={styles.Login_right_top}>
                    <img src={logo} alt='logo' />
                    <h3>We got your back</h3>
                    <p>Change your password</p>
                  </div>

                  <div className={styles.Login_right_bottom}>
                    <form onSubmit={handleSubmit}>
                      <div className={styles.form_group}>
                        <label htmlFor='password'>Password</label>
                        <input
                          name='password'
                          type={typePass ? 'text' : 'password'}
                          placeholder='Enter your password'
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={
                            errors.password && touched.password && 'error'
                          }
                        />
                        {errors.password && touched.password && (
                          <div className={styles.input_feedback}>
                            {errors.password}
                          </div>
                        )}
                        <div
                          className={errors.password ? styles.eye : styles.eyes}
                          onClick={() => setTypePass(!typePass)}
                        >
                          {typePass ? <FaEyeSlash /> : <FaEye />}
                        </div>
                      </div>

                      <div className={styles.form_group}>
                        <label htmlFor='password'>Confirm password</label>
                        <input
                          name='password2'
                          type={typePas ? 'text' : 'password'}
                          placeholder='Confirm your new password'
                          value={values.password2}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={
                            errors.password2 && touched.password2 && 'error'
                          }
                        />
                        {errors.password2 && touched.password2 && (
                          <div className={styles.input_feedback}>
                            {errors.password2}
                          </div>
                        )}
                        <div
                          className={errors.password ? styles.eye : styles.eyes}
                          onClick={() => setTypePas(!typePas)}
                        >
                          {typePas ? <FaEyeSlash /> : <FaEye />}
                        </div>
                      </div>

                      <div className={styles.validate}>
                        <p>Your password must have :</p>
                        <div className={styles.check}>
                          {values.password.length >= 8 ? (
                            <FaCheck className={styles.checker} />
                          ) : (
                            <FaTimes className={styles.checking} />
                          )}
                          At least 8 characters in length
                        </div>

                        <div className={styles.check}>
                          {passwordSpecial.test(values.password) ? (
                            <FaCheck className={styles.checker} />
                          ) : (
                            <FaTimes className={styles.checking} />
                          )}
                          At least 1 special character
                        </div>

                        <div className={styles.check}>
                          {passwordLower.test(values.password) ? (
                            <FaCheck className={styles.checker} />
                          ) : (
                            <FaTimes className={styles.checking} />
                          )}
                          At least 1 lower case
                        </div>

                        <div className={styles.check}>
                          {passwordUpper.test(values.password) ? (
                            <FaCheck className={styles.checker} />
                          ) : (
                            <FaTimes className={styles.checking} />
                          )}
                          At least 1 upper case
                        </div>

                        <div className={styles.check}>
                          {passwordRegex.test(values.password) ? (
                            <FaCheck className={styles.checker} />
                          ) : (
                            <FaTimes className={styles.checking} />
                          )}
                          At least 1 one number
                        </div>
                      </div>

                      <div className={styles.form_group}>
                        <button type='submit' disabled={isSubmitting}>
                          Reset Password
                        </button>
                      </div>

                      <div className={styles.form_group}>
                        <button type='submit' disabled={isSubmitting}>
                          Sign in
                        </button>
                      </div>
                    </form>

                    <div className={styles.reg}>
                      <small>
                        Not a member? <Link to='/Login'>Login</Link>
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

export default Reset;

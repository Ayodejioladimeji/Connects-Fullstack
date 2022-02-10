import React, { useState, useEffect } from 'react';

// PACKAGES
import { GoogleLogin } from 'react-google-login';

import { Formik } from 'formik';
import * as EmailValidator from 'email-validator';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

// COMPONENTS
import styles from './Login.module.css';
import logo from '../images/logo.png';
import left from '../images/lefti.png';
import Loading from '../components/alert/Loading';
import { login, responseGoogle } from '../redux/actions/authAction';

// VALIDATION REGEX
const passwordUpper = /(?=.*[A-Z])/;
const passwordSpecial = /(?=.*[!@#$%^&*])/;
const passwordLower = /(?=.*[a-z])/;
const passwordRegex = /(?=.*[0-9])/;

// lOGIN COMPONENT
const Register = () => {
  const { alert, auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [typePass, setTypePass] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (auth.token) history.push('/');
  }, [auth.token, history]);

  // Google login function
  const onSuccess = (response) => {
    const tokenId = response.tokenId;
    dispatch(responseGoogle(tokenId));
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          dispatch(login(values));
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
                    <h3>Welcome Back!</h3>
                    <p>Sign in to continue</p>
                  </div>

                  <div className={styles.login_right_bottom}>
                    <div className={styles.social_box}>
                      <GoogleLogin
                        clientId='676440649536-83g9poh72p3a3n7oj0inb3bg1450d2id.apps.googleusercontent.com'
                        buttonText='Google Login'
                        className={styles.social_one}
                        onSuccess={onSuccess}
                        cookiePolicy={'single_host_origin'}
                      />
                    </div>

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

                      <div className={styles.forgot}>
                        <Link to='/forgot_password'>Forgot Password?</Link>
                      </div>

                      <div className={styles.form_group}>
                        <button type='submit' disabled={isSubmitting}>
                          {alert.loading === true ? (
                            <Loading width='25px' height='25px' color='#fff' />
                          ) : (
                            'Sign in'
                          )}
                        </button>
                      </div>
                    </form>

                    {/* <div className={styles.social}>
                      <p>Sign up using</p>
                      <div className={styles.social_div}></div>
                    </div> */}

                    <div className={styles.reg}>
                      <small>
                        Not a member? <Link to='/register'>Register</Link>
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

export default Register;

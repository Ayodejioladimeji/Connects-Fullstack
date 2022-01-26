import React, { useEffect, useState } from 'react';

// PACKAGES
import { useDispatch, useSelector } from 'react-redux';
import {
  FaArrowLeft,
  FaCamera,
  FaUserAlt,
  FaGlobeAfrica,
  FaPhoneAlt,
} from 'react-icons/fa';
import { AiOutlineMail } from 'react-icons/ai';

// COMPONENTS
import styles from './Edit.module.css';

import {
  PROFILE_TYPES,
  updateProfileUser,
} from './../../redux/actions/profileAction';
import { checkImage } from './../../utils/imageUpload';
import { GLOBALTYPES } from './../../redux/actions/globalTypes';

// INITIAL STATE
const initialState = {
  username: '',
  email: '',
  mobile: '',
  website: '',
};

const EditProfile = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(initialState);
  const { username, email, mobile, website } = userData;
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    setUserData(auth.user);
  }, [auth.user]);

  // CHANGE AVATAR
  const changeAvatar = (e) => {
    const file = e.target.files[0];

    const err = checkImage(file);
    if (err)
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err },
      });

    setAvatar(file);
  };

  // HANDLE INPUT METHOD
  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  //   HANDLE SUBMIT METHOD
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfileUser({ userData, avatar, auth }));
  };

  return (
    <div className={styles.view_profile}>
      <form onSubmit={handleSubmit}>
        <div className={styles.info_avatar}>
          <img
            src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar}
            alt='avatar'
          />
          <span>
            <FaCamera className={styles.fa_camera} />
            {/* <p>Change</p> */}
            <input
              type='file'
              name='file'
              id='file_up'
              accept='image/*'
              onChange={changeAvatar}
              className={styles.file_up}
            />
          </span>
        </div>

        <div className={styles.form_group}>
          <FaUserAlt className={styles.edit_icons} />
          <input
            type='text'
            id='username'
            name='username'
            value={username}
            onChange={handleInput}
            placeholder=''
          />
        </div>
        <div className={styles.form_group}>
          <FaPhoneAlt className={styles.edit_icons} />
          <input
            type='number'
            id='mobile'
            name='mobile'
            value={mobile}
            onChange={handleInput}
            placeholder='phone'
          />
        </div>
        <div className={styles.form_group}>
          <AiOutlineMail className={styles.edit_icons} />
          <input
            type='text'
            id='email'
            name='email'
            value={email}
            onChange={handleInput}
            placeholder='email'
            disabled
          />
        </div>
        <div className={styles.form_group}>
          <FaGlobeAfrica className={styles.edit_icons} />
          <input
            type='text'
            id='website'
            name='website'
            value={website}
            onChange={handleInput}
            placeholder='website'
          />
        </div>

        <button className='btn btn-info w-100' type='submit'>
          Save
        </button>
      </form>

      <FaArrowLeft
        className={styles.arrow}
        onClick={() =>
          dispatch({ type: PROFILE_TYPES.REMOVE_EDIT, payload: false })
        }
      />

      <h3>CONNECTS</h3>
    </div>
  );
};

export default EditProfile;

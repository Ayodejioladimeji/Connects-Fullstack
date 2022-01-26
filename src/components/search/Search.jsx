import React, { useState, useRef, useEffect } from 'react';

// PACKAGES
import { useDispatch, useSelector } from 'react-redux';
import { FaSearch, FaArrowLeft } from 'react-icons/fa';
import { BsThreeDotsVertical } from 'react-icons/bs';

// COMPONENTS
import { MESS_TYPES, showSearch } from '../../redux/actions/messageAction';
import { getDataAPI } from './../../utils/fetchData';
import { removeSearch } from './../../redux/actions/messageAction';
import { GLOBALTYPES } from './../../redux/actions/globalTypes';
import { logout } from './../../redux/actions/authAction';
import { PROFILE_TYPES } from './../../redux/actions/profileAction';
import styles from './Search.module.css';

const Search = () => {
  const { auth, message } = useSelector((state) => state);
  const dispatch = useDispatch();
  const clickRef = useRef();
  const [search, setSearch] = useState('');
  const [drop, setDrop] = useState(false);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
  }, []);

  //   The handle search function
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search) return message.searchUser([]);

    try {
      const res = await getDataAPI(`search?username=${search}`, auth.token);
      dispatch({
        type: MESS_TYPES.SEARCH_USER,
        payload: res.data.users,
      });
      //   dispatch(searchUser(res.data.users));
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

  //   The handleClick outside function
  const handleClickOutside = (e) => {
    if (clickRef.current && !clickRef.current.contains(e.target)) {
      setDrop(false);
    }
  };

  return (
    <div className={styles.search_container}>
      <div className={styles.search} ref={clickRef}>
        <div className={styles.search_left}>
          <h3>connects</h3>
        </div>

        <div className={styles.search_right}>
          <FaSearch
            onClick={() => dispatch(showSearch())}
            className={styles.search_icon}
          />
          <BsThreeDotsVertical
            onClick={() => setDrop(!drop)}
            className={styles.search_icon}
          />
        </div>

        {drop && (
          <ul className={styles.dropdown}>
            <li>
              <div
                onClick={() =>
                  dispatch({ type: PROFILE_TYPES.ADD_EDIT, payload: true })
                }
              >
                Settings
              </div>
            </li>

            <li>
              <div onClick={() => dispatch(logout())}>Logout</div>
            </li>
          </ul>
        )}
      </div>

      {message.show && (
        <div className={styles.search_div}>
          <FaArrowLeft
            className={styles.arrow}
            onClick={() => dispatch(removeSearch())}
          />
          <div className={styles.form_group}>
            <form onSubmit={handleSearch}>
              <input
                type='text'
                value={search}
                placeholder='Search for friends'
                onChange={(e) => setSearch(e.target.value)}
              />
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;

import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { FaCircle } from 'react-icons/fa';

// COMPONENTS
import {
  MESS_TYPES,
  getConversations,
} from '../../redux/actions/messageAction';
import UserCard from '../usercard/UserCard';
import styles from './LeftSide.module.css';

const Online = () => {
  const { auth, message, online, suggestions } = useSelector((state) => state);
  const dispatch = useDispatch();

  const history = useHistory();
  const { id } = useParams();
  const pageEnd = useRef();
  const [page, setPage] = useState(0);

  // Load More
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((p) => p + 1);
        }
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(pageEnd.current);
  }, [setPage]);

  useEffect(() => {
    if (message.resultUsers >= (page - 1) * 9 && page > 1) {
      dispatch(getConversations({ auth, page }));
    }
  }, [message.resultUsers, page, auth, dispatch]);

  // Check User Online - Offline
  useEffect(() => {
    if (message.firstLoad) {
      dispatch({ type: MESS_TYPES.CHECK_ONLINE_OFFLINE, payload: online });
    }
  }, [online, message.firstLoad, dispatch]);

  const handleAddUser = (user) => {
    // setSearch('');
    dispatch({
      type: MESS_TYPES.SEARCH_USER,
      payload: [],
    });
    dispatch({
      type: MESS_TYPES.ADD_USER,
      payload: { ...user, text: '', media: [] },
    });
    dispatch({ type: MESS_TYPES.CHECK_ONLINE_OFFLINE, payload: online });
    return history.push(`/message/${user._id}`);
  };

  const isActive = (user) => {
    if (id === user._id) return 'active';
    return '';
  };

  return (
    <div className={styles.chat_list}>
      {/* {message.firstLoad && (
      <p className={styles.none_user}>
        Search for friends and start chatting
      </p>
    )} */}

      <>
        {suggestions.users.map((user) => {
          return (
            <div
              key={user._id}
              className={`${styles.message_user} ${isActive(user)}`}
              onClick={() => handleAddUser(user)}
            >
              <UserCard user={user}>
                {user.online && <FaCircle className={styles.fa_circle} />}
              </UserCard>
            </div>
          );
        })}
      </>

      <button ref={pageEnd} style={{ opacity: 0 }}>
        Load More
      </button>
    </div>
  );
};

export default Online;

import React, { Fragment, useState, useEffect, useRef } from 'react';

// IMPORTED PACKAGES
import { AiFillPhone } from 'react-icons/ai';
import { BiSend } from 'react-icons/bi';
import { FaVideo, FaTrash, FaImage } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { BsThreeDotsVertical } from 'react-icons/bs';

// IMPORTED COMPONENTS
import MsgDisplay from './MsgDisplay';
import Icons from '../icons/Icons';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';
import { imageShow, videoShow } from '../../utils/mediaShow';
import { imageUpload } from '../../utils/imageUpload';
import {
  addMessage,
  getMessages,
  loadMoreMessages,
  deleteConversation,
} from '../../redux/actions/messageAction';
import ProfileCard from '../profilecard/ProfileCard';
import styles from './RightSide.module.css';
import Loading from './../alert/Loading';
import ViewProfile from '../viewprofile/ViewProfile';

// THE RIGHTSIDE COMPONENT
const RightSide = () => {
  const { auth, message, socket, peer, profile } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();

  const { id } = useParams();
  const [user, setUser] = useState([]);
  const [text, setText] = useState('');
  const [media, setMedia] = useState([]);
  const [loadMedia, setLoadMedia] = useState(false);

  const refDisplay = useRef();
  const pageEnd = useRef();
  const clickRef = useRef();

  const [data, setData] = useState([]);
  const [result, setResult] = useState(9);
  const [page, setPage] = useState(0);
  const [isLoadMore, setIsLoadMore] = useState(0);
  const [click, setClick] = useState(false);

  const history = useHistory();

  useEffect(() => {
    const newData = message.data.find((item) => item._id === id);
    if (newData) {
      setData(newData.messages);
      setResult(newData.result);
      setPage(newData.page);
    }
  }, [message.data, id]);

  // AUTO SCROLL AND GETTING USER
  useEffect(() => {
    if (id && message.users.length > 0) {
      setTimeout(() => {
        refDisplay.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }, 50);

      const newUser = message.users.find((user) => user._id === id);
      if (newUser) setUser(newUser);
    }
  }, [message.users, id]);

  // Click outside side effect
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
  }, []);

  // CHANGING MEDIA SECTION
  const handleChangeMedia = (e) => {
    const files = [...e.target.files];
    let err = '';
    let newMedia = [];

    files.forEach((file) => {
      if (!file) return (err = 'File does not exist.');

      if (file.size > 1024 * 1024 * 5) {
        return (err = 'The image/video largest is 5mb.');
      }

      return newMedia.push(file);
    });

    if (err) dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } });
    setMedia([...media, ...newMedia]);
  };

  // DELETING MEDIA SECTION
  const handleDeleteMedia = (index) => {
    const newArr = [...media];
    newArr.splice(index, 1);
    setMedia(newArr);
  };

  // HANDLE SUBMIT SECTION
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim() && media.length === 0) return;
    setText('');
    setMedia([]);
    setLoadMedia(true);

    let newArr = [];
    if (media.length > 0) newArr = await imageUpload(media);

    const msg = {
      sender: auth.user._id,
      recipient: id,
      text,
      media: newArr,
      createdAt: new Date().toISOString(),
    };

    setLoadMedia(false);
    dispatch(addMessage({ msg, auth, socket }));
    if (refDisplay.current) {
      refDisplay.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  };

  // GET MESSAGES
  useEffect(() => {
    const getMessagesData = async () => {
      if (message.data.every((item) => item._id !== id)) {
        await dispatch(getMessages({ auth, id }));

        setTimeout(() => {
          refDisplay.current.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
          });
        }, 50);
      }
    };
    getMessagesData();
  }, [id, dispatch, auth, message.data]);

  // Load More
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsLoadMore((p) => p + 1);
        }
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(pageEnd.current);
  }, [setIsLoadMore]);

  // load more messages
  useEffect(() => {
    if (isLoadMore > 1) {
      if (result >= page * 9) {
        dispatch(loadMoreMessages({ auth, id, page: page + 1 }));
        setIsLoadMore(1);
      }
    }
    // eslint-disable-next-line
  }, [isLoadMore]);

  // Delete Conversation
  const handleDeleteConversation = () => {
    Swal.fire({
      html: ' <h4>Do you want to clear your conversations?</h4> <br /> This action is not reversible',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(deleteConversation({ auth, id }));
        Swal.fire('Deleted', 'Your Conversation has been deleted', 'success');
        return history.push('/');
      }
    });
  };

  // Call
  const caller = ({ video }) => {
    const { _id, avatar, username, email } = user;

    const msg = {
      sender: auth.user._id,
      recipient: _id,
      avatar,
      username,
      email,
      video,
    };
    dispatch({ type: GLOBALTYPES.CALL, payload: msg });
  };

  const callUser = ({ video }) => {
    const { _id, avatar, username, email } = auth.user;

    const msg = {
      sender: _id,
      recipient: user._id,
      avatar,
      username,
      email,
      video,
    };

    if (peer.open) msg.peerId = peer._id;

    socket.emit('callUser', msg);
  };

  const handleAudioCall = () => {
    caller({ video: false });
    callUser({ video: false });
  };

  const handleVideoCall = () => {
    caller({ video: true });
    callUser({ video: true });
  };

  //   The handleClick outside function
  const handleClickOutside = (e) => {
    if (clickRef.current && !clickRef.current.contains(e.target)) {
      setClick(false);
    }
  };

  if (message.data === undefined) return null;

  return (
    <Fragment>
      <div className={styles.message_header}>
        {user.length !== 0 && (
          <ProfileCard user={user}>
            <BsThreeDotsVertical
              style={{ cursor: 'pointer' }}
              onClick={() => setClick(!click)}
            />
            {click && (
              <div className={styles.show_click} ref={clickRef}>
                <div onClick={handleAudioCall}>
                  <AiFillPhone className={styles.top_icon} />{' '}
                  <span>Voice call</span>
                </div>

                <div onClick={handleVideoCall}>
                  <FaVideo className={styles.top_icon} />{' '}
                  <span>Video call</span>
                </div>

                <div onClick={handleDeleteConversation}>
                  <FaTrash className={styles.top_icon} />{' '}
                  <span>Clear chat</span>
                </div>
              </div>
            )}
          </ProfileCard>
        )}
      </div>

      <div
        className={styles.chat_container}
        style={{ height: media.length > 0 ? 'calc(100% - 180px)' : '' }}
      >
        <div className={styles.chat_display} ref={refDisplay}>
          <button ref={pageEnd}>Load more</button>

          {data.map((msg, index) => (
            <div key={index}>
              {msg.sender !== auth.user._id && (
                <div className={`${styles.chat_row} ${styles.other_message}`}>
                  <MsgDisplay user={user} msg={msg} />
                </div>
              )}

              {msg.sender === auth.user._id && (
                <div className={`${styles.chat_row} ${styles.you_message}`}>
                  <MsgDisplay user={auth.user} msg={msg} data={data} />
                </div>
              )}
            </div>
          ))}

          {loadMedia && (
            <div className={`${styles.chat_row} ${styles.you_message}`}>
              <Loading width='30' height='30' color='#4457e3' />
            </div>
          )}
        </div>
      </div>

      {/* THE SHOW MEDIA SECTION */}
      <div
        className={styles.show_media}
        style={{ display: media.length > 0 ? 'grid' : 'none' }}
      >
        {media?.map((item, index) => (
          <div key={index} className={styles.file_media}>
            {item.type.match(/video/i)
              ? videoShow(URL.createObjectURL(item))
              : imageShow(URL.createObjectURL(item))}
            <span onClick={() => handleDeleteMedia(index)}>&times;</span>
          </div>
        ))}
      </div>

      {/* THE SUBMIT SECTION */}
      <form className={styles.chat_input} onSubmit={handleSubmit}>
        <div className={styles.form_group}>
          <textarea
            placeholder='Enter your message...'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <div className={styles.form_input}>
          <Icons setContent={setText} content={text} />

          <div className={styles.file_upload}>
            <FaImage className={styles.icons} />
            <input
              type='file'
              name='file'
              id='file'
              multiple
              accept='image/*,video/*'
              onChange={handleChangeMedia}
              className={styles.file}
            />
          </div>

          <button
            type='submit'
            disabled={text || media.length > 0 ? false : true}
          >
            <BiSend className={styles.icons} />
          </button>
        </div>
      </form>

      {profile.showModal && <ViewProfile />}
    </Fragment>
  );
};

export default RightSide;

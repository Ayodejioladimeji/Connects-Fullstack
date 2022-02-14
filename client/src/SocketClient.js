import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GLOBALTYPES } from './redux/actions/globalTypes';
import { MESS_TYPES } from './redux/actions/messageAction';

import audiobell from './audio/message.mp3';
import { NOTIFY_TYPES } from './redux/actions/notifyAction';

const spawnNotification = (body, icon, url, title) => {
  let options = {
    body,
    icon,
  };
  let n = new Notification(title, options);

  n.onclick = (e) => {
    e.preventDefault();
    window.open(url, '_blank');
  };
};

const SocketClient = () => {
  const { auth, notify, socket, online, call } = useSelector((state) => state);
  const dispatch = useDispatch();
  const audioRef = useRef();

  // joinUser
  useEffect(() => {
    socket.emit('joinUser', auth.user);
  }, [socket, auth.user]);

  // Add Notification
  useEffect(() => {
    socket.on('createNotifyToClient', (msgs) => {
      dispatch({ type: NOTIFY_TYPES.CREATE_NOTIFY, payload: msgs });

      if (notify.sound) audioRef.current.play();
      spawnNotification(
        msgs.user.username + ' ' + msgs.text,
        msgs.user.avatar,
        msgs.url,
        'CONNECTS-CHAT-APP'
      );
    });

    return () => socket.off('createNotifyToClient');
  }, [socket, dispatch, notify.sound]);

  // Remove Notification
  useEffect(() => {
    socket.on('removeNotifyToClient', (msg) => {
      dispatch({ type: NOTIFY_TYPES.REMOVE_NOTIFY, payload: msg });
    });

    return () => socket.off('removeNotifyToClient');
  }, [socket, dispatch]);

  // Message
  useEffect(() => {
    socket.on('addMessageToClient', (msg) => {
      dispatch({ type: MESS_TYPES.ADD_MESSAGE, payload: msg });

      dispatch({
        type: MESS_TYPES.ADD_USER,
        payload: {
          ...msg.user,
          text: msg.text,
          media: msg.media,
        },
      });
    });

    return () => socket.off('addMessageToClient');
  }, [socket, dispatch]);

  // Check User Online / Offline
  useEffect(() => {
    socket.emit('checkUserOnline', auth.user);
  }, [socket, auth.user]);

  useEffect(() => {
    socket.on('checkUserOnlineToMe', (data) => {
      data.forEach((item) => {
        if (!online.includes(item.id)) {
          dispatch({ type: GLOBALTYPES.ONLINE, payload: item.id });
        }
      });
    });

    return () => socket.off('checkUserOnlineToMe');
  }, [socket, dispatch, online]);

  // Checck User Online To client
  useEffect(() => {
    socket.on('checkUserOnlineToClient', (id) => {
      if (!online.includes(id)) {
        dispatch({ type: GLOBALTYPES.ONLINE, payload: id });
      }
    });

    return () => socket.off('checkUserOnlineToClient');
  }, [socket, dispatch, online]);

  // Check User Offline
  useEffect(() => {
    socket.on('CheckUserOffline', (id) => {
      dispatch({ type: GLOBALTYPES.OFFLINE, payload: id });
    });

    return () => socket.off('CheckUserOffline');
  }, [socket, dispatch]);

  // Call User
  useEffect(() => {
    socket.on('callUserToClient', (data) => {
      dispatch({ type: GLOBALTYPES.CALL, payload: data });
    });

    return () => socket.off('callUserToClient');
  }, [socket, dispatch]);

  // Check if user is busy on another call
  useEffect(() => {
    socket.on('userBusy', (data) => {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: `${call.username} is busy!` },
      });
    });

    return () => socket.off('userBusy');
  }, [socket, dispatch, call]);

  return (
    <>
      <audio controls ref={audioRef} style={{ display: 'none' }}>
        <source src={audiobell} type='audio/mp3' />
      </audio>
    </>
  );
};

export default SocketClient;

import React, { useEffect } from 'react';

// PACKAGES
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Peer from 'peerjs';
import io from 'socket.io-client';

// COMPONENTS
import { GLOBALTYPES } from './redux/actions/globalTypes';
import { refreshToken } from './redux/actions/authAction';
import styles from './GlobalStyle.module.css';
import Routes from './routes/Routes';
import Alert from './components/alert/Alert';
import { getSuggestions } from './redux/actions/suggestionsAction';
import SocketClient from './SocketClient';
import CallModal from './components/message/CallModal';
import { getNotifies } from './redux/actions/notifyAction';

function App() {
  const { auth, call, online } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());

    const socket = io();
    dispatch({ type: GLOBALTYPES.SOCKET, payload: socket });
    return () => socket.close();
  }, [dispatch]);

  // GET SUGGESTIONS
  useEffect(() => {
    if (auth.token) {
      dispatch(getSuggestions(auth.token));
      dispatch(getNotifies(auth.token));
    }
  }, [dispatch, auth.token, online]);

  useEffect(() => {
    if (!('Notification' in window)) {
      alert('This browser does not support desktop notification');
    } else if (Notification.permission === 'granted') {
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(function (permission) {
        if (permission === 'granted') {
        }
      });
    }
  }, []);

  useEffect(() => {
    const newPeer = new Peer(undefined, {
      path: '/',
      secure: true,
    });

    dispatch({ type: GLOBALTYPES.PEER, payload: newPeer });
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <Router>
        <Alert />
        {auth.token && <SocketClient />}
        {call && <CallModal />}
        <Routes />
      </Router>
    </div>
  );
}

export default App;

import { combineReducers } from 'redux';
import auth from './authReducer';
import alert from './alertReducer';
import message from './messageReducer';
import socket from './socketReducer';
import online from './onlineReducer';
import peer from './peerReducer';
import call from './callReducer';
import suggestions from './suggestionsReducer';
import profile from './profileReducer';
import notify from './notifyReducer';

export default combineReducers({
  auth,
  alert,
  message,
  profile,
  socket,
  notify,
  online,
  suggestions,
  call,
  peer,
});

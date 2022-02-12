import { GLOBALTYPES, DeleteData } from './globalTypes';
import { postDataAPIS, getDataAPI, deleteDataAPI } from '../../utils/fetchData';
import { createNotify } from './notifyAction';

export const MESS_TYPES = {
  SHOW_SEARCH: 'SHOW_SEARCH',
  REMOVE_SEARCH: 'REMOVE_SEARCH',
  SHOW_NOTIFYMODAL: 'SHOW_NOTIFYMODAL',
  REMOVE_NOTIFYMODAL: 'REMOVE_NOTIFYMODAL',
  SEARCH_USER: 'SEARCH_USER',
  ADD_USER: 'ADD_USER',
  ADD_MESSAGE: 'ADD_MESSAGE',
  GET_CONVERSATIONS: 'GET_CONVERSATIONS',
  GET_MESSAGES: 'GET_MESSAGES',
  UPDATE_MESSAGES: 'UPDATE_MESSAGES',
  DELETE_MESSAGES: 'DELETE_MESSAGES',
  DELETE_CONVERSATION: 'DELETE_CONVERSATION',
  CHECK_ONLINE_OFFLINE: 'CHECK_ONLINE_OFFLINE',
};

export const showSearch = () => (dispatch) => {
  dispatch({ type: MESS_TYPES.SHOW_SEARCH });
};

export const notifyModal = () => (dispatch) => {
  dispatch({ type: MESS_TYPES.SHOW_NOTIFYMODAL });
};

export const removeNotifyModal = () => (dispatch) => {
  dispatch({ type: MESS_TYPES.REMOVE_NOTIFYMODAL });
};

export const removeSearch = () => (dispatch) => {
  dispatch({ type: MESS_TYPES.REMOVE_SEARCH });
};

export const searchUser =
  ({ data }) =>
  (dispatch) => {
    console.log(data);
    dispatch({ type: MESS_TYPES.SEARCH_USER, payload: data });
  };

export const addMessage =
  ({ msg, auth, socket }) =>
  async (dispatch) => {
    dispatch({ type: MESS_TYPES.ADD_MESSAGE, payload: msg });

    const { _id, avatar, email, username } = auth.user;
    socket.emit('addMessage', {
      ...msg,
      user: { _id, avatar, email, username },
    });

    try {
      await postDataAPIS('message', msg, auth.token);

      // Notify
      const msgs = {
        id: auth.user._id,
        text: msg.call ? 'called you' : 'Sends you a message',
        recipients: [msg.recipient],
        url: `/message/${_id}`,
        content: msg.text,
      };

      dispatch(createNotify({ msgs, auth, socket }));
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const getConversations =
  ({ auth }) =>
  async (dispatch) => {
    try {
      if (auth.token === undefined) return;
      const res = await getDataAPI('conversations', auth.token);

      let newArr = [];
      res.data.conversations.forEach((item) => {
        item.recipients.forEach((cv) => {
          if (cv._id !== auth.user._id) {
            newArr.push({
              ...cv,
              text: item.text,
              media: item.media,
              call: item.call,
            });
          }
        });
      });

      dispatch({
        type: MESS_TYPES.GET_CONVERSATIONS,
        payload: { newArr, result: res.data.result },
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const getMessages =
  ({ auth, id, page = 1 }) =>
  async (dispatch) => {
    try {
      if (auth.token === undefined) return;
      const res = await getDataAPI(
        `message/${id}?limit=${page * 9}`,
        auth.token
      );
      const newData = { ...res.data, messages: res.data.messages.reverse() };

      dispatch({
        type: MESS_TYPES.GET_MESSAGES,
        payload: { ...newData, _id: id, page },
      });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const loadMoreMessages =
  ({ auth, id, page = 1 }) =>
  async (dispatch) => {
    try {
      const res = await getDataAPI(
        `message/${id}?limit=${page * 9}`,
        auth.token
      );
      const newData = { ...res.data, messages: res.data.messages.reverse() };
      dispatch({
        type: MESS_TYPES.UPDATE_MESSAGES,
        payload: { ...newData, _id: id, page },
      });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const deleteMessages =
  ({ msg, data, auth }) =>
  async (dispatch) => {
    const newData = DeleteData(data, msg._id);
    dispatch({
      type: MESS_TYPES.DELETE_MESSAGES,
      payload: { newData, _id: msg.recipient },
    });
    try {
      await deleteDataAPI(`message/${msg._id}`, auth.token);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const deleteConversation =
  ({ auth, id }) =>
  async (dispatch) => {
    dispatch({ type: MESS_TYPES.DELETE_CONVERSATION, payload: id });
    try {
      await deleteDataAPI(`conversation/${id}`, auth.token);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

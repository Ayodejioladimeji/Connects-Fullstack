import { GLOBALTYPES } from './globalTypes';
import { getDataAPI, patchDataAPI } from '../../utils/fetchData';
import { imageUpload } from '../../utils/imageUpload';

export const PROFILE_TYPES = {
  SHOW_MODAL: 'SHOW_MODAL',
  REMOVE_MODAL: 'REMOVE_MODAL',
  ADD_EDIT: 'ADD_EDIT',
  REMOVE_EDIT: 'REMOVE_EDIT',
  LOADING: 'LOADING_PROFILE',
  GET_USER: 'GET_PROFILE_USER',
  GET_ID: 'GET_PROFILE_ID',
};

export const getProfileUsers =
  ({ id, auth }) =>
  async (dispatch) => {
    dispatch({ type: PROFILE_TYPES.GET_ID, payload: id });

    try {
      dispatch({ type: PROFILE_TYPES.LOADING, payload: true });
      const res = await getDataAPI(`/user/${id}`, auth.token);

      dispatch({
        type: PROFILE_TYPES.GET_USER,
        payload: res.data,
      });

      dispatch({ type: PROFILE_TYPES.LOADING, payload: false });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const updateProfileUser =
  ({ userData, avatar, auth }) =>
  async (dispatch) => {
    console.log(avatar);
    if (!userData.username)
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: 'Please add your username.' },
      });

    try {
      let media;
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

      if (avatar) media = await imageUpload([avatar]);

      const res = await patchDataAPI(
        'user',
        {
          ...userData,
          avatar: avatar ? media[0].url : auth.user.avatar,
        },
        auth.token
      );

      dispatch({
        type: GLOBALTYPES.AUTH,
        payload: {
          ...auth,
          user: {
            ...auth.user,
            ...userData,
            avatar: avatar ? media[0].url : auth.user.avatar,
          },
        },
      });

      dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });

      setTimeout(() => {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
      }, 4000);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });

      setTimeout(() => {
        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: {},
        });
      }, 4000);
    }
  };

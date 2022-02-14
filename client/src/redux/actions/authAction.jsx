import { GLOBALTYPES } from './globalTypes';
import { postDataAPI } from '../../utils/fetchData';
import { postDataAPIS, postGoogleAPI } from '../../utils/fetchData';

// REGISTRATION
export const register = (data) => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

    const res = await postDataAPI('register', data);

    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {
        token: res.data.activation_token,
      },
    });

    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        success: res.data.msg,
      },
    });

    setTimeout(() => {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
      window.location.href = '/login';
    }, 6000);
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg,
      },
    });

    setTimeout(() => {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {},
      });
    }, 6000);
  }
};

// ACTIVATION
export const activation = (data) => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

    const res = await postDataAPI('activation', data);
    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {
        token: res.data.access_token,
        user: res.data.user,
      },
    });

    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        success: res.data.msg,
      },
    });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg,
      },
    });
  }
};

// LOGIN
export const login = (data) => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

    const res = await postDataAPIS('login', data);
    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {
        token: res.data.access_token,
        user: res.data.user,
      },
    });

    localStorage.setItem('firstLogin', true);
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        success: res.data.msg,
      },
    });
    setTimeout(() => {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {},
      });
    }, 6000);
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg,
      },
    });

    setTimeout(() => {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {},
      });
    }, 6000);
  }
};

// ACCESS TOKEN
export const refreshToken = () => async (dispatch) => {
  const firstLogin = localStorage.getItem('firstLogin');
  if (firstLogin) {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

    try {
      const res = await postDataAPI('refresh_token');
      dispatch({
        type: GLOBALTYPES.AUTH,
        payload: {
          token: res.data.access_token,
          user: res.data.user,
        },
      });

      dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: err.response.data.msg,
        },
      });
    }
  }
};

// LOGOUT
export const logout = () => async (dispatch) => {
  try {
    localStorage.removeItem('firstLogin');
    await postDataAPI('logout');
    window.location.href = '/logout';
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg,
      },
    });
  }
};

// GOOGLE LOGIN
export const responseGoogle = (tokenId) => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

    const res = await postGoogleAPI('google_login', tokenId);

    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {
        token: res.data.access_token,
      },
    });

    localStorage.setItem('firstLogin', true);
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        success: res.data.msg,
      },
    });

    setTimeout(() => {
      window.location.href = '/';
    }, 3000);
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg,
      },
    });

    setTimeout(() => {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {},
      });
    }, 6000);
  }
};

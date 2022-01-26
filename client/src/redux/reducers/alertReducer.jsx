import { GLOBALTYPES } from '../actions/globalTypes';

const initialState = {};

const alertReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GLOBALTYPES.ALERT:
      return payload;
    default:
      return state;
  }
};

export default alertReducer;

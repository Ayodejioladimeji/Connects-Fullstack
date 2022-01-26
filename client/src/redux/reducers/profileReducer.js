import { PROFILE_TYPES } from '../actions/profileAction';

const initialState = {
  loading: false,
  ids: [],
  users: [],
  showModal: false,
  editModal: false,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_TYPES.SHOW_MODAL:
      return {
        ...state,
        showModal: action.payload,
      };
    case PROFILE_TYPES.REMOVE_MODAL:
      return {
        ...state,
        showModal: action.payload,
      };
    case PROFILE_TYPES.ADD_EDIT:
      return {
        ...state,
        editModal: action.payload,
      };
    case PROFILE_TYPES.REMOVE_EDIT:
      return {
        ...state,
        editModal: action.payload,
      };
    case PROFILE_TYPES.LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case PROFILE_TYPES.GET_USER:
      return {
        ...state,
        users: [...state.users, action.payload.user],
      };
    case PROFILE_TYPES.GET_ID:
      return {
        ...state,
        ids: [...state.ids, action.payload],
      };
    default:
      return state;
  }
};

export default profileReducer;

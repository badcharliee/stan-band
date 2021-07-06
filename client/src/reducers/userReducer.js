import { FETCH_USER_BY_ID, EDIT_USER, CREATE_USER, SIGN_OUT } from '../actions/types';

const INTIAL_STATE = {
  user: null
};

const userReducer = (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER_BY_ID:
      return { ...state, user: action.payload };
    case EDIT_USER:
      return { ...state, user: action.payload };
    case CREATE_USER:
      return { ...state, user: action.payload }
    case SIGN_OUT:
      return {...state, user: null };
    default:
      return state;
  }
};

export default userReducer;

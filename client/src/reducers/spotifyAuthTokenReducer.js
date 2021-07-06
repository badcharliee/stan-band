import { ACCESS_TOKEN_RECEIVED, FETCH_CURRENT_USER, SIGN_OUT } from '../actions/types';

const INTIAL_STATE = {
  isSignedIn: null,
  userId: null,
  accessToken: null,
  imageUrl: null
};

const spotifyAuthTokenReducer = (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case ACCESS_TOKEN_RECEIVED:
      return { ...state, accessToken: action.payload};
    case FETCH_CURRENT_USER:
      return { ...state, userId: action.payload.id, imageUrl: action.payload.imageUrl, isSignedIn: true };
    case SIGN_OUT:
      return { isSignedIn: null, userId: null, accessToken: null };
    default:
      return state;
  }
};

export default spotifyAuthTokenReducer;

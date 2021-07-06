import { SEARCH_SPOTIFY_VALUE_UPDATE, SEARCH_SPOTIFY } from '../actions/types';

const INTIAL_STATE = {
  value: null,
  results: null
};

const spotifySearchReducer = (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case SEARCH_SPOTIFY_VALUE_UPDATE:
      return { ...state, value: action.payload};
    case SEARCH_SPOTIFY:
      return { ...state, results: action.payload};
    default:
      return state;
  }
};

export default spotifySearchReducer;

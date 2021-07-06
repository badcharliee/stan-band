import { combineReducers } from 'redux';
import spotifyAuthTokenReducer from './spotifyAuthTokenReducer';
import bandSearchReducer from './bandSearchReducer';
import spotifySearchReducer from './spotifySearchReducer';
import userReducer from './userReducer';

export default combineReducers({
  spotifyAuth: spotifyAuthTokenReducer,
  bandSearch: bandSearchReducer,
  spotifySearch: spotifySearchReducer,
  currentUser: userReducer
});

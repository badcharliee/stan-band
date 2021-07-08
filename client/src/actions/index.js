import { v4 as uuidv4 } from 'uuid';

import spotify from '../apis/spotify';
import bands from '../apis/bands';
import users from '../apis/users';
import {
  ACCESS_TOKEN_RECEIVED,
  FETCH_CURRENT_USER,
  SIGN_OUT,
  SEARCH_SPOTIFY_VALUE_UPDATE,
  SEARCH_SPOTIFY,
  FETCH_BANDS,
  FETCH_BAND_BY_ID,
  CREATE_BAND,
  EDIT_BAND,
  DELETE_BAND,
  SEARCH_BAND_VALUE_UPDATE,
  SEARCH_BANDS,
  BAND_SELECTED,
  FETCH_USERS,
  FETCH_USER,
  FETCH_USER_BY_ID,
  CREATE_USER,
  EDIT_USER,
  DELETE_USER,
  NEW_COMMENT_CHANGE,
  LIKE_COMMENT,
  UNLIKE_COMMENT
} from './types';

/* spotify api action creators */

export const accessTokenReceived = token => async dispatch => {
  dispatch({ type: ACCESS_TOKEN_RECEIVED, payload: token });
};

export const fetchCurrentUser = () => async (dispatch, getState) => {
  const response = await spotify.get('/me', {
    headers: {
      Authorization: 'Bearer ' + getState().spotifyAuth.accessToken
    }
  });

  if (response.data.images.length > 0) {
    dispatch({ type: FETCH_CURRENT_USER, payload: { id: response.data.id, imageUrl: response.data.images[0].url } });
  } else {
    dispatch({ type: FETCH_CURRENT_USER, payload: { id: response.data.id, imageUrl: null } });
  }

};

export const signOut = () => async dispatch => {
  dispatch({ type: SIGN_OUT });
};

export const searchSpotifyValueUpdate = searchValue => async dispatch => {
  dispatch({ type: SEARCH_SPOTIFY_VALUE_UPDATE, payload: searchValue });
}

export const searchSpotify = (searchValue) => async (dispatch, getState) => {
  /* get artists that were searched */
  const searchResponse = await spotify.get('search', {
    headers: {
      Authorization: 'Bearer ' + getState().spotifyAuth.accessToken
    },
    params: {
      q: searchValue,
      type: 'artist',
      limit: '50'
    }
  });

  /* check if user is following one or more artists */
  const ids = searchResponse.data.artists.items.map(artistObject => {
    return artistObject.id;
  });
  const idsString = ids.join();

  const followingResponse = await spotify.get('/me/following/contains', {
    headers: {
      Authorization: 'Bearer ' + getState().spotifyAuth.accessToken
    },
    params: {
      type: 'artist',
      ids: idsString
    }
  });
  const isFollowingArray = followingResponse.data;

  var i = 0;
  const mergedResponse = searchResponse.data.artists.items.map(artistObject => {
    const isFollowing = isFollowingArray[i];
    i += 1;
    return { ...artistObject, isFollowing };
  });

  dispatch({ type: SEARCH_SPOTIFY, payload: mergedResponse });
}

/* bands api action creators */

export const fetchBands = () => async dispatch => {
  const response = await bands.get('/');

  dispatch({ type: FETCH_BANDS, payload: response.data });
}

export const fetchBand = id => async dispatch => {
  const response = await bands.get(`/${id}`);

  dispatch({ type: FETCH_BAND_BY_ID, payload: response.data });
}

export const createBand = band => async (dispatch, getState) => {
  // const { userId } = getState().auth;
  const response = await bands.post('', band);

  dispatch({ type: CREATE_BAND, payload: response.data });
  dispatch(bandSelected(response.data));
  dispatch(stanBand());
}

export const editBand = (band, id) => async dispatch => {
  const response = await bands.put(`/${id}`, band);

  dispatch({ type: EDIT_BAND, payload: response.data });
};

export const deleteBand = id => async dispatch => {
  await bands.delete(`/${id}`);

  dispatch({ type: DELETE_BAND, payload: id });
};

export const searchBandValueUpdate = searchValue => async dispatch => {
  dispatch({ type: SEARCH_BAND_VALUE_UPDATE, payload: searchValue });
}

export const searchBands = (searchValue) => async (dispatch, getState) => {
  const response = await bands.get(`?name_like=${searchValue}`);

  dispatch({ type: SEARCH_BANDS, payload: response.data });
}

export const bandSelected = band => dispatch => {
  dispatch({ type: BAND_SELECTED, payload: band });
}

/* users api action creators */

export const fetchUsers = () => async dispatch => {
  const response = await users.get('/');

  dispatch({ type: FETCH_USERS, payload: response.data });
}

export const fetchUser = id => async dispatch => {
  const response = await users.get(`/${id}`);

  dispatch({ type: FETCH_USER, payload: response.data });
}

export const newCommentChange = (commentValue) => async dispatch => {
  dispatch({ type: NEW_COMMENT_CHANGE, payload: commentValue });
}

export const likeComment = comment => async (dispatch, getState) => {
  const userId = getState().currentUser.user.userId;
  const commentLikers = [ ...comment.likers, userId ];
  const editedComment = { ...comment, likers: commentLikers };

  const filteredComments = getState().bandSearch.selected.comments.filter(cmt => cmt.uuid !== comment.uuid);
  const editedComments = [ editedComment, ...filteredComments ];

  const bandId = getState().bandSearch.selected.id;
  const band = { ...getState().bandSearch.selected, comments: editedComments };
  dispatch(editBand(band, bandId));
}

export const unlikeComment = comment => async (dispatch, getState) => {
  const userId = getState().currentUser.user.userId;
  const commentLikers = comment.likers.filter(liker => liker !== userId);
  const editedComment = { ...comment, likers: commentLikers };

  const filteredComments = getState().bandSearch.selected.comments.filter(cmt => cmt.uuid !== comment.uuid);
  const editedComments = [ editedComment, ...filteredComments ];

  const bandId = getState().bandSearch.selected.id;
  const band = { ...getState().bandSearch.selected, comments: editedComments };
  dispatch(editBand(band, bandId));
}

export const addNewComment = () => async (dispatch, getState) => {

  const commentValue = getState().bandSearch.newComment;

  // validate commentValue
  if (!commentValue || commentValue === "") {
    console.log('cannot upload an empty or null comment!');
    return;
  }

  const currentUser = getState().currentUser.user;

  if (!currentUser) {
    console.log('there is no user logged in!');
    return;
  }
  // construct band comment object
  const uuid = uuidv4();
  const timePosted = new Date().toUTCString();
  const spotifyUserId = currentUser.userId;
  const upvotes = 1;
  const downvotes = 0;
  const body = commentValue;

  const bandComment = {
    "uuid": uuid,
    "timePosted": timePosted,
    "userId": spotifyUserId,
    "body": body,
    "likers": [ spotifyUserId ]
  };

  // add comment object to band
  const bandId = getState().bandSearch.selected.id;
  const bandComments = [ ...getState().bandSearch.selected.comments, bandComment ];
  const band = { ...getState().bandSearch.selected, comments: bandComments };
  dispatch(editBand(band, bandId));

  // construct user comment object
  const spotifyBandId = getState().bandSearch.selected.spotifyBandId;

  const userComment = {
    "uuid": uuid,
    "timePosted": timePosted,
    "bandId": spotifyBandId,
    "body": body
  };

  // add comment object to user
  const userId = currentUser.id;
  const userComments = [ ...currentUser.comments, userComment ];
  const user = { ...currentUser, comments: userComments };
  dispatch(editUser(user, userId));
  // update redux store with response
  dispatch(newCommentChange(null));
}

/*
  check if user exists --
  if user exists, fetch user data --
  else if user does not exist, create user
*/
export const fetchUserByUserId = () => async (dispatch, getState) => {
  const { userId, imageUrl } = getState().spotifyAuth;
  const response = await users.get(`?userId=${userId}`);

  // if user exists
  if (response.data.length > 0) {
    console.log('user exists.');
    dispatch({ type: FETCH_USER_BY_ID, payload: response.data[0] });
  } else {
    // user does not exist... add them to the database
    console.log('user does not exist... create user');
    dispatch(createUser({ imageUrl, stanning: [], comments: [] }));
  }

}

export const createUser = user => async (dispatch, getState) => {
  const { userId } = getState().spotifyAuth;
  const response = await users.post('/', { ...user, userId });

  console.log('create that user');

  dispatch({ type: CREATE_USER, payload: response.data });
}

export const stanBand = () => async (dispatch, getState) => {
  const currentBandId = getState().bandSearch.selected.spotifyBandId;
  const user = getState().currentUser.user;
  const stanningArray = [ ...user.stanning, currentBandId];
  const editedUser = { ...user, stanning: stanningArray };

  dispatch(editUser(editedUser, user.id));

  const bandStans = [ ...getState().bandSearch.selected.stans, user.userId ];
  const editedBand = { ...getState().bandSearch.selected, stans: bandStans };

  dispatch(editBand(editedBand, getState().bandSearch.selected.id));
}

export const unstanBand = () => async (dispatch, getState) => {
  const currentBandId = getState().bandSearch.selected.spotifyBandId;
  const user = getState().currentUser.user;
  const stanningArray = user.stanning.filter(o => o !== currentBandId);
  const editedUser = { ...user, stanning: stanningArray };

  dispatch(editUser(editedUser, user.id));

  const bandStans = getState().bandSearch.selected.stans.filter(o => o !== user.userId);
  const editedBand = { ...getState().bandSearch.selected, stans: bandStans };

  dispatch(editBand(editedBand, getState().bandSearch.selected.id));
}

export const editUser = (user, id) => async dispatch => {
  const response = await users.put(`/${id}`, user);

  dispatch({ type: EDIT_USER, payload: response.data });
};

export const deleteUser = id => async dispatch => {
  await users.delete(`/${id}`);

  dispatch({ type: DELETE_USER, payload: id });
};

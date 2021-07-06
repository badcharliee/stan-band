import {
  SEARCH_BAND_VALUE_UPDATE,
  SEARCH_BANDS,
  BAND_SELECTED,
  EDIT_BAND,
  NEW_COMMENT_CHANGE
} from '../actions/types';

const INTIAL_STATE = {
  value: null,
  results: null,
  selected: null,
  newComment: null
};

const bandSearchReducer = (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case SEARCH_BAND_VALUE_UPDATE:
      return { ...state, value: action.payload};
    case SEARCH_BANDS:
      return { ...state, results: action.payload};
    case BAND_SELECTED:
      return { ...state, selected: action.payload };
    case EDIT_BAND:
      return { ...state, selected: action.payload };
    case NEW_COMMENT_CHANGE:
      return { ...state, newComment: action.payload };
    default:
      return state;
  }
};

export default bandSearchReducer;

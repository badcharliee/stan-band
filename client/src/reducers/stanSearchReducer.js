import {
  STAN_SELECTED
} from '../actions/types';

const INTIAL_STATE = {
  value: null,
  results: null,
  selected: null
};

const stanSearchReducer = (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case STAN_SELECTED:
      return { ...state, selected: action.payload};
    default:
      return state;
  }
};

export default stanSearchReducer;

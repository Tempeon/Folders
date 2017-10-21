import {
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_FAILURE,
  CLEAR_SEARCH,
} from '../action/Search'


const initialState = {
  typeSearch: '',
  text: '',
  isSearch: false,
  error: null,
  list: {
    folder: {
      count: 0,
      rows: [],
    },
    file: {
      count: 0,
      rows: [],
    },
    tags: [],
  },
};

const searchState = (state = initialState, action) => {
  const { error, response } = action;
  switch (action.type) {
    case SEARCH_REQUEST:
      return { ...state, isSearch: true};
    case SEARCH_SUCCESS:
      return { ...state, isSearch: false, error: null, list: response };
    case SEARCH_FAILURE:
      return { ...state, isSearch: false, error };
    case CLEAR_SEARCH:
      return { ...state, list: initialState.list };
    default:
      return state;
  }
};

export default searchState;

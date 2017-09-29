import {
  GET_TAGS_REQUEST,
  GET_TAGS_SUCCESS,
  GET_TAGS_FAILURE,
  CREATE_TAG_REQUEST,
  CREATE_TAG_SUCCESS,
  CREATE_TAG_FAILURE,
} from '../action/Tags';

const initialState = {
  isCreating: false,
  isFetch: false,
  isDelete: false,
  list: [],
  error: false,
};

const Tags = (state = initialState, action) => {
  const { error, response } = action;
  switch (action.type) {
    case GET_TAGS_REQUEST:
      return { ...state, isFetch: true };
    case GET_TAGS_SUCCESS:
      return { ...state, isFetch: false, error: null, list: response };
    case GET_TAGS_FAILURE:
      return { ...state, isFetch: false, error };
    case CREATE_TAG_REQUEST:
      return { ...state, isCreating: true };
    case CREATE_TAG_SUCCESS:
      return { ...state, isCreating: false, error: null, list: [...state.list, ...response] };
    case CREATE_TAG_FAILURE:
      return { ...state, isCreating: false, error };
    default:
      return state;
  }
};

export default Tags;

import { CALL_API } from '../middleware/api';

export const SEARCH_REQUEST = 'SEARCH_REQUEST';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_FAILURE = 'SEARCH_FAILYRE';

const find = (type, Name) => ({
  [CALL_API]: {
    types: [SEARCH_REQUEST, SEARCH_SUCCESS, SEARCH_FAILURE],
    endpoint: `Search/${type}/${Name}`,
  },
});

export const search = (type, Name) => (dispatch) => {
  dispatch(find(type, Name));
}
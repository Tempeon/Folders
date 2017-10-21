import { CALL_API } from '../middleware/api';

export const SEARCH_REQUEST = 'SEARCH_REQUEST';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_FAILURE = 'SEARCH_FAILURE';
/*
const find = (type, Name) => ({
  [CALL_API]: {
    types: [SEARCH_REQUEST, SEARCH_SUCCESS, SEARCH_FAILURE],
    endpoint: `Search/${type}/${Name}`,
  },
});

export const search = (type, Name) => (dispatch) => {
  dispatch(find(type, Name));
}

export const SEARCH_NOTES_REQUEST = 'SEARCH_NOTES_REQUEST';
export const SEARCH_NOTES_SUCCESS = 'SEARCH_NOTES_SUCCESS';
export const SEARCH_NOTES_FAILURE = 'SEARCH_NOTES_FAILURE';
*/
const find = searchText => ({
  [CALL_API]: {
    types: [SEARCH_REQUEST, SEARCH_SUCCESS, SEARCH_FAILURE],
    endpoint: `Search/${searchText}`,
  },
});

export const search = searchText => (dispatch) => {
  dispatch(find(searchText));
};

export const CLEAR_SEARCH = 'CLEAR_SEARCH';
export const clearSearch = () => ({
  type: CLEAR_SEARCH,
});

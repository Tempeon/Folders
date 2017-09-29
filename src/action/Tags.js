import { CALL_API } from '../middleware/api';

// --------------------------- CREATE TAGS ---------------------------

export const CREATE_TAG_REQUEST = 'CREATE_TAG_REQUEST';
export const CREATE_TAG_SUCCESS = 'CREATE_TAG_SUCCESS';
export const CREATE_TAG_FAILURE = 'CREATE_AG_FAILURE';

const createTag = requestOptions => ({
  [CALL_API]: {
    types: [CREATE_TAG_REQUEST, CREATE_TAG_SUCCESS, CREATE_TAG_FAILURE],
    endpoint: 'Tags',
    requestOptions,
  },
});

export const addTag = (Name, idParent) => (dispatch) => {
  dispatch(createTag({
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ Name, idParent }),
  }));
};

// --------------------------- GET TAGS ---------------------------

export const GET_TAGS_REQUEST = 'GET_TAGS_REQUEST';
export const GET_TAGS_SUCCESS = 'GET_TAGS_SUCCESS';
export const GET_TAGS_FAILURE = 'GET_TAGS_FAILURE';

const getTag = idNote => ({
  [CALL_API]: {
    types: [GET_TAGS_REQUEST, GET_TAGS_SUCCESS, GET_TAGS_FAILURE],
    endpoint: `Tags/${idNote}`,
  },
});

export const getTags = idNote => (dispatch) => {
  dispatch(getTag(idNote));
};
// --------------------------- DELETE TAGS ---------------------------

export const REMOVE_TAGS_REQUEST = 'REMOVE_TAGS_REQUEST';
export const REMOVE_TAGS_SUCCESS = 'REMOVE_TAGS_SUCCESS';
export const REMOVE_TAGS_FAILURE = 'REMOVE_TAGS_FAILURE';

const deleteTag = requestOptions => ({
  [CALL_API]: {
    types: [REMOVE_TAGS_REQUEST, REMOVE_TAGS_SUCCESS, REMOVE_TAGS_FAILURE],
    endpoint: 'Tags',
    requestOptions,
  },
});

export const removeTags = id => (dispatch) => {
  dispatch(deleteTag({
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  }));
};

import { CALL_API } from '../middleware/api';

// --------------------------- GET NOTES ---------------------------

export const GET_NOTE_REQUEST = 'GET_NOTE_REQUEST';
export const GET_NOTE_SUCCESS = 'GET_NOTE_SUCCESS';
export const GET_NOTE_FAILURE = 'GET_NOTE_FAILURE';

const getNote = idParent => ({
  [CALL_API]: {
    types: [GET_NOTE_REQUEST, GET_NOTE_SUCCESS, GET_NOTE_FAILURE],
    endpoint: `Notes/${idParent}`,
  },
});

export const getNoteList = idParent => (dispatch) => {
  dispatch(getNote(idParent));
};

// --------------------------- CREATE NOTES ---------------------------

export const CREATE_NOTE_REQUEST = 'CREATE_NOTE_REQUEST';
export const CREATE_NOTE_SUCCESS = 'CREATE_NOTE_SUCCESS';
export const CREATE_NOTE_FAILURE = 'CREATE_NOTE_FAILURE';

const createNote = requestOptions => ({
  [CALL_API]: {
    types: [CREATE_NOTE_REQUEST, CREATE_NOTE_SUCCESS, CREATE_NOTE_FAILURE],
    endpoint: 'Notes',
    requestOptions,
  },
});

export const addNote = (Name, idFolder) => (dispatch) => {
  dispatch(createNote({
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ Name, idFolder }),
  }));
};

// --------------------------- DELETE NOTES ---------------------------

export const REMOVE_NOTE_REQUEST = 'REMOVE_NOTE_REQUEST';
export const REMOVE_NOTE_SUCCESS = 'REMOVE_NOTE_SUCCESS';
export const REMOVE_NOTE_FAILURE = 'REMOVE_NOTE_FAILURE';

const deleteNote = requestOptions => ({
  [CALL_API]: {
    types: [REMOVE_NOTE_REQUEST, REMOVE_NOTE_SUCCESS, REMOVE_NOTE_FAILURE],
    endpoint: 'Notes',
    requestOptions,
  },
});

export const removeNote = id => (dispatch) => {
  dispatch(deleteNote({
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  }));
};

// --------------------------- RENAME NOTES ---------------------------

export const RENAME_NOTE_REQUEST = 'RENAME_NOTE_REQUEST';
export const RENAME_NOTE_SUCCESS = 'RENAME_NOTE_SUCCESS';
export const RENAME_NOTE_FAILURE = 'RENAME_NOTE_FAILURE';


const newNameNote = requestOptions => ({
  [CALL_API]: {
    types: [RENAME_NOTE_REQUEST, RENAME_NOTE_SUCCESS, RENAME_NOTE_FAILURE],
    endpoint: 'Notes/Rename',
    requestOptions,
  },
});

export const renameNote = (id, Name, idFolder) => (dispatch) => {
  dispatch(newNameNote({
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, Name, idFolder }),
  }));
};


// --------------------------- EDIT NOTES ---------------------------

export const EDIT_NOTE_REQUEST = 'EDIT_NOTE_REQUEST';
export const EDIT_NOTE_SUCCESS = 'EDIT_NOTE_SUCCESS';
export const EDIT_NOTE_FAILURE = 'EDIT_NOTE_FAILURE';


const toChange = requestOptions => ({
  [CALL_API]: {
    types: [EDIT_NOTE_REQUEST, EDIT_NOTE_SUCCESS, EDIT_NOTE_FAILURE],
    endpoint: 'Notes/Edit',
    requestOptions,
  },
});

export const editNote = (id, Name, Content) => (dispatch) => {
  dispatch(toChange({
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, Name, Content }),
  }));
};


// ///////////////////////////////////////////////////////////////////////////

export const editNameNote = (id, content) => ({
  type: 'EDIT_NAME_NOTE',
  id,
  content,
});


export const moveNote = (dragIndex, hoverIndex, sideShift) => ({
  type: 'MOVE_NOTE',
  dragIndex,
  hoverIndex,
  sideShift,
});

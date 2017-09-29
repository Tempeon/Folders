import { CALL_API } from '../middleware/api';

let idFolder = 3;
let idNote = 9;

// --------------------------- GET FOLDERS ---------------------------

export const GET_FOLDERS_REQUEST = 'GET_FOLDERS_REQUEST';
export const GET_FOLDERS_SUCCESS = 'GET_FOLDERS_SUCCESS';
export const GET_FOLDERS_FAILURE = 'GET_FOLDERS_FAILURE';

// object.assing

const getFolders = idParent => ({
  [CALL_API]: {
    types: [GET_FOLDERS_REQUEST, GET_FOLDERS_SUCCESS, GET_FOLDERS_FAILURE],
    endpoint: `Folders/${idParent}`,
  },
});

export const getFoldersList = idParent => (dispatch) => {
  dispatch(getFolders(idParent));
};

// --------------------------- CERATE FOLDERS ---------------------------

export const CREATE_FOLDER_REQUEST = 'CREATE_FOLDER_REQUEST';
export const CREATE_FOLDER_SUCCESS = 'CREATE_FOLDER_SUCCESS';
export const CREATE_FOLDER_FAILURE = 'CREATE_FOLDER_FAILURE';

const createFolder = requestOptions => ({
  [CALL_API]: {
    types: [CREATE_FOLDER_REQUEST, CREATE_FOLDER_SUCCESS, CREATE_FOLDER_FAILURE],
    endpoint: 'Folders',
    requestOptions,
  },
});

export const addFolder = (Name, idParent = '0') => (dispatch) => {
  dispatch(createFolder({
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ Name, idParent }),
  }));
};

// --------------------------- Delete Folder ---------------------------

export const REMOVE_FOLDER_REQUEST = 'REMOVE_FOLDER_REQUEST';
export const REMOVE_FOLDER_SUCCESS = 'REMOVE_FOLDER_SUCCESS';
export const REMOVE_FOLDER_FAILURE = 'REMOVE_FOLDER_FAILURE';

const deleteFolder = requestOptions => ({
  [CALL_API]: {
    types: [REMOVE_FOLDER_REQUEST, REMOVE_FOLDER_SUCCESS, REMOVE_FOLDER_FAILURE],
    endpoint: 'Folders',
    requestOptions,
  },
});

export const removeFolder = id => (dispatch) => {
  dispatch(deleteFolder({
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  }));
};

/*export const removeFolder = id => ({
  type: 'REMOVE_FOLDER',
  id,
});*/

// --------------------------- Rename Folder ---------------------------

export const RENAME_FOLDER_REQUEST = 'EDIT_FOLDER_REQUEST';
export const RENAME_FOLDER_SUCCESS = 'RENAME_FOLDER_SUCCESS';
export const RENAME_FOLDER_FAILURE = 'RENAME_FOLDER_FAILURE';

const renameFolder = requestOptions => ({
  [CALL_API]: {
    types: [RENAME_FOLDER_REQUEST, RENAME_FOLDER_SUCCESS, RENAME_FOLDER_FAILURE],
    endpoint: 'Folders',
    requestOptions,
  },
});

export const newNameFolder = (id, Name) => (dispatch) => {
  dispatch(renameFolder({
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, Name }),
  }));
};

/*
  export const newNameFolder = (id, text) => ({
  type: 'NEW_NAME_FOLDER',
  text,
  id,
});
  */



export const ADD_NOTE = 'ADD_NOTE';
export const addNote = (text, folder) => ({
  type: ADD_NOTE,
  id: idNote++,
  edit: false,
  text,
  folder,
  content: '',
});


export const editName = id => ({
  type: 'EDIT_NAME',
  id,
});



export const removeNote = id => ({
  type: 'REMOVE_NOTE',
  id,
});

export const editNameNote = (id, content) => ({
  type: 'EDIT_NAME_NOTE',
  id,
  content,
});

export const newNameNote = (id, text) => ({
  type: 'NEW_NAME_NOTE',
  text,
  id,
});

export const editNote = (id, content) => ({
  type: 'EDIT_CONTENT_NOTE',
  id,
  content,
});

export const removeNoteFolder = folder => ({
  type: 'REMOVE_NOTE_FOLDER',
  folder,
});

export const addSubFolder = (idParent, text) => ({
  type: 'ADD_SUB_FOLDER',
  id: idFolder++,
  edit: false,
  text,
  subfolder: [],
  idParent,
});

export const newNameNoteContent = (id, text) => ({
  type: 'NEW_NAME_NOTE_CONTENT',
  text,
  id,
});

export const addTag = (id, text) => ({
  type: 'ADD_TAG',
  id,
  text,
});

export const searchFile = (typeSearch, text) => ({
  type: 'SEARCH_FILE',
  typeSearch,
  text,
});

export const deleteTag = (id, text) => ({
  type: 'DELETE_TAG',
  id,
  text,
});



export const moveNote = (dragIndex, hoverIndex, sideShift) => ({
  type: 'MOVE_NOTE',
  dragIndex,
  hoverIndex,
  sideShift,
});

export const moveFolder = (dragId, hoverId, sideShift, idParent) => ({
  type: 'MOVE_FOLDER',
  dragId,
  hoverId,
  sideShift,
  idParent,
});

export const addNoteToFolder = (noteId, folderId) => ({
  type: 'ADD_NOTE_TO_FOLDER',
  noteId,
  folderId,
});

import { CALL_API } from '../middleware/api';

// --------------------------- GET FOLDERS ---------------------------

export const GET_FOLDERS_REQUEST = 'GET_FOLDERS_REQUEST';
export const GET_FOLDERS_SUCCESS = 'GET_FOLDERS_SUCCESS';
export const GET_FOLDERS_FAILURE = 'GET_FOLDERS_FAILURE';

const getFolders = idParent => ({
  [CALL_API]: {
    types: [GET_FOLDERS_REQUEST, GET_FOLDERS_SUCCESS, GET_FOLDERS_FAILURE],
    endpoint: `Folders/${idParent}`,
  },
});

export const getFoldersList = idParent => (dispatch) => {
  dispatch(getFolders(idParent));
};

// --------------------------- CREATE_FOLDERS ---------------------------

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

export const addFolder = (Name, idParent = null) => (dispatch) => {
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

// --------------------------- Edit Parent ---------------------------

export const EDIT_PARENT_REQUEST = 'EDIT_PARENT_REQUEST';
export const EDIT_PARENT_SUCCESS = 'EDIT_PARENT_SUCCESS';
export const EDIT_PARENT_FAILURE = 'EDIT_PARENT_FAILURE';

const newParent = requestOptions => ({
  [CALL_API]: {
    types: [EDIT_PARENT_REQUEST, EDIT_PARENT_SUCCESS, EDIT_PARENT_FAILURE],
    endpoint: 'Folders/editIdParent',
    requestOptions,
  },
});

export const editParent = (id, idParent) => (dispatch) => {
  dispatch(newParent({
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, idParent }),
  }));
};
// ---------------------------------------------------------------//
export const CREATE_SUB_FOLDER = 'CREATE_SUB_FOLDER';

export const idParentCreateSubFolder = id => ({
  type: CREATE_SUB_FOLDER,
  id,
});

export const editName = id => ({
  type: 'EDIT_NAME',
  id,
});

export const moveFolder = (dragId, hoverId, sideShift, idParent) => ({
  type: 'MOVE_FOLDER',
  dragId,
  hoverId,
  sideShift,
  idParent,
});

export const EDIT_ID_FOLDER_NOTES_REQUEST = 'EDIT_ID_FOLDER_NOTES_REQUEST';
export const EDIT_ID_FOLDER_NOTES_SUCCESS = 'EDIT_ID_FOLDER_NOTES_SUCCESS';
export const EDIT_ID_FOLDER_NOTES_FAILURE = 'EDIT_ID_FOLDER_NOTES_FAILURE';

const idFolders = requestOptions => ({
  [CALL_API]: {
    types: [EDIT_ID_FOLDER_NOTES_REQUEST,
      EDIT_ID_FOLDER_NOTES_SUCCESS,
      EDIT_ID_FOLDER_NOTES_FAILURE],
    endpoint: 'Notes/editIdFolder',
    requestOptions,
  },
});

export const editIdFolder = (id, idFolder) => (dispatch) => {
  dispatch(idFolders({
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, idFolder }),
  }));
};

export const addNoteToFolder = (noteId, folderId) => ({
  type: 'ADD_NOTE_TO_FOLDER',
  noteId,
  folderId,
});

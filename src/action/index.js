let idFolder = 3;
let idNote = 4;
export const addFolder = text => ({
  type: 'ADD_FOLDER',
  id: idFolder++,
  edit: false,
  text,
  subfolder: [],
});

export const addNote = (text, folder) => ({
  type: 'ADD_NOTE',
  id: idNote++,
  edit: false,
  text,
  folder,
  content: '',
});

export const removeFolder = id => ({
  type: 'REMOVE_FOLDER',
  id,
});

export const editName = id => ({
  type: 'EDIT_NAME',
  id,
});

export const newNameFolder = (id, text) => ({
  type: 'NEW_NAME_FOLDER',
  text,
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

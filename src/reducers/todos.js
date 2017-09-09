import {
  GET_FOLDERS_REQUEST,
  GET_FOLDERS_SUCCESS,
  GET_FOLDERS_FAILURE,
  CREATE_FOLDER_REQUEST,
  CREATE_FOLDER_SUCCESS,
  CREATE_FOLDER_FAILURE,
  REMOVE_FOLDER_REQUEST,
  REMOVE_FOLDER_SUCCESS,
  REMOVE_FOLDER_FAILURE,
  RENAME_FOLDER_REQUEST,
  RENAME_FOLDER_SUCCESS,
  RENAME_FOLDER_FAILURE,
} from '../action/Folders';

const folder = {
  isCreating: false,
  isFetch: false,
  isRename: false,
  isDelete: false,
  list: [],
  error: false,
  idEdit: null,
  /* {
    1: {
      name: 'folder_1',
      idParent: '0',
    },
    2: {
      name: 'folder_2',
      idParent: '0',
    },
    3: {
      name: 'folder_3',
      idParent: '0',
    },
  },*/

};

const addSubFolder = (state, action) => [
  ...state,
  {
    id: action.id,
    text: action.text,
    edit: action.edit,
    showSubFolder: false,
    idParent: action.idParent,
  },
];

 const deletFolder = (state, id, mass=state, action) => {
   console.log(state, id)
   /*state.map((t) => {
    if (t.idParent === action) {
      mass.push(t.id);
    }
    return t;
  });
  mass.map(v => state = state.filter(t => t.id !== v));
  return state;
*/
  state = state.filter(folder => folder.id !== id);
  const subFolder = state.find(folder => folder.parentId === id);
  if (subFolder) {
    state = deletFolder(state, subFolder.id);
  } else {
    return state;
  }
  return deletFolder(state, id);
};

/*const deletFolder = (state, action, mass = [action]) => {
  state.map((t) => {
    if (t.idParent === action) {
      mass.push(t.id);
    }
    return t;
  });
  mass.map(v => state = state.filter(t => t.id !== v));
  return state;
};*/

const parent = (state, id) => ({
  ...state,
  idParent: id,
});
const todos = (state = folder, action) => {
  const { error, response } = action;
  switch (action.type) {
    case GET_FOLDERS_REQUEST:
      return { ...state, isFetch: true };
    case GET_FOLDERS_SUCCESS:
      return { ...state, error: null, isFetch: false, list: response/* {...state.list, ...response}*/ }; // /////list
    case GET_FOLDERS_FAILURE:
      return { ...state, isFetch: false, error };
    case CREATE_FOLDER_REQUEST:
      return { ...state, isCreating: true };
    case CREATE_FOLDER_SUCCESS:
      return { ...state, isCreating: false, error: null, list: [...state.list, response] };
    case CREATE_FOLDER_FAILURE:
      return { ...state, isCreating: false, error };
    case REMOVE_FOLDER_REQUEST:
      return { ...state, isDelete: true };
    case REMOVE_FOLDER_SUCCESS:
      return { ...state, error: null, isDelete: false, list: deletFolder(state.list, response.id) };  // // render
    case REMOVE_FOLDER_FAILURE:
      return { ...state, isDelete: false, error };
    case RENAME_FOLDER_REQUEST:
      return { ...state, isRename: true };
    case RENAME_FOLDER_SUCCESS:
      const list = state.list.map((folders) => {
        if (folders.id !== response.id) { return folders; }
        return { ...folders, Name: response.Name };
      });
      return { ...state, isRename: false, idEdit: null, error: null, list };
    case RENAME_FOLDER_FAILURE:
      return { ...state, isRename: false, error };

    case 'MOVE_FOLDER':
      /*let leftMove = false;
      const dragCard = state.list.find(v => v.id === action.dragId);
      const newDragCard = parent(dragCard, action.idParent);
      return state.list.reduce((p, v) => {
        if (v.id === action.dragId) {
          leftMove = true;
          return p;
        }
        if (v.id !== action.hoverId) {
          return [...p, v];
        }
        return leftMove ? [...p, v, newDragCard] : [...p, newDragCard, v];
      }, []);*/
      const dragFolder = state.list[action.dragId];
      const newCopyFolders = state.list.slice();
      newCopyFolders.splice(action.dragId, 1);
      newCopyFolders.splice(action.hoverId, 0, dragFolder);
      return {...state, list: newCopyFolders};
    case 'EDIT_NAME':
      if (state.idEdit !== action.id) {
        return { ...state, idEdit: action.id };
      }
      return { ...state, idEdit: null };
    default:
      return state;
  }
};

export default todos;

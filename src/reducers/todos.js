const folder = [
  {
    id: 0,
    edit: false,
    text: 'folder_1',
    subfolder: [],
    idParent: null,
  },
  {
    id: 1,
    edit: false,
    text: 'folder_2',
    subfolder: [],
    idParent: null,
  },
  {
    id: 2,
    edit: false,
    text: 'folder_3',
    subfolder: [],
    idParent: null,
  },
];

const addSubFolder = (state, action) => [
  ...state,
  {
    id: action.id,
    text: action.text,
    edit: action.edit,
    subfolder: [],
    idParent: action.idParent,
  },
];

const deletFolder = (state, action, mass = [action]) => {
  state.map((t) => {
    if (t.idParent === action) {
      mass.push(t.id);
      //if (t.subfolder !== []) { deletFolder(state, t.id, mass); }
    }
    return t;
  });
  mass.map(v => state = state.filter(t => t.id !== v));
  return state;
};

const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_FOLDER':
      return {
        id: action.id,
        text: action.text,
        edit: action.edit,
        subfolder: [],
        idParent: null,
      };
    case 'EDIT_NAME':
      if (state.id !== action.id) {
        return {
          ...state,
          edit: false,
        };
      }
      return {
        ...state,
        edit: !state.edit,
      };
    case 'NEW_NAME_FOLDER':
      if (state.id !== action.id) { return state; }
      return {
        ...state,
        text: action.text,
        edit: !state.edit,
      };
    default:
      return state;
  }
};

const todos = (state = folder, action) => {
  switch (action.type) {
    case 'ADD_FOLDER':
      return [
        ...state,
        todo(undefined, action),
      ];
    case 'REMOVE_FOLDER':
      return deletFolder(state, action.id);
    case 'EDIT_NAME':
      return state.map(t =>
        todo(t, action));
    case 'NEW_NAME_FOLDER':
      return state.map(t =>
        todo(t, action));
    case 'ADD_SUB_FOLDER':
      return addSubFolder(state, action);
      /*
      state = addSubFolder(state, action);
      return state.map(v =>
         todo(v, action));*/
    default:
      return state;
  }
};

export default todos;

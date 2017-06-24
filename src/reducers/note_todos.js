const note = [
  {
    id: 1,
    text: 'note_1',
    edit: false,
    folder: '0',
    content: 'Hello',
    tags: ['123'],
  },
  {
    id: 2,
    text: 'note_2',
    edit: false,
    folder: '1',
    content: 'hi',
    tags: ['1'],
  },
  {
    id: 3,
    text: 'note_3',
    edit: false,
    folder: '0',
    content: '123',
    tags: ['2'],
  },
];

const todo = (state, action) => {
  switch (action.type) {
    case 'EDIT_NAME_NOTE':
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
    case 'NEW_NAME_NOTE':
      if (state.id !== action.id) { return state; }
      return {
        ...state,
        text: action.text,
        edit: !state.edit,
      };
    case 'NEW_NAME_NOTE_CONTENT':
      if (state.id !== action.id) { return state; }
      return {
        ...state,
        text: action.text,
      };
    case 'ADD_NOTE':
      return {
        id: action.id,
        text: action.text,
        edit: action.edit,
        folder: action.folder,
        content: '',
        tags: [],
      };
    case 'ADD_TAG':
      if (state.id !== action.id || state.tags.indexOf(action.text) !== -1) { return state; }
      return {
        ...state,
        tags: [...state.tags, action.text],
      };
    default:
      return state;
  }
};


const noteTodos = (state = note, action) => {
  switch (action.type) {
    case 'REMOVE_NOTE':
      return state.filter(t => t.id !== action.id);
    case 'EDIT_NAME_NOTE':
      return state.map(t => todo(t, action));
    case 'NEW_NAME_NOTE':
      return state.map(t => todo(t, action));
    case 'ADD_NOTE':
      return [
        ...state,
        todo(undefined, action),
      ];
    case 'EDIT_CONTENT_NOTE':
      return state.map((value) => {
        if (value.id === action.id) {
          return {
            ...value,
            content: action.content,
          };
        }
        return value;
      });
    case 'REMOVE_NOTE_FOLDER':
      return state.filter(v => v.folder !== action.folder);
    case 'NEW_NAME_NOTE_CONTENT':
      return state.map(t => todo(t, action));
    case 'ADD_TAG':
      return state.map(v => todo(v, action));
    default:
      return state;
  }
};
export default noteTodos;

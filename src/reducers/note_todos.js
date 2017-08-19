const note = [
  {
    id: 1,
    text: 'folder_1',
    edit: false,
    folder: 0,
    content: 'Hello',
    tags: ['123'],
  },
  {
    id: 2,
    text: 'note_2',
    edit: false,
    folder: 1,
    content: 'hi',
    tags: ['1', '3'],
  },
  {
    id: 3,
    text: 'folder_1',
    edit: false,
    folder: 0,
    content: '123',
    tags: ['folder_1'],
  },
  {
    id: 4,
    text: 'note_4',
    edit: false,
    folder: 1,
    content: '123',
    tags: ['folder_1'],
  },
  {
    id: 5,
    text: 'note_5',
    edit: false,
    folder: 0,
    content: '123',
    tags: ['2'],
  },
  {
    id: 6,
    text: 'note_6',
    edit: false,
    folder: 0,
    content: '123',
    tags: ['2'],
  },
  {
    id: 7,
    text: 'note_7',
    edit: false,
    folder: 0,
    content: '123',
    tags: ['2'],
  },
  {
    id: 8,
    text: 'note_8',
    edit: false,
    folder: 0,
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
    case 'DELETE_TAG':
      return state.filter(v => v !== action.text.id);
    case 'FORM_CONTENT_NOTE':
      if (state.id !== action.text.id) { return state; }
      return {
        ...state,
        text: action.text.name,
        content: action.text.content,
        tags: action.text.Tags,
      };

    default:
      return state;
  }
};


const noteTodos = (state = note, action) => {
  switch (action.type) {
    case 'ADD_NOTE_TO_FOLDER':
      return state.map((v) => {
        if (v.id === action.noteId) {
          return {
            ...v,
            folder: action.folderId,
          };
        }
        return v;
      });
    case 'MOVE_NOTE':
      let leftMove = false;
      const dragCard = state.find(v => v.id === action.dragIndex);
      return state.reduce((p, v) => {
        if (v.id === action.dragIndex) {
          leftMove = true;
          return p;
        }
        if (v.id !== action.hoverIndex) {
          return [...p, v];
        }
        return leftMove ? [...p, v, dragCard ] : [...p, dragCard, v ];
      }, [])   ;
      /*
            const dragCard = state[action.dragIndex];
      const Note = action.Note;
      if (state === Note) { return state; }
      return state.filter(v => v !== action.dragIndex)
      .reduce((p, v) => {
        if (v.id !== dragCard.id) {
          console.log('-', p, v)
          return [...p, v];
        }
        console.log('+', p, v)
        return [...p, v, dragCard];
      }, []);
      */

      /*

      const dragCard = state[action.dragIndex];
      const Note = action.Note;
      const hoverCard = state[action.hoverIndex]
      if (state === Note) { return state; }

      state.splice(action.dragIndex, 1); // удалить
      state.splice(action.hoverIndex, 0, dragCard);
      return state;*/
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
    case 'DELETE_TAG':
      return state.map((v) => {
        if (v.id === action.id) {
          return {
            ...v,
            tags: todo(v.tags, action),
          };
        }
        return state;
      });
    case 'FORM_CONTENT_NOTE':
      console.log('start');
      return state.map(v => todo(v, action));
    default:
      return state;
  }
};
export default noteTodos;

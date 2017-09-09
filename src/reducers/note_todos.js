import {
  GET_NOTE_REQUEST,
  GET_NOTE_SUCCESS,
  GET_NOTE_FAILURE,
  CREATE_NOTE_REQUEST,
  CREATE_NOTE_SUCCESS,
  CREATE_NOTE_FAILURE,
  REMOVE_NOTE_REQUEST,
  REMOVE_NOTE_SUCCESS,
  REMOVE_NOTE_FAILURE,
  EDIT_NOTE_REQUEST,
  EDIT_NOTE_SUCCESS,
  EDIT_NOTE_FAILURE,
} from '../action/Notes';

const note = {
  isCreating: false,
  isFetch: false,
  isEdit: false,
  isDelete: false,
  list: [],
  error: false,
  idEdit: null,
};

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

const editNote = (state, response) => state.map((value) => {
  if (value.id !== response.id) { return value; }
  return { ...value, Name: response.Name };
});

const noteTodos = (state = note, action) => {
  const { error, response } = action;
  switch (action.type) {
    case GET_NOTE_REQUEST:
      return { ...state, isFetch: true };
    case GET_NOTE_SUCCESS:
      return { ...state, error: null, isFetch: false, list: response };
    case GET_NOTE_FAILURE:
      return { ...state, isFetch: false, error };
    case CREATE_NOTE_REQUEST:
      return { ...state, isCreating: true };
    case CREATE_NOTE_SUCCESS:
      return { ...state, isCreating: false, error: null, list: [...state.list, response] };
    case CREATE_NOTE_FAILURE:
      return { ...state, isCreating: false, error };
    case REMOVE_NOTE_REQUEST:
      return { ...state, isDelete: true };
    case REMOVE_NOTE_SUCCESS:
      return { ...state,
        isDelete: false,
        error: null,
        list: state.list.filter(value => value.id !== response.id),
      };
    case REMOVE_NOTE_FAILURE:
      return { ...state, isDelete: false, error };
    case EDIT_NOTE_REQUEST:
      return { ...state, isEdit: true };
    case EDIT_NOTE_SUCCESS:
      return { ...state,
        isEdit: false,
        error: null,
        idEdit: null,
        list: editNote(state.list, response) };
    case EDIT_NOTE_FAILURE:
      return { ...state, isEdit: false, error };

    case 'EDIT_NAME_NOTE':
      if (state.idEdit !== action.id) {
        return { ...state, idEdit: action.id };
      }
      return { ...state, idEdit: null };


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
        return leftMove ? [...p, v, dragCard] : [...p, dragCard, v];
      }, []);
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
    /*case 'REMOVE_NOTE_FOLDER':
      return state.filter(v => v.folder !== action.folder);*/
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

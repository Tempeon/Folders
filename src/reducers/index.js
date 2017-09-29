import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import todos from './todos';
import noteTodos from './note_todos';
import searchState from './searchState';
import Tags from './Tags';

const todoApp = combineReducers({
  todos,
  noteTodos,
  searchState,
  Tags,
  form: formReducer,
});

export default todoApp;

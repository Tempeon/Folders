import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import todos from './todos';
import noteTodos from './note_todos';
import searchState from './searchState';

const todoApp = combineReducers({
  todos,
  noteTodos,
  searchState,
  form: formReducer,
});

export default todoApp;

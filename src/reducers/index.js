import { combineReducers } from 'redux';
import todos from './todos';
import noteTodos from './note_todos';
import searchState from './searchState';

const todoApp = combineReducers({
  todos,
  noteTodos,
  searchState,
});

export default todoApp;

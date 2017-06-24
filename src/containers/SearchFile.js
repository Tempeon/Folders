import { connect } from 'react-redux';
import Search from '../components/Search';
import { searchFile } from '../action';
//import {getSearchList} from '../components/Selector';

const mapStateToProps = state => ({
  folders: state.todos,
  notes: state.noteTodos,
  stateSearch: getSearchList(state.searchState.typeSearch, state.searchState.text, state.todos, state.noteTodos),
});

const mapDispatch = dispatch => ({
  onSearchFile: (typeSearch, text) => {
    dispatch(searchFile(typeSearch, text));
  },
});
const SearchFile = connect(
    mapStateToProps,
    mapDispatch,
)(Search);

export default SearchFile;


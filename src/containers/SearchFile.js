import { connect } from 'react-redux';
import Search from '../components/Search';
import { searchFile } from '../action/Folders';
import { getSearchList } from '../Selector/Search';
import { search } from '../action/Search';

const mapStateToProps = state => ({
  /*folders: state.todos,
  notes: state.noteTodos,
  stateSearch: getSearchList(state.searchState, state.todos, state.noteTodos),*/
  stateSearch: state.searchState
});

const mapDispatch = dispatch => ({
  onSearchFile: (typeSearch, text) => {
    dispatch(search(typeSearch, text));
  },
});
const SearchFile = connect(
    mapStateToProps,
    mapDispatch,
)(Search);

export default SearchFile;


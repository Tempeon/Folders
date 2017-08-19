import { connect } from 'react-redux';
import Content from '../components/Content';
import { formContentNote } from '../action';

const mapStateToProps = state => ({
  content: state.noteTodos,
});

const mapDispatch = dispatch => ({
  onSaveContent: (text) => {
    dispatch(formContentNote(text));
  },
});

const ContentNote = connect(
    mapStateToProps,
    mapDispatch,
)(Content);

export default ContentNote;

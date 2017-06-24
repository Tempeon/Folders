import { connect } from 'react-redux';
import Content from '../components/Content';
import { editNote, newNameNoteContent, addTag } from '../action';

const mapStateToProps = state => ({
  content: state.noteTodos,
});

const mapDispatch = dispatch => ({
  onEditNote: (id, content) => {
    dispatch(editNote(id, content));
  },
  onNewNameNoteContent: (id, text) => {
    dispatch(newNameNoteContent(id, text));
  },
  onAddTag: (id, text) => {
    dispatch(addTag(id, text));
  },
});

const ContentNote = connect(
    mapStateToProps,
    mapDispatch,
)(Content);

export default ContentNote;

import { connect } from 'react-redux';
import Content from '../components/Content';
import { editNote, getNoteList } from '../action/Notes';
import { addTag, getTags, removeTags } from '../action/Tags';

const mapStateToProps = state => ({
  tags: state.Tags,
  content: state.noteTodos,
});

const mapDispatch = dispatch => ({
  onEditNote: (id, Name, Contents) => {
    dispatch(editNote(id, Name, Contents));
  },
  onAddTag: (Name, idParent) => {
    dispatch(addTag(Name, idParent));
  },
  onGetTags: (idNote) => {
    dispatch(getTags(idNote));
  },
  removeTags: (idTag) => {
    dispatch(removeTags(idTag));
  },
  onGetNoteList: (id) => {
    dispatch(getNoteList(id));
  },
});

const ContentNote = connect(
    mapStateToProps,
    mapDispatch,
)(Content);

export default ContentNote;

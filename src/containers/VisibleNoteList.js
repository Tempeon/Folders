import { connect } from 'react-redux';
import NoteList from '../components/NoteList';
import { removeNote, editNameNote, editNote, addNote, moveNote, getNoteList } from '../action/Notes';

const mapStateToProps = state => ({
  todos: state.noteTodos,
});

const DispatchToProps = dispatch => ({
  onGetNoteList: (id) => {
    dispatch(getNoteList(id));
  },
  onRemoveNote: (id) => {
    dispatch(removeNote(id));
  },
  onEditName: (id, content) => {
    dispatch(editNameNote(id, content));
  },
  editNote: (id, Name, idFolder) => {
    dispatch(editNote(id, Name, idFolder));
  },
  onAddNote: (text, folder) => {
    dispatch(addNote(text, folder));
  },
  onMoveNote: (dragIndex, hoverIndex, sideShift) => {
    dispatch(moveNote(dragIndex, hoverIndex, sideShift));
  },
});

const VisibleNote = connect(
  mapStateToProps,
  DispatchToProps,
)(NoteList);

export default VisibleNote;

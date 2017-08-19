import { connect } from 'react-redux';
import NoteList from '../components/NoteList';
import { removeNote, editNameNote, newNameNote, addNote, moveNote } from '../action';

const mapStateToProps = state => ({
  todos: state.noteTodos,
});

const DispatchToProps = dispatch => ({
  onRemoveNote: (id) => {
    dispatch(removeNote(id));
  },
  onEditName: (id, content) => {
    dispatch(editNameNote(id, content));
  },
  onNewNameNote: (id, text) => {
    dispatch(newNameNote(id, text));
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

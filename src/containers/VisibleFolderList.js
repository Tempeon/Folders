import { connect } from 'react-redux';
import { removeFolder, editName, newNameFolder, removeNoteFolder, addSubFolder, addFolder, moveFolder, addNoteToFolder } from '../action';
import FolderList from '../components/FolderList';

const mapStateToProps = state => ({
  todos: state.todos,
    // note_todos: state.note_todos,
});

const mapDispatchToProps = dispatch => ({
  onRemoveFolder: (id, folder) => {
    dispatch(removeFolder(id));
    dispatch(removeNoteFolder(folder));
  },
  onEditName: (id) => {
    dispatch(editName(id));
  },
  onNewNameFolder: (id, text) => {
    dispatch(newNameFolder(id, text));
  },
  onAddSubFolder: (idParent, text) => {
    dispatch(addSubFolder(idParent, text));
  },
  onAddFolder: (text) => {
    dispatch(addFolder(text));
  },
  onMoveFolder: (dragId, hoverId, sideShift, idParent) => {
    dispatch(moveFolder(dragId, hoverId, sideShift, idParent));
  },
  onAddNoteToFolder: (noteId, folderId) => {
    dispatch(addNoteToFolder(noteId, folderId));
  },
});

const VisibleFolder = connect(
  mapStateToProps,
  mapDispatchToProps,
)(FolderList);

export default VisibleFolder;

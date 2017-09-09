import { connect } from 'react-redux';
import { removeFolder, editName, newNameFolder, removeNoteFolder, addSubFolder, addFolder, moveFolder, addNoteToFolder, getFoldersList } from '../action/Folders';
import FolderList from '../components/FolderList';

const mapStateToProps = state => ({
  todos: state.todos,
});

const mapDispatchToProps = dispatch => ({
  onRemoveFolder: (id) => {
    dispatch(removeFolder(id));
  },
  onEditName: (id) => {
    dispatch(editName(id));
  },
  onNewNameFolder: (id, text, idParent) => {
    dispatch(newNameFolder(id, text, idParent));
  },
  onAddSubFolder: (idParent, text) => {
    dispatch(addSubFolder(idParent, text));
  },
  onAddFolder: (text, idParent) => {
    dispatch(addFolder(text, idParent));
  },
  onMoveFolder: (dragId, hoverId, sideShift, idParent) => {
    dispatch(moveFolder(dragId, hoverId, sideShift, idParent));
  },
  onAddNoteToFolder: (noteId, folderId) => {
    dispatch(addNoteToFolder(noteId, folderId));
  },
  onGetFoldersList: (idParent) => {
    dispatch(getFoldersList(idParent));
  },
});

const VisibleFolder = connect(
  mapStateToProps,
  mapDispatchToProps,
)(FolderList);

export default VisibleFolder;

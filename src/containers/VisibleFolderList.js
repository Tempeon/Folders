import { connect } from 'react-redux';
import { removeFolder, editName, newNameFolder, removeNoteFolder, addSubFolder, addFolder, moveFolder, addNoteToFolder, getFoldersList } from '../action/Folders';
import FolderList from '../components/FolderList';
import { FolderListState } from '../Selector/Folders';

const mapStateToProps = state => ({
  //todos: state.todos,
  todos: FolderListState(state.todos),
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
  onAddFolder: (...params) => {
    dispatch(addFolder(...params));
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
/*const mapDispatchToProps = dispatch => ({
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
  onAddFolder: (...params) => {
    dispatch(addFolder(...params));
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
});*/

const VisibleFolder = connect(
  mapStateToProps,
  mapDispatchToProps,
)(FolderList);

export default VisibleFolder;


//bindActionCreator
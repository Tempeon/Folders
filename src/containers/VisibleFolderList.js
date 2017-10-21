import { connect } from 'react-redux';
import { removeFolder,
         editName,
         newNameFolder,
         addFolder,
         moveFolder,
         addNoteToFolder,
         getFoldersList,
         idParentCreateSubFolder,
         editParent,
         editIdFolder,
       } from '../action/Folders';
import FolderList from '../components/FolderList';
import { FolderListState } from '../Selector/Folders';

const mapStateToProps = state => ({
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
  onIdParentCreateSub: (id) => {
    dispatch(idParentCreateSubFolder(id));
  },
  onEditParent: (id, idParent) => {
    dispatch(editParent(id, idParent));
  },
  onEditIdFolder: (id, idFolder) => {
    dispatch(editIdFolder(id, idFolder));
  },
});

const VisibleFolder = connect(
  mapStateToProps,
  mapDispatchToProps,
)(FolderList);

export default VisibleFolder;


//bindActionCreator
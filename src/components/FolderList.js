import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import IconCreateFolder from 'material-ui/svg-icons/file/create-new-folder';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import FormFolderName from './FormFolderName';
import Folder from './Folder';

const style = {
  display: 'flex',
  alignItems: 'center',
};

class FolderList extends Component {
  constructor(props) {
    super(props);
    this.state = { nameFolder: '', addFolder: false };
    this.handleChange = this.handleChange.bind(this);
    this.showFormAddFolder = this.showFormAddFolder.bind(this);
    this.addFolder = this.addFolder.bind(this);
    this.moveFolder = this.moveFolder.bind(this);
    this.addNoteFolder = this.addNoteFolder.bind(this);
  }

  handleChange(event) {
    this.setState({ nameFolder: event.target.value });
  }
  showFormAddFolder() {
    this.setState({ addFolder: !this.state.addFolder });
  }
  addFolder(value) {
    const { onAddFolder } = this.props;
    onAddFolder(value.folderName);
    this.showFormAddFolder();
  }
  moveFolder(dragId, hoverId, sideShift, idParent) {
    const { onMoveFolder } = this.props;
    onMoveFolder(dragId, hoverId, sideShift, idParent);
  }
  addNoteFolder(folderId, noteId) {
    const { onAddNoteToFolder } = this.props;
    onAddNoteToFolder(noteId, folderId);
  }
  render() {
    const { todos,
      onRemoveFolder,
      onEditName,
      onNewNameFolder,
      match,
      onAddSubFolder,

  } = this.props;
    const tod = todos.filter(v => v.idParent === null);
    return (
      <div>
        <div style={{ ...style }}>
          <h3>Folders</h3>
          <IconButton
            onClick={() => this.showFormAddFolder()}
            tooltip="AddFolder"
          >
            <IconCreateFolder />
          </IconButton>
        </div>
        {this.state.addFolder && (
          <FormFolderName
            initialValues={{ nameForm: 'addFolder' }}
            rename={false}
            onSubmit={this.addFolder}
            cancel={() => this.showFormAddFolder()}
          />
        )}

        <ul>
          {tod.map((todo, i) => (

            <Folder
              index={i}
              id={todo.id}
              key={todo.id}
              todo={todo}
              onRemoveFolder={onRemoveFolder}
              onEditName={onEditName}
              onNewNameFolder={onNewNameFolder}
              match={match}
              moveFolder={this.moveFolder}
              onAddSubFolder={onAddSubFolder}
              todos={todos}
              addNoteFolder={this.addNoteFolder}
            />
          ))}
        </ul>

      </div>
    );
  }
}

FolderList.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
  onAddFolder: PropTypes.func.isRequired,
  onAddNoteToFolder: PropTypes.func.isRequired,
  onAddSubFolder: PropTypes.func.isRequired,
  onEditName: PropTypes.func.isRequired,
  onMoveFolder: PropTypes.func.isRequired,
  onNewNameFolder: PropTypes.func.isRequired,
  onRemoveFolder: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(PropTypes.shape({
    edit: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired).isRequired,
};
export default FolderList;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import IconCreateFolder from 'material-ui/svg-icons/file/create-new-folder';
import IconCancel from 'material-ui/svg-icons/content/reply';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import FormFolderName from './FormFolderName';
import Folder from './Folder';

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
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
    this.goingBack = this.goingBack.bind(this);
  }

  componentWillMount() {
    const { onGetFoldersList } = this.props;
    onGetFoldersList(0);
  }

  componentWillUpdate() {

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
  goingBack() {
    const { history } = this.props;
    history.push('/Folder/');
  }
  render() {
    const { todos,
      onRemoveFolder,
      onEditName,
      onNewNameFolder,
      match,
      onAddFolder,
      width,
      onGetFoldersList,
  } = this.props;
    const tod = todos.list.filter(v => v.idParent === 0);
    return (
      <div style={{ width: `${width}` }}>
        <div style={{ ...style }}>
          {match.params.idFolder &&
          <IconButton onClick={() => this.goingBack()}>
            <IconCancel />
          </IconButton>
          }
          <h3>Folders</h3>
          <IconButton
            onClick={() => this.showFormAddFolder()}
            tooltip="AddFolder"
          >
            <IconCreateFolder />
          </IconButton>
        </div>
        {this.state.addFolder && (
          <div style={{ ...style }}>
            <FormFolderName
              initialValues={{ nameForm: 'addFolder' }}
              rename={false}
              onSubmit={this.addFolder}
              cancel={() => this.showFormAddFolder()}
            />
          </div>
        )}
        <ReactCSSTransitionGroup
          style={{ listStyleType: 'none' }}
          component="ul"
          transitionName="fade"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          {tod.map((todo, i) => (
            <li key={todo.id}>
              <Folder
                index={i}
                id={todo.id}
                todo={todo}
                onRemoveFolder={onRemoveFolder}
                onEditName={onEditName}
                onNewNameFolder={onNewNameFolder}
                match={match}
                moveFolder={this.moveFolder}
                onAddFolder={onAddFolder}
                todos={todos}
                addNoteFolder={this.addNoteFolder}
                onGetFoldersList={onGetFoldersList}
              />
            </li>
          ))}
        </ReactCSSTransitionGroup>
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
  onEditName: PropTypes.func.isRequired,
  onMoveFolder: PropTypes.func.isRequired,
  onNewNameFolder: PropTypes.func.isRequired,
  onRemoveFolder: PropTypes.func.isRequired,
  onGetFoldersList: PropTypes.func.isRequired,
  /*todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    Name: PropTypes.string.isRequired,
  }).isRequired).isRequired,*/

};
export default FolderList;

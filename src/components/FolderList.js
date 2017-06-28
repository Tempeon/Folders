import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormFolderName from './FormFolderName';
import Folder from './Folder';


class FolderList extends Component {
  constructor(props) {
    super(props);
    this.state = { nameFolder: '', addFolder: false };
    this.handleChange = this.handleChange.bind(this);
    this.showFormAddFolder = this.showFormAddFolder.bind(this);
    this.addFolder = this.addFolder.bind(this);
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
        <h3>Folders <span role="presentation" onClick={() => this.showFormAddFolder()}>+</span></h3>
        {this.state.addFolder && (
          <FormFolderName onSubmit={this.addFolder} />
        )}
        <ul>
          {tod.map(todo =>
          (<Folder
            key={todo.id}
            todo={todo}
            onRemoveFolder={onRemoveFolder}
            onEditName={onEditName}
            onNewNameFolder={onNewNameFolder}
            match={match}
            onAddSubFolder={onAddSubFolder}
            todos={todos}
          />))}
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
  onAddSubFolder: PropTypes.func.isRequired,
  onEditName: PropTypes.func.isRequired,
  onNewNameFolder: PropTypes.func.isRequired,
  onRemoveFolder: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(PropTypes.shape({
    edit: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired).isRequired,
};
export default FolderList;

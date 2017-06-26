import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import Folder from './Folder';

/* const FolderList = ({ todos,
                      onRemoveFolder,
                      onEditName,
                      onNewNameFolder,
                      match,
                      onAddSubFolder,
                    }) => {*/
class FolderList extends Component {
  constructor(props) {
    super(props);
    this.state = { nameFolder: '', addFolder: false };
    this.handleChange = this.handleChange.bind(this);
    this.showFormAddFolder = this.showFormAddFolder.bind(this);
  }

  handleChange(event) {
    this.setState({ nameFolder: event.target.value,});
  }
  showFormAddFolder() {
    this.setState({ addFolder: !this.state.addFolder });
  }
  addFolder() {
    const { onAddFolder } = this.props
    onAddFolder(this.state.nameFolder)
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
    console.log(Field, reduxForm)
    const tod = todos.filter(v => v.subfoledr !== [] && v.idParent === null);
    return (
      <div>
        <h3>Folders <span role="presentation" onClick={() => this.showFormAddFolder()}>+</span></h3>
        {this.state.addFolder && (
          <div>
            <input type="text" onChange={this.handleChange} />
            <button onClick={() => this.addFolder()}>Add</button>
          </div>
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

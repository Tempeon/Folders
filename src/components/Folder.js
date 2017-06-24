import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Folder extends Component {
  constructor(props) {
    super(props);
    this.state = { Name: '', addSub: false };
    this.handleChange = this.handleChange.bind(this);
    this.startAddSub = this.startAddSub.bind(this);
  }
  handleChange(event) {
    this.setState({ Name: event.target.value });
  }
  startAddSub(todo) {
    const { onAddSubFolder } = this.props;
    this.setState({ addSub: !this.state.addSub });
    if (this.state.addSub === true && todo !== undefined) {
      onAddSubFolder(todo.id, this.state.Name);
    }
  }

  render() {
    const { todo,
            todos,
            onRemoveFolder,
            onEditName,
            onNewNameFolder,
            match,
            onAddSubFolder,
          } = this.props;
    const tod = todos.filter(v => todo.id === v.idParent);
    if (!todo.edit) {
      return (
        <div>
          <li>
            <Link to={`${match.url}${todo.id}`}>{todo.text}</Link>
            <span role="presentation" onClick={() => this.startAddSub(todo)}>/Add</span>
            <span role="presentation" onClick={() => onRemoveFolder(todo.id, todo.text)}>/DEL/</span>
            <span role="presentation" onClick={() => onEditName(todo.id)}>Rename/ </span>
          </li>
          {this.state.addSub && (
            <div>
              <input type="text" onChange={this.handleChange} />
              <span role="presentation" onClick={() => { this.startAddSub(todo); }}> /OK/ </span>
              <span role="presentation" onClick={() => this.startAddSub()}> Cancel</span>
            </div>
          )}
          {tod && (
            <ul>
              {tod.map(v => (
                <Folder
                  key={v.id}
                  todo={v}
                  onRemoveFolder={onRemoveFolder}
                  onEditName={onEditName}
                  onNewNameFolder={onNewNameFolder}
                  match={match}
                  onAddSubFolder={onAddSubFolder}
                  todos={todos}
                />
              ))}
            </ul>
          )}
        </div>
      );
    }
    return (
      <div>
        <input type="text" onChange={this.handleChange} />
        <span role="presentation" onClick={() => onNewNameFolder(todo.id, this.state.Name)}>/OK/</span>
        <span role="presentation" onClick={() => onEditName(todo.id)}>Cancel/</span>
      </div>
    );
  }
}

Folder.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
  onAddSubFolder: PropTypes.func.isRequired,
  onEditName: PropTypes.func.isRequired,
  onNewNameFolder: PropTypes.func.isRequired,
  onRemoveFolder: PropTypes.func.isRequired,
  todo: PropTypes.shape({
    edit: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    idParent: PropTypes.oneOf(PropTypes.null, PropTypes.number).isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  todos: PropTypes.arrayOf(PropTypes.shape({
    edit: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired).isRequired,
};

export default Folder;


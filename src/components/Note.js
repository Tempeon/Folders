import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = { newName: '' };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({ newName: event.target.value });
  }
  render() {
    const { todo, match, onRemoveNote, onEditName, onNewNameNote } = this.props;
    if (!todo.edit) {
      return (
        <div>
          <Link to={`${match.url}/${todo.id}`}>{todo.text}</Link>
          <Link to={`${match.url}`} onClick={() => onRemoveNote(todo.id)}>/DEL</Link>
          <span role="presentation" onClick={() => onEditName(todo.id)}>/EDIT/</span>
        </div>
      );
    }

    return (
      <div>
        <input type="text" onChange={this.handleChange} />
        <span role="presentation" onClick={() => onNewNameNote(todo.id, this.state.newName)}>/OK/</span>
        <span role="presentation" onClick={() => onEditName()}>Cancel/</span>
      </div>
    );
  }
}

Note.propTypes = {
  todo: PropTypes.shape({
    content: PropTypes.string.isRequired,
    edit: PropTypes.bool.isRequired,
    folder: PropTypes.string.isRequired, // Edit string => number
    id: PropTypes.number.isRequired,
    tegs: PropTypes.arrayOf.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      idFolder: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onRemoveNote: PropTypes.func.isRequired,
  onEditName: PropTypes.func.isRequired,
  onNewNameNote: PropTypes.func.isRequired,
};

export default Note;

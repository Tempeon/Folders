import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Note from './Note';

class NoteList extends Component {
  constructor(props) {
    super(props);
    this.state = { addNote: false, nameNote: '' };
    this.startAddNote = this.startAddNote.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  startAddNote() {
    this.setState({ addNote: !this.state.addNote });
  }
  handleChange(event) {
    this.setState({ nameNote: event.target.value });
  }
  render() {
    const { todos, match, onRemoveNote, onEditName, onNewNameNote, onAddNote } = this.props;
    const tod = todos.filter(v => v.folder === match.params.idFolder);
    return (
      <div>
        <div>
          <h3> Note <span role="presentation" onClick={() => this.startAddNote()}> + </span></h3>
          {this.state.addNote && (
            <div>
              <input type="text" onChange={this.handleChange} />
              <span role="presentation" onClick={() => { onAddNote(this.state.nameNote, match.params.idFolder); this.startAddNote(); }}> addNote </span>
            </div>
          )}
        </div>
        <div>
          {tod.map(todo =>
            (<Note
              onRemoveNote={onRemoveNote}
              key={todo.id}
              match={match}
              todo={todo}
              onEditName={onEditName}
              onNewNameNote={onNewNameNote}
            />),
          )}
        </div>
      </div>
    );
  }
}

NoteList.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
  onAddNote: PropTypes.func.isRequired,
  onEditName: PropTypes.func.isRequired,
  onNewNameNote: PropTypes.func.isRequired,
  onRemoveNote: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(PropTypes.shape({
    content: PropTypes.string.isRequired,
    edit: PropTypes.bool.isRequired,
    folder: PropTypes.string.isRequired, // /string? number?
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired).isRequired,
};

export default NoteList;

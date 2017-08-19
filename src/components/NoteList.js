import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import IconAddFile from 'material-ui/svg-icons/action/note-add';
import IconCancel from 'material-ui/svg-icons/content/reply';
import FormNoteName from './FormNoteName';
import Note from './Note';

const styleHeadNote = {
  display: 'flex',
  alignItems: 'center',
};

const styleContent = {
  display: 'flex',
  flexWrap: 'wrap',
};
class NoteList extends Component {
  constructor(props) {
    super(props);
    this.state = { addNote: false, nameNote: '' };
    this.startAddNote = this.startAddNote.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addNote = this.addNote.bind(this);
    this.moveNote = this.moveNote.bind(this);
    this.remove = this.remove.bind(this);
  }

  startAddNote() {
    this.setState({ addNote: !this.state.addNote });
  }
  handleChange(event) {
    this.setState({ nameNote: event.target.value });
  }
  addNote(value) {
    const { onAddNote, match } = this.props;
    onAddNote(value.noteName, parseInt(match.params.idFolder, 10));
    this.startAddNote();
  }
  moveNote(dragIndex, hoverIndex, sideShift) {
    const { onMoveNote } = this.props;
    onMoveNote(dragIndex, hoverIndex, sideShift);
  }
  remove() {
    const { match, history } = this.props
    history.push(`/${match.params.idFolder}`);
  }

  render() {
    const { todos, match, onRemoveNote, onEditName, onNewNameNote } = this.props;
    const tod = todos.filter(v => v.folder === parseInt(match.params.idFolder, 10));
    return (
      <div >
        <div style={styleHeadNote}>
          <IconButton onClick={()=> this.remove()}>
            <IconCancel />
          </IconButton>
          <h3> Note </h3>
          <IconButton
            onClick={() => this.startAddNote()}
            tooltip="Add note"
          >
            <IconAddFile />
          </IconButton>
        </div>
        {this.state.addNote && (
        <FormNoteName
          onSubmit={this.addNote}
          initialValues={{ noteName: '' }}
          cancel={() => this.startAddNote()}
        />
          )}

        <div style={styleContent} >
          {tod.map((todo, i) => (
            <Note
              onRemoveNote={onRemoveNote}
              key={todo.id}
              index={i}
              id={todo.id}
              match={match}
              todo={todo}
              onEditName={onEditName}
              onNewNameNote={onNewNameNote}
              moveNote={this.moveNote}
              tod={tod}
              type="Note"
            />
            ))}
        </div>
        <br />
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
  onMoveNote: PropTypes.func.isRequired,
  onNewNameNote: PropTypes.func.isRequired,
  onRemoveNote: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(PropTypes.shape({
    content: PropTypes.string.isRequired,
    edit: PropTypes.bool.isRequired,
    folder: PropTypes.number.isRequired, // /string? number?
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired).isRequired,
};


export default NoteList;

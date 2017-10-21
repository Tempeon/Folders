import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import IconAddFile from 'material-ui/svg-icons/action/note-add';
import IconCancel from 'material-ui/svg-icons/content/reply';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import FormNoteName from './FormNoteName';
import Note from './Note';

const styleHeadNote = {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  marginLeft: '60px',

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

  componentWillMount() {
    const { onGetNoteList, match } = this.props;
    onGetNoteList(match.params.idFolder);
  }
  componentDidUpdate(prevProps) {
    const { onGetNoteList, match } = this.props;
    if (prevProps.match.params.idFolder !== match.params.idFolder) {
      onGetNoteList(match.params.idFolder);
    }
  }

  /* componentWillUpdate(nextProps, prevProps) {
    const { onGetNoteList, match } = this.props;
    if (nextProps.match.params.idFolder !== match.params.idFolder) {
      onGetNoteList(match.params.idFolder);
    }
  }*/
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
    const { match, history } = this.props;
    history.push(`/Folder/${match.params.idFolder}`);
  }

  render() {
    const { todos, match, onRemoveNote, onEditName, renameNote, width } = this.props;
    const tod = todos.list.filter(v => v.idFolder === parseInt(match.params.idFolder, 10));
    return (
      <div style={{ width: `${width}`,   padding: '0px', margin: '0px'}}>
        <div style={{ ...styleHeadNote, }}>
          {match.params.idNote &&
          <IconButton onClick={() => this.remove()}>
            <IconCancel />
          </IconButton>
          }
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
          margin="50px"
          onSubmit={this.addNote}
          initialValues={{ noteName: '' }}
          cancel={() => this.startAddNote()}
        />
          )}
        <div >
          <ReactCSSTransitionGroup
            component="ul"
            style={{ listStyleType: 'none' }}
            transitionName="fade"
            transitionEnterTimeout={1000}
            transitionLeaveTimeout={1000}
          >
            {tod.map((todo, i) => (
              <li key={todo.id}>
                <Note
                  onRemoveNote={onRemoveNote}
                  index={i}
                  id={todo.id}
                  match={match}
                  todo={todo}
                  onEditName={onEditName}
                  renameNote={renameNote}
                  moveNote={this.moveNote}
                  tod={tod}
                  type="Note"
                  idEdit={todos.idEdit}
                />
              </li>
              ))}
          </ReactCSSTransitionGroup>
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
  renameNote: PropTypes.func.isRequired,
  onRemoveNote: PropTypes.func.isRequired,
  onGetNoteList: PropTypes.func.isRequired,
  /* todos: PropTypes.arrayOf(PropTypes.shape({
    content: PropTypes.string.isRequired,
    edit: PropTypes.bool.isRequired,
    folder: PropTypes.number.isRequired, // /string? number?
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired).isRequired,*/
};


export default NoteList;

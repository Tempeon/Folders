import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import flow from 'lodash/flow';
import { DragSource, DropTarget } from 'react-dnd';
import IconButton from 'material-ui/IconButton';
import IconDelete from 'material-ui/svg-icons/action/delete-forever';
import IconEdit from 'material-ui/svg-icons/content/create';
import FormNoteName from './FormNoteName';

const removeStyle = {
  position: 'absolute',
  top: '-25px',
  right: '-25px',
};

const style = {
  position: 'relative',
  border: '1px solid gray',
  backgroundColor: 'white',
  cursor: 'move',
  display: 'flex',
  width: '200px',
  height: '60px',
  float: 'left',
  flexWrap: 'wrap',
  paddingLeft: '10px',
  marginBottom: '.5rem',
  marginLeft: '.5rem',
  alignItems: 'center',
  justifyContent: 'space-between',

};
const NoteSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index,
      type: props.type,
    };
  },
};
const NoteTarget = {
  hover(props, monitor) {
    //const dragId = monitor.getItem().id;
    const dragId = monitor.getItem().index;
   // const hoverId = props.id;
    const hoverId = props.index;
    if (dragId === hoverId) {
      return;
    }
    props.moveNote(dragId, hoverId);
    monitor.getItem().index = hoverId;
  },
};


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
    const { todo,
            match,
            onRemoveNote,
            onEditName,
            renameNote,
            isDragging,
            connectDragSource,
            connectDropTarget,
            idEdit,
          } = this.props;
    const opacity = isDragging ? 0 : 1;
    if (idEdit !== todo.id) {
      return connectDragSource(connectDropTarget(
        <div style={{ ...style, opacity }}>
          <NavLink to={`/Folder/${match.params.idFolder}/Note/${todo.id}`}>{todo.Name}</NavLink>
          <div>
            <IconButton style={removeStyle} >
              <IconDelete onClick={() => onRemoveNote(todo.id)} />
            </IconButton>
            <IconButton>
              <IconEdit onClick={() => onEditName(todo.id)} />
            </IconButton>
          </div>
        </div>,
      ));
    }
    return (
      <div style={{ ...style, paddingLeft: '10px' }}>
        <FormNoteName
          rename
          onSubmit={value => renameNote(todo.id, value.noteName, todo.idFolder)}
          initialValues={{ noteName: todo.Name }}
          cancel={() => onEditName(todo.id)}
        />
      </div>
    );
  }
}

Note.propTypes = {
  todo: PropTypes.shape({
    content: PropTypes.string.isRequired,
    edit: PropTypes.bool.isRequired,
    folder: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    tags: PropTypes.arrayOf.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      idFolder: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onRemoveNote: PropTypes.func.isRequired,
  onEditName: PropTypes.func.isRequired,
  renameNote: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
};


export default flow(
  DropTarget('Note', NoteTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
  })),
  DragSource('Note', NoteSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  })),
)(Note);

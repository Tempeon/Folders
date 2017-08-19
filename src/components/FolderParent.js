import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import flow from 'lodash/flow';
import IconButton from 'material-ui/IconButton';
import IconAdd from 'material-ui/svg-icons/file/create-new-folder';
import IconDelete from 'material-ui/svg-icons/action/delete-forever';
import IconEdit from 'material-ui/svg-icons/content/create';

import { DragSource, DropTarget } from 'react-dnd';
import FormFolderName from './FormFolderName';

const style = {
  border: '1px dashed gray',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move',
  width: 320,
  flexWrap: 'wrap',
  paddingLeft: '10px',
};

const FolderSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index,
    };
  },
};

const FolderTarget = {
  drop(props, monitor) {
    if (monitor.getItem().type !== 'Note') { return; }
    props.addNoteFolder(props.todo.id, monitor.getItem().id);
  },
  hover(props, monitor) {
    const dragId = monitor.getItem().id;
    const hoverId = props.id;
    const idParent = props.todo.idParent;
    if (dragId === hoverId || monitor.getItem().type === 'Note' || dragId === idParent) {
      return;
    }
    props.moveFolder(dragId, hoverId, 'bottom', idParent);
    monitor.getItem().index = hoverId;
  },
};

class FolderParent extends Component {
  constructor(props) {
    super(props);
    this.state = { addSub: false };
    this.addSubFolder = this.addSubFolder.bind(this);
    this.stateAddSubFolder = this.stateAddSubFolder.bind(this);
  }

  stateAddSubFolder() {
    this.setState({ addSub: !this.state.addSub });
  }
  addSubFolder(todo, value) {
    const { onAddSubFolder } = this.props;
    onAddSubFolder(todo.id, value.folderName);
    this.stateAddSubFolder();
  }
  render() {
    const { todo,
            connectDropTarget,
            connectDragSource,
            match,
            onRemoveFolder,
            onEditName,
            onNewNameFolder,
            isDragging,
          } = this.props;
    const opacity = isDragging ? 0 : 1;
    if (!todo.edit) {
      return connectDragSource(connectDropTarget(
        <div style={{ ...style, opacity }}>
          <Link to={`/${todo.id}`}>{todo.text}</Link>
          <div>
            <IconButton tooltip="sdf">
              <IconAdd onClick={() => this.stateAddSubFolder(todo)} />
            </IconButton>
            <IconButton>
              <IconDelete onClick={() => onRemoveFolder(todo.id, todo.text)} />
            </IconButton >
            <IconButton>
              <IconEdit onClick={() => onEditName(todo.id)} />
            </IconButton>
          </div>
          {this.state.addSub && (
            <FormFolderName
              initialValues={{ nameForm: 'addSubFolder' }}
              rename={false}
              onSubmit={value => this.addSubFolder(todo, value)}
              cancel={() => this.stateAddSubFolder()}
            />
          )}
        </div>,
      ));
    }
    return (
      <div style={{ ...style }}>
        <FormFolderName
          initialValues={{ folderName: todo.text, nameForm: todo.text }}
          onSubmit={value => onNewNameFolder(todo.id, value.folderName)}
          rename
          cancel={() => onEditName(todo.id)}
        />
      </div>
    );
  }
}

FolderParent.propTypes = {
  todo: PropTypes.shape({
    edit: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    idParent: PropTypes.oneOf(PropTypes.null, PropTypes.number).isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
  onAddSubFolder: PropTypes.func.isRequired,
  onNewNameFolder: PropTypes.func.isRequired,
  onEditName: PropTypes.func.isRequired,
  onRemoveFolder: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
};

export default flow(
  DropTarget(['Note', 'Folder'], FolderTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
  })),
  DragSource('Folder', FolderSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  })),
)(FolderParent);

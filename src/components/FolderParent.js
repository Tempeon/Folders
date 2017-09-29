import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import flow from 'lodash/flow';
import IconButton from 'material-ui/IconButton';
import IconAdd from 'material-ui/svg-icons/file/create-new-folder';
import IconDelete from 'material-ui/svg-icons/action/delete-forever';
import EmptyFolder from 'material-ui/svg-icons/file/folder-open';
import IconEdit from 'material-ui/svg-icons/content/create';

import { DragSource, DropTarget } from 'react-dnd';
import FormFolderName from './FormFolderName';

const style = {
  // border: '1px dashed gray',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move',
  flexWrap: 'wrap',
  paddingLeft: '10px',
  paddingRight: '10px',
  height: '40px',
};

const styleForm = {

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
    const dragId = monitor.getItem().index; // id or index
    const hoverId = props.index; // id OR index
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
    this.state = { addSub: false, showIcon: true, test: null };
    this.addSubFolder = this.addSubFolder.bind(this);
    this.stateAddSubFolder = this.stateAddSubFolder.bind(this);
    this.editName = this.editName.bind(this);
  }
  stateAddSubFolder() {
    this.setState({ addSub: !this.state.addSub });
  }
  addSubFolder(todo, value) {
    const { onAddFolder } = this.props;
    onAddFolder(value.folderName, todo.id, todo.idParent);
    this.stateAddSubFolder();
  }
  editName(todo, value) {
    const { onNewNameFolder, onEditName } = this.props;
    onNewNameFolder(todo.id, value.folderName);
    onEditName(todo.id);
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
            showSubFolders,
            idEdit
          } = this.props;
    const opacity = isDragging ? 0 : 1;
    if (idEdit !== todo.id) {
      return connectDragSource(connectDropTarget(
        <div>
          <div style={{ ...style, opacity }} /* onMouseMove={() => this.setState({ showIcon: true })} onMouseOut={() => this.setState({ showIcon: false })}*/>
            <IconButton>
              <EmptyFolder onClick={showSubFolders} />
            </IconButton>
            <Link style={{ flexGrow: '1' }} to={`/Folder/${todo.id}`}>{todo.Name}</Link>
            {this.state.showIcon && <div>
              <IconButton>
                <IconAdd onClick={() => this.stateAddSubFolder()} />
              </IconButton>
              <IconButton>
                <IconDelete onClick={() => onRemoveFolder(todo.id)} />
              </IconButton >
              <IconButton>
                <IconEdit onClick={() => onEditName(todo.id)} />
              </IconButton>
            </div>}
          </div>
          {this.state.addSub && (
            <FormFolderName
              rename={false}
              onSubmit={value => this.addSubFolder(todo, value)}
              cancel={() => this.stateAddSubFolder()}
            />
          )}
          <hr />
        </div>,
      ));
    }
    return (
      <div style={{ ...style }}>
        <FormFolderName
          initialValues={{ folderName: todo.Name  }}
          onSubmit={value => this.editName(todo, value)}
          rename
          cancel={() => onEditName(todo.id)}
        />
      </div>
    );
  }
}

FolderParent.propTypes = {
  /*todo: PropTypes.shape({
    edit: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    idParent: PropTypes.oneOf(PropTypes.null, PropTypes.number).isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,*/
  connectDropTarget: PropTypes.func.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
  onAddFolder: PropTypes.func.isRequired,
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

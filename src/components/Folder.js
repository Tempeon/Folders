import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import FolderParent from './FolderParent';

class Folder extends Component {
  constructor(props) {
    super(props);
    this.state = { Name: '', addSub: false };
    this.handleChange = this.handleChange.bind(this);
    this.addSubFolder = this.addSubFolder.bind(this);
    this.stateAddSubFolder = this.stateAddSubFolder.bind(this);
  }
  handleChange(event) {
    this.setState({ Name: event.target.value });
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
    const {
      todo,
      todos,
      onRemoveFolder,
      onEditName,
      onNewNameFolder,
      match,
      onAddSubFolder,
      isDragging,
      connectDragSource,
      connectDropTarget,
      addNoteFolder,
      moveFolder,
      index,
    } = this.props;
    const tod = todos.filter(v => todo.id === v.idParent);
    return (
      <div >
        <ReactCSSTransitionGroup
          transitionName="fade"
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          <FolderParent
            index={index}
            id={todo.id}
            key={todo.id}
            todo={todo}
            onEditName={onEditName}
            onRemoveFolder={onRemoveFolder}
            onNewNameFolder={onNewNameFolder}
            match={match}
            onAddSubFolder={onAddSubFolder}
            isDragging={isDragging}
            connectDragSource={connectDragSource}
            connectDropTarget={connectDropTarget}
            addNoteFolder={addNoteFolder}
            moveFolder={moveFolder}
          />
        </ReactCSSTransitionGroup>
        <ul style={{ listStyleType: 'none' }}>
          {tod && tod.map((v, i) => (
            <li key={v.id}>
              <Folder
                index={i}
                id={v.id}
                key={v.id}
                todo={v}
                onRemoveFolder={onRemoveFolder}
                onEditName={onEditName}
                onNewNameFolder={onNewNameFolder}
                match={match}
                onAddSubFolder={onAddSubFolder}
                todos={todos}
                isDraggin={isDragging}
                connectDragSource={connectDragSource}
                connectDropTarget={connectDropTarget}
                moveFolder={moveFolder}
              />
            </li>
        ))}
        </ul>
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

/* export default flow(
  DropTarget(['Note', 'Folder'], FolderTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
  })),
  DragSource('Folder', FolderSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  })),
)(Folder);*/

export default Folder;


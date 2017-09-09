import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import FolderParent from './FolderParent';

class Folder extends Component {
  constructor(props) {
    super(props);
    this.state = { Name: '', addSub: false, showSubFolder: false };
    this.handleChange = this.handleChange.bind(this);
    this.addSubFolder = this.addSubFolder.bind(this);
    this.stateAddSubFolder = this.stateAddSubFolder.bind(this);
    this.showSubFolders = this.showSubFolders.bind(this);
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
  showSubFolders(){
    const { onGetFoldersList, id } = this.props
    this.setState({showSubFolder: !this.state.showSubFolder});
    onGetFoldersList(id);
  }
  render() {
    const {
      todo,
      todos,
      onRemoveFolder,
      onEditName,
      onNewNameFolder,
      match,
      onAddFolder,
      addNoteFolder,
      moveFolder,
      index,
      onGetFoldersList,
    } = this.props;
    const tod = todos.list.filter(v => todo.id === v.idParent);
    return (
      <div>
        <FolderParent
          index={index}
          id={todo.id}
          key={todo.id}
          todo={todo}
          onEditName={onEditName}
          onRemoveFolder={onRemoveFolder}
          onNewNameFolder={onNewNameFolder}
          match={match}
          onAddFolder={onAddFolder}
          addNoteFolder={addNoteFolder}
          moveFolder={moveFolder}
          showSubFolders={() => this.showSubFolders()}
          idEdit={todos.idEdit}
        />
        <ul style={{ listStyleType: 'none' }}>
          <ReactCSSTransitionGroup
            transitionName="fade"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
          >
            {tod && this.state.showSubFolder && tod.map((v, i) => (
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
                  onAddFolder={onAddFolder}
                  todos={todos}
                  moveFolder={moveFolder}
                  showSubFolders={() => this.showSubFolders()}
                  onGetFoldersList={onGetFoldersList}
                />
              </li>
            ))}
          </ReactCSSTransitionGroup>
        </ul>
      </div>
    );
  }
}

Folder.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
  onAddFolder: PropTypes.func.isRequired,
  onEditName: PropTypes.func.isRequired,
  onNewNameFolder: PropTypes.func.isRequired,
  onRemoveFolder: PropTypes.func.isRequired,
  onGetFoldersList: PropTypes.func.isRequired,


  /*todo: PropTypes.shape({
    edit: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    idParent: PropTypes.oneOf(PropTypes.null, PropTypes.number).isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  todos: PropTypes.arrayOf(PropTypes.shape({
    edit: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired).isRequired,*/

};

export default Folder;


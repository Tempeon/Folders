import React from 'react';
import PropTypes from 'prop-types';
import Folder from './Folder';

const FolderList = ({ todos,
                      onRemoveFolder,
                      onEditName,
                      onNewNameFolder,
                      match,
                      onAddSubFolder,
                    }) => {
  const tod = todos.filter(v => v.subfoledr !== [] && v.idParent === null);
  return (
    <ul>
      {tod.map(todo =>
        (<Folder
          key={todo.id}
          todo={todo}
          onRemoveFolder={onRemoveFolder}
          onEditName={onEditName}
          onNewNameFolder={onNewNameFolder}
          match={match}
          onAddSubFolder={onAddSubFolder}
          todos={todos}
        />))}
    </ul>
  );
};

FolderList.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
  onAddSubFolder: PropTypes.func.isRequired,
  onEditName: PropTypes.func.isRequired,
  onNewNameFolder: PropTypes.func.isRequired,
  onRemoveFolder: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(PropTypes.shape({
    edit: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired).isRequired,
};
export default FolderList;

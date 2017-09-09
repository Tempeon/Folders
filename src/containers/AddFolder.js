import React from 'react';
import { connect } from 'react-redux';
import { addFolder } from '../action/Folders';

let AddFolder = ({ dispatch }) => {
  let input;
  return (
    <div>
      <form onSubmit={(e) => {
        e.preventDefault();
        if (!input.value.trim()) { return; }
        dispatch(addFolder(input.value));
        input.value = '';
      }}
      >
        <input ref={(node) => {
          input = node;
        }}
        />
        <button type="submit"> AddFolder </button>
      </form>
    </div>
  );
};
AddFolder = connect()(AddFolder);

export default AddFolder;

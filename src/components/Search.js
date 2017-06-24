import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = { name: '', type: '' };
    this.findName = this.findName.bind(this);
    this.setType = this.setType.bind(this);
  }
  setType(value) {
    this.setState({ type: value });
  }
  findName(event) {
    this.setState({ name: event.target.value });
  }
  render() {
    const { onSearchFile, stateSearch } = this.props;
    return (
      <div>
        <span><input type="radio" name="typeSearch" value="Name" onClick={() => this.setType('Name')} />Name</span>
        <span><input type="radio" name="typeSearch" value="Tag" onClick={() => this.setType('Tag')} />Tag</span>
        <span><input type="radio" name="typeSearch" value="All" onClick={() => this.setType('All')} />All</span><br />
        <input type="text" onChange={value => this.findName(value)} />
        <button onClick={() => onSearchFile(this.state.type,
                                            this.state.name,
                                            )}
        >Find</button>
        {stateSearch.types === 'Name' && (
          <div>
            <h3>Folders:</h3>
            <ul>
              {stateSearch.folder.map(v => (
                <li key={v.id}>
                  <Link to={`/${v.id}`} >{v.text}</Link>
                </li>
              ))}
            </ul>
            <h3>Notes: </h3>
            <ul>
              {stateSearch.file.map(v => (
                <li key={v.id}>
                  <Link to={`/${v.folder}/${v.id}`} >{v.text} </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        {stateSearch.types === 'Tag' && (
          <div>
            <h3>Tag:</h3>
            <ul>
              {stateSearch.tag.map(v => (
                <li key={v.id}>
                  <Link to={`/${v.folder}/${v.id}`} >{v.text}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        {stateSearch.types === 'All' && (
        <div>
          <h3>Folders:</h3>
          <ul>
            {stateSearch.folder.map(v => (
              <li key={v.id}>
                <Link to={`/${v.id}`} >{v.text}</Link>
              </li>
                    ))}
          </ul>
          <h3>Notes: </h3>
          <ul>
            {stateSearch.file.map(v => (
              <li key={v.id}>
                <Link to={`/${v.folder}/${v.id}`} >{v.text} </Link>
              </li>
                    ))}
          </ul>
          <h3>Tag:</h3>
          <ul>
            {stateSearch.tag.map(v => (
              <li key={v.id}>
                <Link to={`/${v.folder}/${v.id}`} >{v.text}</Link>
              </li>
             ))}
          </ul>
        </div>
        )}
      </div>
    );
  }
}
Search.propTypes = {
  onSearchFile: PropTypes.func.isRequired,
  stateSearch: PropTypes.shape({
    file: PropTypes.array.isRequired,
    folder: PropTypes.array.isRequired,
    tag: PropTypes.array.isRequired,
    types: PropTypes.string.isRequired,
  }).isRequired,
};
export default Search;

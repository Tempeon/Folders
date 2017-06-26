import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = { name: '', type: '', showFormSearch: false };
    this.findName = this.findName.bind(this);
    this.setType = this.setType.bind(this);
    this.showSearch = this.showSearch.bind(this);
  }
  setType(value) {
    this.setState({ type: value });
  }
  findName(event) {
    this.setState({ name: event.target.value });
  }
  showSearch() {
    this.setState({ showFormSearch: !this.state.showFormSearch });
  }
  render() {
    const { onSearchFile, stateSearch } = this.props;
    return (
      <div>
        <h3><span role="presentation" onClick={() => this.showSearch()}>Search</span></h3>
        {this.state.showFormSearch && (
          <div>
            <span><input type="radio" name="typeSearch" value="Name" onClick={() => this.setType('Name')} />Name</span>
            <span><input type="radio" name="typeSearch" value="Tag" onClick={() => this.setType('Tag')} />Tag</span>
            <span><input type="radio" name="typeSearch" value="All" onClick={() => this.setType('All')} />All</span><br />
            <input type="text" onChange={value => this.findName(value)} />
            <button onClick={() => onSearchFile(this.state.type,
                                                this.state.name,
                                                )}
            >Find</button>
            {stateSearch.folder.length !== 0 && (
              <div>
                <h3>Folders:</h3>
                <ul>
                  {stateSearch.folder.map(v => (
                    <li key={v.id}>
                      <Link to={`/${v.id}`} >{v.text}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {stateSearch.file.length !== 0 && (
              <div>
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
            {stateSearch.tag.length !== 0 && (
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
  }).isRequired,
};
export default Search;

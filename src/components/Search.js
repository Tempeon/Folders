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
    const { onSearchFile, notes, folders } = this.props;
    return (
      <div>
        <span><input type="radio" name="typeSearch" value="Name" onClick={() => this.setType('Name')} />Name</span>
        <span><input type="radio" name="typeSearch" value="Tag" onClick={() => this.setType('Tag')} />Tag</span>
        <span><input type="radio" name="typeSearch" value="All" onClick={() => this.setType('All')} />All</span><br />
        <input type="text" onChange={value => this.findName(value)} />
        <button onClick={() => onSearchFile(this.state.type,
                                            this.state.name,
                                            notes,
                                            folders)}
        >Find</button>

      </div>
    );
  }
}
Search.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.shape({
    content: PropTypes.string.isRequired,
    edit: PropTypes.bool.isRequired,
    folder: PropTypes.string.isRequired, // /string? number?
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  onSearchFile: PropTypes.func.isRequired,

};
export default Search;


/*<ul>
    {stateSearch.map(v => (
        <li key={v.id}>
            <Link to={`${v.folder ? `/${v.folder}` : ''}/${v.id}`} >{v.text}</Link>{v.folder ? ' file' : ' folder'}
        </li>
    ))}
</ul>*/
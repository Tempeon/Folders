import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import IconButton from 'material-ui/IconButton';
import IconSearch from 'material-ui/svg-icons/action/search';
import SearchForm from './SearchForm';

const styleHeadSearch = {
  display: 'flex',
  flexDirection: 'row',
};
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = { name: '', type: '', showFormSearch: false, showRezult: false };
    this.findName = this.findName.bind(this);
    this.setType = this.setType.bind(this);
    this.showSearch = this.showSearch.bind(this);
    this.rezult = this.rezult.bind(this);
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
  rezult(value) {
    const { onSearchFile } = this.props;
    onSearchFile(value.TypeSearch, value.SearchFile);
    this.setState({ showRezult: true });
  }
  render() {
    const { stateSearch } = this.props;
    const colFolder = stateSearch.folder.length;
    const colFile = stateSearch.file.length;
    const colTag = stateSearch.tag.length;
    return (
      <div>
        <div style={styleHeadSearch}>
          <h3>Search </h3>
          <IconButton tooltip="Search">
            <IconSearch onClick={() => this.showSearch()} />
          </IconButton>
        </div>
        {this.state.showFormSearch && (
          <div>
            <SearchForm
              initialValues={{ TypeSearch: 'Name' }}
              onSubmit={value => this.rezult(value)}
            />
            {this.state.showRezult && <div>
              <h3>Rezult: {colFolder + colFile + colTag}</h3>
              {colFolder !== 0 && (
              <div>
                <h3>Folders: {colFolder}</h3>
                <ul>
                  {stateSearch.folder.map(v => (
                    <li key={v.id}>
                      <Link to={`/${v.id}`} >{v.text}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
              {colFile !== 0 && (
              <div>
                <h3>Notes: {colFile}</h3>
                <ul>
                  {stateSearch.file.map(v => (
                    <li key={v.id}>
                      <Link to={`/${v.folder}/${v.id}`} >{v.text} </Link>
                    </li>
              ))}
                </ul>
              </div>
            )}
              {colTag !== 0 && (
              <div>
                <h3>Tag: {colTag}</h3>
                <ul>
                  {stateSearch.tag.map(v => (
                    <li key={v.id}>
                      <Link to={`/${v.folder}/${v.id}`} >{v.text}</Link>
                    </li>
              ))}
                </ul>
              </div>
          )}
              {stateSearch.folder.length === 0 && stateSearch.file.length === 0
                && stateSearch.tag.length === 0 && (
                <h3>Not Found.</h3>
              )}
            </div>}
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

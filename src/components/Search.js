import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import IconButton from 'material-ui/IconButton';
import IconSearch from 'material-ui/svg-icons/action/search';
import Drawer from 'material-ui/Drawer';



import SearchForm from './SearchForm';

const styleHeadSearch = {
  display: 'flex',
  flexDirection: 'row-reverse',
  marginRight: '40px',

};
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = { name: '', type: '', showFormSearch: false, showRezult: false, open: false };
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
    const colFolder = stateSearch.list.folder.length;
    const colFile = stateSearch.list.file.length;
    const colTag = stateSearch.list.tags.length;
    return (
      <div style={{width: '100%', } }>
        <div style={styleHeadSearch}>
          <h3>Search </h3>
          <IconButton tooltip="Search">
            <IconSearch onClick={() => this.showSearch()} />
          </IconButton>
        </div>
        <Drawer
          open={this.state.showFormSearch}
          openSecondary
        >
          <div style={styleHeadSearch}>
            <h3>Search </h3>
            <IconButton tooltip="Search">
              <IconSearch onClick={() => this.showSearch()} />
            </IconButton>
          </div>

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
                  {stateSearch.list.folder.map(v => (
                    <li key={v.id}>
                      <Link to={`/Folder/${v.id}`} >{v.Name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {colFile !== 0 && (
              <div>
                <h3>Notes: {colFile}</h3>
                <ul>
                  {stateSearch.list.file.map(v => (
                    <li key={v.id}>
                      <Link to={`/Folder/${v.idFolder}/Note/${v.id}`} >{v.Name} </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {colTag !== 0 && (
              <div>
                <h3>Tag: {colTag}</h3>
                <ul>
                  {stateSearch.list.tags.map(v => (
                    <li key={v.id}>
                      <Link to={`/${v.idFolder}/${v.id}`} >{v.Name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {colFolder === 0 && colFile === 0
            && colTag === 0 && (
              <h3>Not Found.</h3>
            )}
          </div>}
        </Drawer>









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

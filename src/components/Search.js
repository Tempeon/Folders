import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import IconButton from 'material-ui/IconButton';
import IconSearch from 'material-ui/svg-icons/action/search';
import Drawer from 'material-ui/Drawer';
import TextField from 'material-ui/TextField';


import SearchForm from './SearchForm';

const styleHeadSearch = {
  display: 'flex',
  flexDirection: 'row-reverse',
  backgroundColor: '#1E90FF',

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
    const { onSearchFile, onclearSearch } = this.props;
    console.log(value);
    if (value !== '') {
      onSearchFile(value);
      this.setState({ showRezult: true });
    }
    onclearSearch();
  }


  render() {
    const { stateSearch } = this.props;
    console.log(stateSearch.list.folder)
    return (
      <div style={{ backgroundColor: '#1E90FF'}}>
        <div style={{...styleHeadSearch, marginRight: '40px'}}>
          <h3>Search </h3>
          <IconButton tooltip="Search">
            <IconSearch onClick={() => this.showSearch()} />
          </IconButton>
        </div>
        <Drawer
          open={this.state.showFormSearch}
          openSecondary
        >
          <div style={{ ...styleHeadSearch, paddingRight: '40px'}}>
            <h3>Search </h3>
            <IconButton tooltip="Search">
              <IconSearch onClick={() => this.showSearch()} />
            </IconButton>
          </div>
          <TextField
            style={{ padding: '10px' }}
            floatingLabelText="Search"
            onChange={event => this.rezult(event.target.value)}
          />
          {this.state.showRezult && <div style={{ padding: '10px' }}>

            <div>
              <h3>Folders: {stateSearch.list.folder.count}</h3>
              <ul>
                {stateSearch.list.folder.rows.map(v => (
                  <li key={v.id}>
                    <Link to={`/Folder/${v.id}`} >{v.Name}</Link>
                  </li>
                  ))}
              </ul>
            </div>


            <div>
              <h3>Notes: {stateSearch.list.file.count}</h3>
              <ul>
                {stateSearch.list.file.rows.map(v => (
                  <li key={v.id}>
                    <Link to={`/Folder/${v.idFolder}/Note/${v.id}`} >{v.Name} </Link>
                  </li>
                  ))}
              </ul>
            </div>

          </div>}
        </Drawer>


      </div>
    );
  }
}
Search.propTypes = {
  onSearchFile: PropTypes.func.isRequired,
  onclearSearch: PropTypes.func.isRequired,
  stateSearch: PropTypes.shape({
    file: PropTypes.array.isRequired,
    folder: PropTypes.array.isRequired,
    tag: PropTypes.array.isRequired,
  }).isRequired,
};
export default Search;

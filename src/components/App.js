import React from 'react';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';
import AddFolder from '../containers/AddFolder';
import ContentNote from '../containers/ContentNote';
import VisibleFolderList from '../containers/VisibleFolderList';
import VisibleNoteList from '../containers/VisibleNoteList';
import SearchFile from '../containers/SearchFile';

const styles = {
  borderColor: '#000033',
  borderWidth: 1,
};

const App = () => (
  <Router>
    <div>
      <div style={styles}>
        <AddFolder />
        <Route path="/" component={VisibleFolderList} />
      </div>
      <Route path="/:idFolder" component={VisibleNoteList} />
      <div className="cont">
        <Route path="/:idFolder/:idNote" component={ContentNote} />
      </div>
      <div>
        <Route path="/search" component={SearchFile} />
      </div>
        <hr />
       Search: <br />
      <SearchFile />
    </div>
  </Router>
);

export default App;

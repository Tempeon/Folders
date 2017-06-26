import React from 'react';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';
import ContentNote from '../containers/ContentNote';
import VisibleFolderList from '../containers/VisibleFolderList';
import VisibleNoteList from '../containers/VisibleNoteList';
import SearchFile from '../containers/SearchFile';

const App = () => (
  <Router>
    <div>
      <Route path="/" component={VisibleFolderList} />
      <Route path="/:idFolder" component={VisibleNoteList} />
      <div className="cont">
        <Route path="/:idFolder/:idNote" component={ContentNote} />
      </div>
      <div>
        <Route path="/search" component={SearchFile} />
      </div>
      <hr />
      <SearchFile />
    </div>
  </Router>
);

export default App;

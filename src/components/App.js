import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import injectTapEventPlugin from 'react-tap-event-plugin';

import ContentNote from '../containers/ContentNote';
import VisibleFolderList from '../containers/VisibleFolderList';
import VisibleNoteList from '../containers/VisibleNoteList';
import SearchFile from '../containers/SearchFile';

injectTapEventPlugin();
const App = () => (

    <Router>
      <div>
        <Switch>
          <Route exact
            path="/"
            render={() =>
            (<div>
              <SearchFile />
              <Route component={VisibleFolderList} />
            </div>)
          }
          />
          <Route
            exact
            path="/:idFolder"
            render={({ match }) =>
            (<div>
              <SearchFile />
              <VisibleFolderList match={match} />
              <VisibleNoteList match={match}/>
            </div>)
          }
          />
          <Route
            path="/:idFolder/:idNote"
            render={() => (
              <div>
                <SearchFile />
                <Route component={VisibleNoteList} />
                <Route component={ContentNote} />
              </div>
          )}
          />
        </Switch>
      </div>
    </Router>


/*   <MuiThemeProvider>
    <Router>
      <div>
        <SearchFile />
        <Route path="/" component={VisibleFolderList} />
        <hr />
        <Route path="/:idFolder" component={VisibleNoteList} />
        <Route path="/:idFolder/:idNote" component={ContentNote} />
      </div>
    </Router>
  </MuiThemeProvider>*/
);

export default DragDropContext(HTML5Backend)(App);

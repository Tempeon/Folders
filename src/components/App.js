import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import injectTapEventPlugin from 'react-tap-event-plugin';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import ContentNote from '../containers/ContentNote';
import VisibleFolderList from '../containers/VisibleFolderList';
import VisibleNoteList from '../containers/VisibleNoteList';
import SearchFile from '../containers/SearchFile';

injectTapEventPlugin();
const App = () => (

  <Router>
    <div>
      <SearchFile />
      <Switch>
        <Route
          exact
          path="/Folder"
          render={({ match }) =>
            <VisibleFolderList match={match} width="95%" />
          }
        />
        <Route
          exact
          path="/Folder/:idFolder"
          render={({ match, history }) => (
            <div style={{ display: 'flex', flexWrap: 'Wrap' }}>
              <VisibleFolderList width="30%" match={match} history={history} />
              <VisibleNoteList width="70%" match={match} />
            </div>
            )
          }
        />
        <Route
          path="/Folder/:idFolder/Note/:idNote"
          render={({ match, history }) => (
            <div style={{ display: 'flex', flexWrap: 'Wrap' }}>
              <VisibleNoteList width="20%" match={match} history={history} />
              <ContentNote width="75%" match={match} />
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

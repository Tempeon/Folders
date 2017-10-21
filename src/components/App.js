import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
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
    <div >
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/Folder" />} />
        <Route
          exact
          path="/Folder"
          render={({ match }) => (
            <div>
              <SearchFile />
              <VisibleFolderList match={match} width="95%" />
            </div>
              )
          }
        />
        <Route
          exact
          path="/Folder/:idFolder"
          render={({ match, history }) => (
            <div>
              <div>
                <SearchFile />
              </div>
              <div >
                <VisibleFolderList match={match} history={history} />
              </div>
                <VisibleNoteList match={match} />
            </div>
            )
          }
        />
        <Route
          path="/Folder/:idFolder/Note/:idNote"
          exact
          render={({ match, history }) => (
            <div >
              <SearchFile />
              <div style={{ display: 'flex', flexWrap: 'Wrap' }}>
                <VisibleNoteList width="20%" match={match} history={history} />
                <ContentNote width="75%" match={match} />
              </div>
            </div>
          )}
        />
      </Switch>
    </div>
  </Router>

);

export default DragDropContext(HTML5Backend)(App);

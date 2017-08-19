import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './components/App';
import reducer from './reducers';

const store = createStore(reducer);
render(
  <Provider store={store}>
    <MuiThemeProvider>
    <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root'),
);

/*
ReactDOM.render(
  <App />,
  document.getElementById('root')
);*/

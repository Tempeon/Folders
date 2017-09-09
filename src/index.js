import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import api from './middleware/api';
import App from './components/App';
import reducer from './reducers';

const loggerMiddleware = createLogger();

const middleware = [thunkMiddleware, api];

if (process.env.NODE_ENV !== 'production') {
  middleware.push(loggerMiddleware);
}

const store = createStore(reducer, applyMiddleware(...middleware));
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

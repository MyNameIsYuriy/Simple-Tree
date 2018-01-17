import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import nodeReducer from './reducer'
import AppContainer from './containers/AppContainer';

const store = createStore(nodeReducer)

ReactDOM.render(
    <Provider store={store}>
		<AppContainer />
	</Provider>, 
	document.getElementById('root')
);

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducer'
import AppContainer from './containers/AppContainer';

const store = createStore(reducer)

ReactDOM.render(
    <Provider store={store}>
		<AppContainer />
	</Provider>, 
	document.getElementById('root')
);

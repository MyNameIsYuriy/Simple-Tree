import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import nodeReducer from './reducer'
import App from './App';

const store = createStore(nodeReducer)

ReactDOM.render(
    <Provider store={store}>
		<App />
	</Provider>, 
	document.getElementById('root')
);

import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducer from '../reducer'

export default function configureStore(initialState) {
	const finalCreateStore = compose(
		applyMiddleware(thunk),
		window.devToolsExtension ? window.devToolsExtension() : f => f
	)(createStore)

	const store = finalCreateStore(reducer, initialState)

	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('../reducer', () => {
			const nextReducer = require('../reducer')
			store.replaceReducer(nextReducer)
		})
	}

	return store
}
import 'babel-polyfill'
import React from 'react'
import ReactDOM from "react-dom"

//BrowserRouter is userd on client because it expects url in browser. Static router is for server side
import {BrowserRouter} from 'react-router-dom'
import routes from '../routes/routes'

import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import reducers from '../reducers'

import {renderRoutes} from 'react-router-config'

const store = createStore(reducers, window.INITIAL_STATE, applyMiddleware(thunk))

ReactDOM.hydrate(
	<Provider store={store}>
		<BrowserRouter>
			<div>
				{renderRoutes(routes)}
			</div>
		</BrowserRouter>
	</Provider>
	, document.querySelector('#root'))

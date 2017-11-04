import 'babel-polyfill'
import React from 'react'
import ReactDOM from "react-dom"

//BrowserRouter is userd on client because it expects url in browser. Static router is for server side
import {BrowserRouter} from 'react-router-dom'
import Routes from '../routes/routes'

import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import reducers from '../reducers'

const store = createStore(reducers, {}, applyMiddleware(thunk))

ReactDOM.hydrate(
	<Provider store={store}>
		<BrowserRouter>
			<Routes/>
		</BrowserRouter>
	</Provider>
	, document.querySelector('#root'))

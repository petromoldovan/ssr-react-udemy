import React from 'react'
import ReactDOM from "react-dom"

//BrowserRouter is userd on client because it expects url in browser. Static router is for server side
import {BrowserRouter} from 'react-router-dom'
import Routes from '../routes/routes'

ReactDOM.hydrate(
	<BrowserRouter>
		<Routes/>
	</BrowserRouter>
	, document.querySelector('#root'))

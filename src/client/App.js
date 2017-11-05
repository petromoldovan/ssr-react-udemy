import React from 'react'
import {renderRoutes} from 'react-router-config'
import Header from "../components/Header"
import {fetchCurrentUser} from '../actions/api'

//NOTE: route && renderRoutes thing is the way to render nested components with react-router-config.
//The App component is the parent component here. See the routes.js file.
const App = ({ route }) => {
	return (
		<div>
			<Header />
			{renderRoutes(route.routes)}
		</div>
	)
}

export default {
	loadData: ({dispatch}) => dispatch(fetchCurrentUser()),
	component: App
}
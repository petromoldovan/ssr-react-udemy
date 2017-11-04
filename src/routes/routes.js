import React from 'react'
import {Route} from 'react-router-dom'
import Home from '../components/Home'
import Contact from '../components/Contact'

export default () => {
	return (
		<div>
			<Route exact path="/" component={Home} />
			<Route exact path="/contact" component={Contact} />
		</div>
	)
}

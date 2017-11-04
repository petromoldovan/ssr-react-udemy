//to be able to use async-await functions
import 'babel-polyfill'

import express from 'express'
import React from 'react'
import renderer from '../helpers/renderer'
import createStore from '../helpers/createStore'
import {matchRoutes} from 'react-router-config'
import routes from '../routes/routes'

const app = express()
const PORT = 3000

app.use(express.static('public'))

app.get('*', (req, res) => {
	const store = createStore();

	//match incoming path with existing routes
	const promisses = matchRoutes(routes, req.path).map(({route}) => {
		//loadData for certain route. We have to define this function in each component if we want any data to be loaded.
		return route.loadData ? route.loadData(store) : null
	})

	console.log("promisses", promisses)

	Promise.all(promisses).then(() => {
		res.send(renderer(req, store))
	})
})

app.listen(PORT,() => {
	console.log("listens on port ", PORT)
})

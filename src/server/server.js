//to be able to use async-await functions
import 'babel-polyfill'

import express from 'express'
import React from 'react'
import renderer from '../helpers/renderer'
import createStore from '../helpers/createStore'
import {matchRoutes} from 'react-router-config'
import routes from '../routes/routes'
import proxy from 'express-http-proxy'

const app = express()
const PORT = 3000

//add proxy for external apis. The part with proxyReqOptDecorator is done only for google oath
app.use(
	'/api',
	proxy('http://react-ssr-api.herokuapp.com', {
		proxyReqOptDecorator(opts) {
			opts.headers['x-forwarded-host'] = 'localhost:3000'
			return opts
		}
	}))
app.use(express.static('public'))

app.get('*', (req, res) => {
	const store = createStore(req);

	//match incoming path with existing routes
	const promisses = matchRoutes(routes, req.path).map(({route}) => {
		//loadData for certain route. We have to define this function in each component if we want any data to be loaded.
		return route.loadData ? route.loadData(store) : null
	})

	Promise.all(promisses).then(() => {
		res.send(renderer(req, store))
	})
})

app.listen(PORT,() => {
	console.log("listens on port ", PORT)
})

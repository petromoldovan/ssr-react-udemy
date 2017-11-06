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
			//after auth redirect user to localhost:3000
			opts.headers['x-forwarded-host'] = 'localhost:3000'
			return opts
		}
	}))
app.use(express.static('public'))

app.get('*', (req, res) => {
	const store = createStore(req);

	//match incoming path with existing routes
	const promisses = matchRoutes(routes, req.path)
		.map(({route}) => {
			//loadData for certain route. We have to define this function in each component if we want any data to be loaded.
			return route.loadData ? route.loadData(store) : null
		})
		.map(promise => {
			if (promise) {
				return new Promise((resolve, reject) => {
					//here we wrap all promisses from previos map func into another Promise and ALWAYS resolve them!
					//this is done because Promise.all below fails on the first rejected promise and does not call 'then' func but 'catch' func. But we want Promise.all to attempt to wait for all request.
					// That is why we artificiall say that all these Promise wrappers will be always resolved to let Promise.all finish.
					promise.then(resolve).catch(resolve)
				})
			}
		})

	Promise.all(promisses)
		.then(() => {
			//context works only with static router and is used to communicate info from components to their parent components or in our case here with server.js
			const context = {}

			const content = renderer(req, store, context)

			//context gets url only when StaticRouter(the server router) sees <Redirect /> in one of the components(like we have in requireAuth hoc). Static router cannot really redirect user. But the
			// url property is assigned to context. We need to check of that url prop on context and redirect user to this url if it is set.
			if (context.url) {
				return res.redirect(301, context.url)
			}

			//here we set error status on response. Context.notFound was set in Error404.js and passed automagically to service.js
			if (context.notFound) {
				res.status(404)
			}

			res.send(content)
		})
})

app.listen(PORT,() => {
	console.log("listens on port ", PORT)
})

import React from 'react'
import {renderToString} from 'react-dom/server'
import {Provider} from 'react-redux'
import {renderRoutes} from 'react-router-config'
import serialize from 'serialize-javascript'

//static router is used for server. Unlike broserRouter that picks up url from browser's address bar, the static router does not the address.
//we need to provide one with request that is incoming to the express app. Therefore we path location={req.path}
import {StaticRouter} from 'react-router-dom'
import routes from '../routes/routes'

import {Helmet} from 'react-helmet'

export default (req, store, context) => {
	const content = renderToString(
		<Provider store={store}>
			<StaticRouter location={req.path} context={context}>
				<div>
					{renderRoutes(routes)}
				</div>
			</StaticRouter>
		</Provider>
	)

	//pull all tags from react components
	const helmet = Helmet.renderStatic()

	return `
		<html>
			<head>
			${helmet.title.toString()}
			${helmet.meta.toString()}
			</head>
			<body>
			<div id="root">${content}</div>
			<script>
				window.INITIAL_STATE = ${serialize(store.getState())}
			</script>
			<script src="client-bundle.js"></script>
			</body>
		</html>
	`
}

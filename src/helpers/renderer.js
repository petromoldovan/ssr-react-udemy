import React from 'react'
import {renderToString} from 'react-dom/server'

//static router is used for server. Unlike broserRouter that picks up url from browser's address bar, the static router does not the address.
//we need to provide one with request that is incoming to the express app. Therefore we path location={req.path}
import {StaticRouter} from 'react-router-dom'
import Router from '../routes/routes'

export default (req) => {
	const content = renderToString(
		<StaticRouter location={req.path} context={{}}>
			<Router />
		</StaticRouter>
	)

	return `
		<html>
			<head>
			</head>
			<body>
			<div id="root">${content}</div>
			<script src="client-bundle.js"></script>
			</body>
		</html>
	`
}

import React from 'react'

const Error404 = ({staticContext = {}}) => {

	//this is how we set error on response from server. We passed context obj through
	//Static router on the server side. Then we get a prop staticContext in the component(will not work with Browser router).
	//Now we assign an error property on this staticContext object and check for it on the server side.
	staticContext.notFound = true

	return (
		<div>
			<div>Ooops, not found</div>
		</div>

	)
}

export default {
	component: Error404
}

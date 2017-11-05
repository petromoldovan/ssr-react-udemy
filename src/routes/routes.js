import React from 'react'
import HomeObject from '../pages/Home'
import UsersListObject from '../pages/UsersList'
import App from '../client/App'

export default [
	{
		...App,
		routes: [
			{
				...HomeObject,
				path: "/",
				exact: true
			},
			{
				...UsersListObject,
				path: "/users"
			}
		]
	}
]

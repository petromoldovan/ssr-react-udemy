import React from 'react'
import HomeObject from '../pages/Home'
import UsersListObject from '../pages/UsersList'

export default [
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

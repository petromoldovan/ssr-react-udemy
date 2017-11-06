import React from 'react'
import HomeObject from '../pages/Home'
import UsersListObject from '../pages/UsersList'
import AdminsListObject from '../pages/AdminsList'
import App from '../client/App'
import Error404 from "../pages/Error404";

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
			},
			{
				...AdminsListObject,
				path: '/admins'
			},
			{
				...Error404
			}
		]
	}
]

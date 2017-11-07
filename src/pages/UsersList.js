import React from 'react'
import {connect} from 'react-redux'
import {Helmet} from 'react-helmet'
import {fetchUsers} from '../actions/api'

const mapStateToProps = (state) => {
	return {users: state.users}
}

class UsersList extends React.PureComponent {
	componentDidMount() {
		this.props.fetchUsers()
	}

	renderUsers() {
		return this.props.users.map(user => {
			return <li key={user.id}>{user.name}</li>
		})
	}

	head() {
		return (
			<Helmet>
				<title>{`(${this.props.users.length}) Users Loaded`}</title>
				<meta property="og:title" content="Users page" />
			</Helmet>
		)
	}

	render() {
		return (
			<div>
				{this.head()}
				List of users
				<ol>
					{this.renderUsers()}
				</ol>
			</div>
		)
	}
}

//this is loaded on server.
//the store argument is the store instance from server
function loadData(store) {
	return store.dispatch(fetchUsers())
}

export default {
	loadData,
	component: connect(mapStateToProps, {fetchUsers})(UsersList)
}

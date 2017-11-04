import React from 'react'
import {connect} from 'react-redux'
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

	render() {
		return (
			<div>
				List of users
				<ol>
					{this.renderUsers()}
				</ol>
			</div>
		)
	}
}

export default connect(mapStateToProps, {fetchUsers})(UsersList)

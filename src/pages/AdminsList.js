import React from 'react'
import {connect} from 'react-redux'
import {fetchAdmins} from "../actions/api";
import requireAuth from "../components/hoc/requireAuth";

class AdminsList extends React.Component {
	componentDidMount() {
		this.props.fetchAdmins()
	}

	renderAdmins () {
		return this.props.admins.map(admin => {
			return <li key={admin.id}>{admin.name}</li>
		})
	}

	render() {
		return (
			<div>
				<h3>Admins list</h3>
				<ul>{this.renderAdmins()}</ul>
			</div>
		)
	}
}

function mapStateToProps ({admins}) {
	return {admins}
}

export default {
	component: connect(mapStateToProps, {fetchAdmins})(requireAuth(AdminsList)),
	loadData: ({dispatch}) => dispatch(fetchAdmins())
}
import {FETCH_USERS} from '../actions/api'

export default (state = [], action) => {
	switch (action.type) {
		case FETCH_USERS:
			return action.payload.data
		default:
			return state
	}
}

export const FETCH_USERS = 'FETCH_USERS'
export const fetchUsers = () => async (dispatch, getState, axiosInstance) => {
	const res = await axiosInstance.get('/users')

	dispatch({
		type: FETCH_USERS,
		payload: res
	})

}

export const FETCH_CURRENT_USERS = 'FETCH_CURRENT_USERS'
export const fetchCurrentUser = () => async (dispatch, getState, axiosInstance) => {
	const res = await axiosInstance.get('/current_user')

	dispatch({
		type: FETCH_CURRENT_USERS,
		payload: res
	})

}
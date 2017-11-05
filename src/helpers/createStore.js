import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import reducers from '../reducers'
import axios from 'axios'

export default (req) => {
	//this is done for the very first render. Browser calls the nodejs server => we take cookie from that request and pass it to
	//axiosInstance and then make request to api. In this way the api will think that this request is coming directly from the browser.
	//This is needed to maintain cookie based authentication(in this case with google auth)
	const axiosInstance = axios.create({
		baseURL: 'http://react-ssr-api.herokuapp.com',
		headers: {cookie: req.get('cookie') || ''}
	})

	const store = createStore(reducers, {}, applyMiddleware(thunk.withExtraArgument(axiosInstance)))

	return store
}

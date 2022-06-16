import * as api from '../../api/index';

export const getPosts = () => async (dispatch) => {
	try {
		const { data } = await api.fetchPosts();
		const action = { type: 'FETCH_POSTS', payload: data };
		dispatch(action);
	} catch (error) {
		console.error(error.message);
	}
};

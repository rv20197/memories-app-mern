import * as api from '../../api/index';

export const getPosts = () => async dispatch => {
	try {
		const { data } = await api.fetchPosts();
		const action = { type: 'FETCH_POSTS', payload: data };
		dispatch(action);
	} catch (error) {
		console.error(error);
	}
};

export const createPost = newPost => async dispatch => {
	try {
		const { data } = await api.createPost(newPost);
		const action = { type: 'CREATE_POST', payload: data };
		dispatch(action);
	} catch (error) {
		console.error(error);
	}
};

export const updatePost = (id, updatedPost) => async dispatch => {
	try {
		const { data } = await api.updatePost(id, updatedPost);
		const action = { type: 'UPDATE_POST', payload: data };
		dispatch(action);
	} catch (error) {
		console.error(error);
	}
};

export const deletePost = id => async dispatch => {
	try {
		await api.deletePost(id);
		const action = { type: 'DELETE_POST', payload: id };
		dispatch(action)
	} catch (error) {
		console.error(error);
	}
};

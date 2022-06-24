import * as api from '../../api/index';

import {
	FETCH_POSTS,
	FETCH_POST,
	FETCH_POSTS_BY_SEARCH,
	CREATE_POST,
	UPDATE_POST,
	COMMENT_POST,
	DELETE_POST,
	START_LOADING,
	STOP_LOADING
} from '../../constants/actionTypes';

export const getPosts = page => async dispatch => {
	try {
		dispatch({ type: START_LOADING });
		const { data } = await api.fetchPosts(page);
		const action = {
			type: FETCH_POSTS,
			payload: data
		};
		dispatch(action);
		dispatch({ type: STOP_LOADING });
	} catch (error) {
		console.error(error);
	}
};

export const getPost = id => async dispatch => {
	try {
		dispatch({ type: START_LOADING });
		const { data } = await api.fetchPostById(id);
		const action = {
			type: FETCH_POST,
			payload: data
		};
		dispatch(action);
		dispatch({ type: STOP_LOADING });
	} catch (error) {
		console.error(error);
	}
};

export const getPostsBySearch = searchQuery => async dispatch => {
	try {
		dispatch({ type: START_LOADING });
		const {
			data: { data }
		} = await api.fetchPostsBySearch(searchQuery);
		const action = { type: FETCH_POSTS_BY_SEARCH, payload: data };
		dispatch(action);
		dispatch({ type: STOP_LOADING });
	} catch (error) {
		console.error(error);
	}
};

export const createPost = (newPost, history) => async dispatch => {
	try {
		dispatch({ type: START_LOADING });
		const { data } = await api.createPost(newPost);
		const action = { type: CREATE_POST, payload: data };
		history.push(`/posts/${data._id}`);
		dispatch(action);
		dispatch({ type: STOP_LOADING });
	} catch (error) {
		console.error(error);
	}
};

export const updatePost = (id, updatedPost) => async dispatch => {
	try {
		const { data } = await api.updatePost(id, updatedPost);
		const action = { type: UPDATE_POST, payload: data };
		dispatch(action);
	} catch (error) {
		console.error(error);
	}
};

export const likePost = id => async dispatch => {
	try {
		const { data } = await api.likePost(id);
		const action = { type: UPDATE_POST, payload: data };
		dispatch(action);
	} catch (error) {
		console.error(error);
	}
};

export const commentPost = (finalComment, postId) => async dispatch => {
	try {
		const { data } = await api.comment(finalComment, postId);
		const action = { type: COMMENT_POST, payload: data };
		dispatch(action);
	} catch (error) {
		console.error(error);
	}
};

export const deletePost = id => async dispatch => {
	try {
		await api.deletePost(id);
		const action = { type: DELETE_POST, payload: id };
		dispatch(action);
	} catch (error) {
		console.error(error);
	}
};

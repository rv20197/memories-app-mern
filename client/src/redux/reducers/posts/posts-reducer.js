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
} from '../../../constants/actionTypes';

const initialState = { isLoading: true, posts: [] };

const postsReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case START_LOADING:
			return { ...state, isLoading: true };
		case STOP_LOADING:
			return { ...state, isLoading: false };
		case FETCH_POSTS:
			return {
				...state,
				posts: payload.data,
				currentPage: payload.currentPage,
				numberOfPages: payload.numberOfPages
			};
		case FETCH_POST:
			return { ...state, post: payload };
		case FETCH_POSTS_BY_SEARCH:
			return { ...state, posts: payload };
		case CREATE_POST:
			return { ...state, posts: [...state.posts, payload] };
		case UPDATE_POST:
			return {
				...state,
				posts: state.posts.map(post =>
					post._id === payload._id ? payload : post
				)
			};
		case COMMENT_POST:
			return {
				...state,
				post: { ...payload }
			};
		case DELETE_POST:
			return {
				...state,
				posts: state.posts.filter(post => post._id !== payload)
			};
		default:
			return state;
	}
};

export default postsReducer;

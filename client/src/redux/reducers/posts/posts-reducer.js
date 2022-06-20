import {
	FETCH_POSTS,
	FETCH_POSTS_BY_SEARCH,
	CREATE_POST,
	UPDATE_POST,
	DELETE_POST
} from '../../../constants/actionTypes';

const initialState = [];

const postsReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case FETCH_POSTS:
			return {
				...state,
				posts: payload.data,
				currentPage: payload.currentPage,
				numberOfPages: payload.numberOfPages
			};
		case FETCH_POSTS_BY_SEARCH:
			return { ...state, posts: payload };
		case CREATE_POST:
			return { ...state, ...payload };
		case UPDATE_POST:
			return state.map(post => (post._id === payload._id ? payload : post));
		case DELETE_POST:
			return state.filter(post => post._id !== payload);
		default:
			return state;
	}
};

export default postsReducer;

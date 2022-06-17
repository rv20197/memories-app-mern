const initialState = [];

const postsReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case 'FETCH_POSTS':
			return [...payload];
		case 'CREATE_POST':
			return [{ ...state, ...payload }];
		case 'UPDATE_POST':
			return state.map(post => (post._id === payload._id ? payload : post));
		default:
			return state;
	}
};

export default postsReducer;

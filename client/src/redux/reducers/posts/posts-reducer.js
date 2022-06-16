const initialState = [];

const postsReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case 'FETCH_POSTS':
			return { ...state, ...payload };
		case 'CREATE_POST':
			return { ...state, ...payload };
		default:
			return state;
	}
};

export default postsReducer;

const initialState = [];

const postsReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case 'CREATE_POST':
			return { ...state, ...payload };

		case 'FETCH_POSTS':
			return { ...state, ...payload };
		default:
			return state;
	}
};

export default postsReducer;

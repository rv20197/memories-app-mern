import { AUTH, LOGOUT } from '../../../constants/actionTypes';

const initialState = {};

const authReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case AUTH:
			localStorage.setItem('profile', JSON.stringify({ ...payload }));
			return { ...state, authData: { ...payload } };

		case LOGOUT:
			localStorage.clear();
			return { ...state, authData: null };

		default:
			return state;
	}
};

export default authReducer;

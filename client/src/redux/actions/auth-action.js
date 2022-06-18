import { SIGNUP, SIGNIN } from '../../constants/actionTypes';

import * as api from '../../api/index.js';

export const signIn = (formData, history) => async dispatch => {
	try {
		history.push('/');
	} catch (error) {
		console.error(error);
	}
};

export const signUp = (formData, history) => async dispatch => {
	try {
		history.push('/');
	} catch (error) {
		console.error(error);
	}
};

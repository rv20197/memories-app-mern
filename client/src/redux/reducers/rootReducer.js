import { combineReducers } from 'redux';
import postsReducer from './posts/posts-reducer';
import authReducer from './auth/auth-reducer';

export default combineReducers({
	posts: postsReducer,
	auth: authReducer
});

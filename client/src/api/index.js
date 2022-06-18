import axios from 'axios';

const BASE_URL = 'https://memories-express-rest-backend.herokuapp.com/posts';

// const BASE_URL = 'http://localhost:5000';

const API = axios.create({ baseURL: BASE_URL });

API.interceptors.request.use(req => {
	const profile = JSON.parse(localStorage.getItem('profile'));
	if (profile) {
		req.headers.authorization = `Bearer ${profile.token}`;
	}

	return req;
});

const postsURL = '/posts';

export const fetchPosts = () => {
	return API.get(postsURL);
};

export const createPost = newPost => {
	return API.post(postsURL, newPost);
};

export const updatePost = (id, updatedPost) => {
	return API.patch(`${postsURL}/${id}`, updatedPost);
};

export const deletePost = id => {
	return API.delete(`${postsURL}/${id}`);
};

export const likePost = id => {
	return API.patch(`${postsURL}/${id}/likePost`);
};

const usersURL = '/user';

export const signIn = formData => {
	return API.post(`${usersURL}/signin`, formData);
};

export const signUp = formData => {
	return API.post(`${usersURL}/signup`, formData);
};

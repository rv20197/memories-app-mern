import express from 'express';
import {
	getPosts,
	getPostById,
	getPostsBySearch,
	createPost,
	updatePost,
	deletePost,
	likePost,
	commentPost
} from '../controllers/posts-controller.js';

import isAuth from '../middleware/isAuth.js';

const router = express.Router();

// GET: http://localhost:5000/posts
router.get('/', getPosts);

// GET: http://localhost:5000/posts/search
router.get('/search', getPostsBySearch);

// GET: http://localhost:5000/posts/:id
router.get('/:id', getPostById);

// POST: http://localhost:5000/posts
router.post('/', isAuth, createPost);

// PATCH: http://localhost:5000/posts/:id
router.patch('/:id', isAuth, updatePost);

// DELETE: http://localhost:5000/posts/:id
router.delete('/:id', isAuth, deletePost);

// POST: http://localhost:5000/posts/:id/likePost
router.post('/:id/commentPost', isAuth, commentPost);

// PATCH: http://localhost:5000/posts/:id/likePost
router.patch('/:id/likePost', isAuth, likePost);

export default router;

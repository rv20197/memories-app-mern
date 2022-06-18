import express from 'express';
import {
	getPosts,
	createPost,
	updatePost,
	deletePost,
	likePost
} from '../controllers/posts-controller.js';

import isAuth from '../middleware/isAuth.js'

const router = express.Router();

// GET: http://localhost:5000/posts
router.get('/', getPosts);

// POST: http://localhost:5000/posts
router.post('/',isAuth, createPost);

// PATCH: http://localhost:5000/posts/:id
router.patch('/:id',isAuth, updatePost);

// DELETE: http://localhost:5000/posts/:id
router.delete('/:id',isAuth, deletePost);

// PATCH: http://localhost:5000/posts/:id/likePost
router.patch('/:id/likePost',isAuth, likePost);

export default router;

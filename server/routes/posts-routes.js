import express from 'express';
import {
	getPosts,
	createPost,
	updatePost,
	deletePost
} from '../controllers/posts-controller.js';

const router = express.Router();

// GET: http://localhost:5000/posts
router.get('/', getPosts);

// POST: http://localhost:5000/posts
router.post('/', createPost);

// PATCH: http://localhost:5000/posts/:id
router.patch('/:id', updatePost);

// DELETE: http://localhost:5000/posts/:id
router.delete('/:id', deletePost);

export default router;

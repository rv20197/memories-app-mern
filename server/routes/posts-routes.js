import express from 'express';
import { getPosts,createPost } from '../controllers/posts-controller.js';

const router = express.Router();

// GET: http://localhost:5000/posts
router.get('/', getPosts);

// POST: http://localhost:5000/posts
router.post('/', createPost);

export default router;

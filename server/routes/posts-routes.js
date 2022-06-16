import express from 'express';
import { getPosts } from '../controllers/posts-controller.js';

const router = express.Router();

// GET: http://localhost:5000/posts
router.get('/', getPosts);

export default router;

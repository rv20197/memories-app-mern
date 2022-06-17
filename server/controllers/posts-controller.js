import mongoose from 'mongoose';
import PostMessage from '../models/postsMessage-model.js';

export const getPosts = async (req, res, next) => {
	try {
		const postMessages = await PostMessage.find();
		res.status(200).json(postMessages);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const createPost = async (req, res, next) => {
	try {
		const post = req.body;
		const newPost = new PostMessage(post);
		await newPost.save();
		res.status(201).json(newPost);
	} catch (error) {
		res.status(409).json({ message: error.message });
	}
};

export const updatePost = async (req, res, next) => {
	try {
		const { id: _id } = req.params;
		const post = req.body;

		if (!mongoose.Types.ObjectId.isValid(_id)) {
			return res.status(404).send({ message: 'No Post found with that Id' });
		}

		const updatedPost = await PostMessage.findByIdAndUpdate(
			_id,
			{ ...post, _id },
			{
				new: true
			}
		);

		res.status(204).json(updatedPost);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const deletePost = async (req, res, next) => {
	try {
		console.log(req.params);
		const { id: _id } = req.params;

		if (!mongoose.Types.ObjectId.isValid(_id)) {
			return res.status(404).send({ message: 'No Post found with that Id' });
		}

		const deletedPost = await PostMessage.findByIdAndRemove(_id);
		res.status(200).json({ message: 'Post deleted' });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

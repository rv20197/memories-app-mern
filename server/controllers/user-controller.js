import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import userModel from '../models/user-model.js';

export const signInUser = async (req, res, next) => {
	const { email, password } = req.body;
	try {
		const existingUser = await userModel.findOne({ email });
		if (!existingUser) {
			return res.status(404).json({ message: 'User Does Not Exists' });
		}

		const isPasswordCorrect = await bcrypt.compare(
			password,
			existingUser.password
		);

		if (!isPasswordCorrect) {
			return res.status(401).json({ message: 'Invalid Credentials' });
		}

		const token = jwt.sign(
			{ email: existingUser.email, _id: existingUser._id },
			'mern',
			{ expiresIn: '1h' }
		);

		res.status(200).send({ result: existingUser, token });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const signUpUser = async (req, res, next) => {
	const { firstName, lastName, email, password, confirmPassword } = req.body;
	try {
		const existingUser = await userModel.findOne({ email });

		if (existingUser) {
			return res.status(400).json({ message: 'User Already Exists' });
		}

		if (password !== confirmPassword) {
			return res.status(400).json({ message: "Passwords Don't Match" });
		}

		const hashedPassword = await bcrypt.hash(password, 14);

		const result = await userModel.create({
			name: `${firstName} ${lastName}`,
			email,
			password: hashedPassword
		});

		const token = jwt.sign({ email: result.email, _id: result._id }, 'mern', {
			expiresIn: '1h'
		});

		res.status(200).send({ result, token });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

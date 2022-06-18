import jwt from 'jsonwebtoken';

const isAuth = async (req, res, next) => {
	try {
		const token = req.headers.Authorization.split(' ')[1];
		const isCustomAuth = token.length < 500;

		let decodedData;

		if (token && isCustomAuth) {
			decodedData = jwt.verify(token, 'mern');

			req.userId = decodedData?._id;
		} else {
			decodedData = jwt.verify(token);
			req.userId = decodedData?.sub;
		}

		next();
	} catch (error) {
		console.error(error);
	}
};

export default isAuth;

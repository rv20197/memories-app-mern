import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { Typography, TextField, Button } from '@material-ui/core';
import useStyles from './CommentSection-styles';

import { commentPost } from '../../../redux/actions/post-action';

const CommentSection = ({ post }) => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const [comments, setComments] = useState([1, 2, 3, 4, 5]);
	const [comment, setComment] = useState('');

	const user = JSON.parse(localStorage.getItem('user'));

	const commentInputHandler = e => setComment(e.target.value);

	const commentSubmitHandler = () => {
		const finalComment = `${user.result.name}: ${comment}`;
		dispatch(commentPost(finalComment, post._id));
	};
	return (
		<>
			<div className={classes.commentsOuterContainer}>
				<div className={classes.commentsInnerContainer}>
					<Typography gutterBottom variant='h6'>
						Comments
					</Typography>
					{comments.map((c, i) => (
						<Typography key={i} gutterBottom variant='subtitle1'>
							comment {i}
						</Typography>
					))}
				</div>

				<div style={{ width: '80%' }}>
					<Typography gutterBottom variant='h5'>
						Write a Comment
					</Typography>
					<TextField
						fullWidth
						minRows={4}
						variant='outlined'
						label='comment'
						multiline
						value={comment}
						onChange={commentInputHandler}
					/>
					<Button
						style={{ marginTop: '10px' }}
						fullWidth
						disabled={!comment}
						variant='contained'
						color='primary'
						onClick={commentSubmitHandler}>
						Comment
					</Button>
				</div>
			</div>
		</>
	);
};

export default CommentSection;

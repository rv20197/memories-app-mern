import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Typography, TextField, Button } from '@material-ui/core';
import useStyles from './CommentSection-styles';

import { commentPost } from '../../../redux/actions/post-action';

const CommentSection = ({ post }) => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const [comments, setComments] = useState(post?.comments);
	const [comment, setComment] = useState('');

	const user = JSON.parse(localStorage.getItem('profile'));

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
							{c}
						</Typography>
					))}
				</div>

				{user?.result?.name && (
					<div style={{ width: '80%' }}>
						<Typography gutterBottom variant='h5'>
							Write a Comment
						</Typography>
						<TextField
							fullWidth
							minRows={4}
							variant='outlined'
							label='Comment'
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
				)}
			</div>
		</>
	);
};

export default CommentSection;

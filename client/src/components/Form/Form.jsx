import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';

import { useDispatch, useSelector } from 'react-redux';
import useStyles from './Form-styles';
import { createPost, updatePost } from '../../redux/actions/post-action';

const Form = ({ currentPostId, setCurrentPostId }) => {
	const [postData, setPostData] = useState({
		creator: '',
		title: '',
		message: '',
		tags: '',
		selectedFile: ''
	});

	const post = useSelector(state =>
		currentPostId ? state.posts.find(post => post._id === currentPostId) : null
	);

	useEffect(() => {
		if (post) {
			setPostData(post);
		}
	}, [post]);

	const classes = useStyles();
	const dispatch = useDispatch();

	const submitHandler = e => {
		e.preventDefault();
		if (!currentPostId) {
			dispatch(createPost(postData));
		} else {
			dispatch(updatePost(currentPostId, postData));
		}
		clearFormHandler();
	};

	const fileUploadHandler = ({ base64 }) =>
		setPostData({ ...postData, selectedFile: base64 });

	const clearFormHandler = () => {
		setCurrentPostId(null);
		setPostData({
			creator: '',
			title: '',
			message: '',
			tags: '',
			selectedFile: ''
		});
	};

	return (
		<Paper className={classes.paper}>
			<form
				autoComplete='off'
				noValidate
				className={`${classes.root} ${classes.form}`}
				onSubmit={submitHandler}>
				<Typography variant='h6'>
					{currentPostId ? 'Editing Memory' : 'Creating Memory'}
				</Typography>
				<TextField
					name='creator'
					variant='outlined'
					label='Creator'
					fullWidth
					value={postData.creator}
					onChange={e => setPostData({ ...postData, creator: e.target.value })}
				/>

				<TextField
					name='title'
					variant='outlined'
					label='Title'
					fullWidth
					value={postData.title}
					onChange={e => setPostData({ ...postData, title: e.target.value })}
				/>

				<TextField
					name='message'
					variant='outlined'
					label='Message'
					fullWidth
					value={postData.message}
					onChange={e => setPostData({ ...postData, message: e.target.value })}
				/>

				<TextField
					name='tags'
					variant='outlined'
					label='Tags (Comma Separated)'
					fullWidth
					value={postData.tags}
					onChange={e =>
						setPostData({ ...postData, tags: e.target.value.split(',') })
					}
				/>
				<div className={classes.fileInput}>
					<FileBase type='file' multiple={false} onDone={fileUploadHandler} />
				</div>
				<Button
					className={classes.buttonSubmit}
					variant='contained'
					color='primary'
					size='large'
					type='submit'
					fullWidth>
					{currentPostId ? 'Edit Post' : 'Create Post'}
				</Button>

				<Button
					variant='contained'
					color='secondary'
					size='small'
					onClick={clearFormHandler}
					fullWidth>
					Clear
				</Button>
			</form>
		</Paper>
	);
};

export default Form;

import React from 'react';
import moment from 'moment';

import {
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Button,
	Typography,
	ButtonBase} from '@material-ui/core';

import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { deletePost, likePost } from '../../../redux/actions/post-action';

import useStyles from './Post-styles';

const Post = ({ post, setCurrentPostId }) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();

	const user = JSON.parse(localStorage.getItem('profile'));

	const updatePostHandler = () => {
		setCurrentPostId(post._id);
	};

	const likePostHandler = () => {
		dispatch(likePost(post._id));
	};

	const deletePostHandler = () => {
		dispatch(deletePost(post._id));
	};

	const openPostHandler = () => {
		if (user) {
			history.push(`/posts/${post._id}`);
		} else {
			history.push(`/posts`);
		}
	};

	const Likes = () => {
		if (post.likes.length > 0) {
			return post.likes.find(
				like => like === (user?.result?.googleId || user?.result?._id)
			) ? (
				<>
					<ThumbUpAltIcon fontSize='small' />
					&nbsp;
					{post.likes.length > 2
						? `You and ${post.likes.length - 1} others`
						: `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}
				</>
			) : (
				<>
					<ThumbUpAltOutlined fontSize='small' />
					&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}
				</>
			);
		}

		return (
			<>
				<ThumbUpAltOutlined fontSize='small' />
				&nbsp;Like
			</>
		);
	};

	return (
		<Card className={classes.card} raised elevation={6}>
			<ButtonBase
				component='span'
				name='test'
				className={classes.cardAction}
				onClick={openPostHandler}>
				<CardMedia
					className={classes.media}
					image={post.selectedFile}
					title={post.title}
				/>

				<div className={classes.overlay}>
					<Typography variant='h6'>{post.name}</Typography>
					<Typography variant='body2'>
						{moment(post.createdAt).fromNow()}
					</Typography>
				</div>

				{(user?.result?.googleId === post?.creator ||
					user?.result?._id === post?.creator) && (
					<div className={classes.overlay2} name='edit'>
						<Button
							onClick={e => {
								e.stopPropagation();
								updatePostHandler();
							}}
							style={{ color: 'white' }}
							size='small'>
							<MoreHorizIcon fontSize='medium' />
						</Button>
					</div>
				)}

				<div className={classes.details}>
					<Typography variant='body2' color='textSecondary'>
						{post.tags.map(tag => `#${tag} `)}
					</Typography>
				</div>

				<Typography className={classes.title} variant='h5' gutterBottom>
					{post.title}
				</Typography>

				<CardContent>
					<Typography variant='body2' color='textSecondary' component='p'>
						{post.message}
					</Typography>
				</CardContent>
			</ButtonBase>

			<CardActions className={classes.cardActions}>
				<Button
					size='small'
					color='primary'
					onClick={likePostHandler}
					disabled={!user?.result}>
					<Likes />
				</Button>

				{(user?.result?.googleId === post?.creator ||
					user?.result?._id === post?.creator) && (
					<Button size='small' color='secondary' onClick={deletePostHandler}>
						<DeleteIcon fontSize='small' />
						Delete
					</Button>
				)}
			</CardActions>
		</Card>
	);
};

export default Post;

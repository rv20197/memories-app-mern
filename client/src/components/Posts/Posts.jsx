import React from 'react';

import { CircularProgress, Grid, Paper, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Post from './Post/Post';
import useStyles from './Posts-styles';

const Posts = ({ setCurrentPostId }) => {
	const classes = useStyles();
	const { posts, isLoading } = useSelector(state => state.posts);
	if (!posts.length && !isLoading) {
		return <Typography variant='h3'>No Posts Found!</Typography>;
	}
	return (
		<>
			{isLoading ? (
				<Paper className={classes.loadingPaper}>
					<CircularProgress />
				</Paper>
			) : (
				<Grid
					className={classes.mainContainer}
					container
					alignItems='stretch'
					spacing={3}>
					{posts.map(post => (
						<Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
							<Post post={post} setCurrentPostId={setCurrentPostId} />
						</Grid>
					))}
				</Grid>
			)}
		</>
	);
};

export default Posts;

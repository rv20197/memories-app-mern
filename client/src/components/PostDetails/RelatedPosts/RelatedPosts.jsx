import React from 'react';
import { Paper, Typography, Divider } from '@material-ui/core';

import { useHistory } from 'react-router-dom';

const RelatedPosts = ({ recommendedPosts, classes }) => {
	const history = useHistory();
	const openPostHandler = postId => {
		history.push(`/posts/${postId}`);
	};

	return (
		<Paper
			elevation={6}
			style={{ padding: '20px', borderRadius: '15px', marginTop: '1rem' }}>
			{recommendedPosts.length === 0 ? (
				<Typography gutterBottom variant='h6'>
					No Posts Found Matching Your Interest
				</Typography>
			) : (
				<div className={classes.section}>
					<Typography gutterBottom variant='h5'>
						You might also like:
					</Typography>
					<Divider />
					<div className={classes.recommendedPosts}>
						{recommendedPosts.map(
							({ title, message, name, likes, selectedFile, _id }) => (
								<div
									key={_id}
									style={{ margin: '20px', cursor: 'pointer' }}
									onClick={() => openPostHandler(_id)}>
									<Typography gutterBottom variant='h6'>
										{title}
									</Typography>
									<Typography gutterBottom variant='subtitle2'>
										{name}
									</Typography>
									<Typography gutterBottom variant='subtitle2'>
										{message}
									</Typography>
									<Typography gutterBottom variant='subtitle1'>
										Likes: {likes.length}
									</Typography>
									<img
										style={{
											width: '200px',
											borderRadius: '10px',
											objectFit: 'cover'
										}}
										src={selectedFile}
										alt={title}
									/>
								</div>
							)
						)}
					</div>
				</div>
			)}
		</Paper>
	);
};

export default RelatedPosts;

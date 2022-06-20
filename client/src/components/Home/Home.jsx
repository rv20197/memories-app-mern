import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getPosts } from '../../redux/actions/post-action';
import { Grow, Grid, Container, Paper } from '@material-ui/core';

import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Paginate from '../Paginate/Paginate';

import useStyles from './Home-styles';

const Home = () => {
	const classes = useStyles();
	const [currentPostId, setCurrentPostId] = useState(null);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getPosts());
	}, [currentPostId, dispatch]);

	return (
		<Grow in>
			<Container>
				<Grid
					container
					className={classes.mainContainer}
					justifyContent='space-between'
					alignItems='stretch'
					spacing={4}>
					<Grid item xs={12} sm={7}>
						<Posts setCurrentPostId={setCurrentPostId} />
					</Grid>
					<Grid item xs={12} sm={4}>
						<Form
							currentPostId={currentPostId}
							setCurrentPostId={setCurrentPostId}
						/>
						<Paper elevation={6}>
							<Paginate />
						</Paper>
					</Grid>
				</Grid>
			</Container>
		</Grow>
	);
};

export default Home;

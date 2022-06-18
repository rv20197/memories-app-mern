import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Container, Grow, Grid } from '@material-ui/core';

import Navbar from './components/Navbar/Navbar';
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import { getPosts } from './redux/actions/post-action';

import useStyles from './App-styles';

function App() {
	const [currentPostId, setCurrentPostId] = useState(null);

	const dispatch = useDispatch();
	const classes = useStyles();

	useEffect(() => {
		dispatch(getPosts());
	}, [currentPostId, dispatch]);

	return (
		<Container maxWidth='lg'>
			<Navbar />
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
						</Grid>
					</Grid>
				</Container>
			</Grow>
		</Container>
	);
}

export default App;

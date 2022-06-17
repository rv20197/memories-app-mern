import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';

import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import { getPosts } from './redux/actions/post-action';

import useclasses from './App-styles';
import memories from './assets/images/memories.png';

function App() {
	const dispatch = useDispatch();
	const classes = useclasses();

	useEffect(() => {
		dispatch(getPosts());
	}, [dispatch]);

	return (
		<Container maxWidth='lg'>
			<AppBar position='static' color='inherit' className={classes.appBar}>
				<Typography variant='h2' align='center' className={classes.heading}>
					Memories
				</Typography>
				<img
					src={memories}
					alt='memories'
					height='60'
					className={classes.image}
				/>
			</AppBar>
			<Grow in>
				<Container>
					<Grid
						container
						justifyContent='space-between'
						alignItems='stretch'
						spacing={4}>
						<Grid item xs={12} sm={7}>
							<Posts />
						</Grid>
						<Grid item xs={12} sm={4}>
							<Form />
						</Grid>
					</Grid>
				</Container>
			</Grow>
		</Container>
	);
}

export default App;
import { Container, AppBar, Typography, Grow, Grid } from '@mui/material';
import styles from './App.module.css';

import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';

import memories from './assets/images/memories.png';

function App() {
	return (
		<Container maxWidth='lg'>
			<AppBar position='static' color='inherit' className={styles.appBar}>
				<Typography variant='h2' align='center' className={styles.heading}>
					Memories
				</Typography>
				<img
					src={memories}
					alt='memories'
					height='60'
					className={styles.image}
				/>
			</AppBar>
			<Grow in>
				<Container>
					<Grid
						container
						justifyItems='space-between'
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

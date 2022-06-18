import React from 'react';
import { AppBar, Typography } from '@material-ui/core';
import memories from '../../assets/images/memories.png';
import useStyles from './Navbar-styles';

const Navbar = () => {
	const classes = useStyles();
	return (
		<AppBar position='static' color='inherit' className={classes.appBar}>
			<img
				src={memories}
				alt='memories'
				height='60'
				className={classes.image}
			/>
			<Typography variant='h2' align='center' className={classes.heading}>
				Memories
			</Typography>
		</AppBar>
	);
};

export default Navbar;

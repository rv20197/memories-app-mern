import React from 'react';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

import useStyles from './Navbar-styles';
import memories from '../../assets/images/memories.png';

const Navbar = () => {
	const classes = useStyles();

	const user = null;
	return (
		<AppBar position='static' color='inherit' className={classes.appBar}>
			<div className={classes.brandContainer}>
				<img
					src={memories}
					alt='memories'
					height='60'
					className={classes.image}
				/>
				<Typography
					component={Link}
					to='/'
					variant='h2'
					align='center'
					className={classes.heading}>
					Memories
				</Typography>
			</div>
			<Toolbar className={classes.toolbar}>
				{user ? (
					<div className={classes.profile}>
						<Avatar
							className={classes.purple}
							alt={user.result.name}
							src={user.result.imageUrl}>
							{}
							{user.result.name.charAt(0)}
						</Avatar>
						<Typography className={classes.userName} variant='h6'>
							{user.result.name}
						</Typography>
						<Button
							variant='contained'
							className={classes.logout}
							color='secondary'
							onClick={() => {}}>
							Logout
						</Button>
					</div>
				) : (
					<Button
						component={Link}
						to='/auth'
						variant='contained'
						color='primary'>
						Sign In
					</Button>
				)}
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;

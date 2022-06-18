import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import decode from 'jwt-decode';

import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import useStyles from './Navbar-styles';
import memories from '../../assets/images/memories.png';

const Navbar = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();
	const location = useLocation();

	const getUserData = JSON.parse(localStorage.getItem('profile'));
	const [user, setUser] = useState(getUserData);

	useEffect(() => {
		const token = user?.token;
		if (token) {
			const decodedToken = decode(token);
			if (decodedToken.exp * 1000 < new Date().getTime()) {
				logout();
			}
		}
		setUser(getUserData);
	}, [location]);

	const logout = () => {
		const action = { type: 'LOGOUT' };
		dispatch(action);
		history.push('/');
		setUser(null);
	};

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
							onClick={logout}>
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

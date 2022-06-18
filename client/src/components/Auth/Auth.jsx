import React, { useState } from 'react';
import {
	Avatar,
	Button,
	Paper,
	Grid,
	Typography,
	Container,
	TextField
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import AuthInput from './AuthInput';

import useStyles from './Auth-styles';

const Auth = () => {
	const [showPassword, setShowPassword] = useState(false);
	const classes = useStyles();

	const isSignUp = false;

	const submitHandler = () => {};

	const changeHandler = () => {};

	const showPasswordHandler = () => {
		setShowPassword(prevShowPassword => !prevShowPassword);
	};

	return (
		<Container component='main' maxWidth='xs'>
			<Paper className={classes.paper} elevation={3}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography variant='h5'>{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>

				<form className={classes.form} onSubmit={submitHandler}>
					<Grid container spacing={2}>
						{isSignUp && (
							<>
								<AuthInput
									half
									name='firstName'
									label='First Name'
									autoFocus
									type='text'
									changeHandler={changeHandler}
								/>

								<AuthInput
									half
									name='lastName'
									label='Last Name'
									type='text'
									changeHandler={changeHandler}
								/>
							</>
						)}
						<AuthInput
							type='email'
							name='email'
							label='Email Address'
							changeHandler={changeHandler}
						/>
						<AuthInput
							type={showPassword ? 'text' : 'password'}
							name='password'
							label='Password'
							changeHandler={changeHandler}
							showPasswordHandler={showPasswordHandler}
						/>
						{isSignUp && (
							<AuthInput
								type='password'
								name='confirmPassword'
								label='Confirm Password'
								changeHandler={changeHandler}
							/>
						)}
					</Grid>
					<Button
						type='submit'
						fullWidth
						variant='contained'
						color='primary'
						className={classes.submit}>
						{isSignUp ? 'Sign Up' : 'LogIn'}
					</Button>
				</form>
			</Paper>
		</Container>
	);
};

export default Auth;

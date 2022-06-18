import React, { useState } from 'react';
import {
	Avatar,
	Button,
	Paper,
	Grid,
	Typography,
	Container
} from '@material-ui/core';

import { GoogleLogin } from 'react-google-login';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import AuthInput from './AuthInput';
import Icon from './Icon';
import useStyles from './Auth-styles';

const Auth = () => {
	const GOOGLE_CLIENT_ID =
		'436240735931-j3fmpbdijgu07sqf2n7qk6r77b7bqls6.apps.googleusercontent.com';

	const [showPassword, setShowPassword] = useState(false);
	const [isSignUp, setIsSignUp] = useState(false);

	const classes = useStyles();

	const submitHandler = () => {};

	const changeHandler = () => {};

	const showPasswordHandler = () => {
		setShowPassword(prevShowPassword => !prevShowPassword);
	};

	const switchModeHandler = () => {
		setIsSignUp(prevIsSignUp => !prevIsSignUp);
		setShowPassword(false);
	};

	const googleSuccessHandler = res => {
		console.log(res);
	};

	const googleFailureHandler = () => {
		console.error('Google Sign In Failed. Try Again Later');
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
					<GoogleLogin
						clientId={GOOGLE_CLIENT_ID}
						render={renderProps => {
							<Button
								className={classes.googleButton}
								color='primary'
								variant='contained'
								fullWidth
								onClick={renderProps.onClick}
								disabled={renderProps.disabled}
								startIcon={<Icon />}>
								Google Sign In
							</Button>;
						}}
						onSuccess={googleSuccessHandler}
						onFailure={googleFailureHandler}
						cookiePolicy='single_host_origin'
					/>
					<Button
						type='submit'
						fullWidth
						variant='contained'
						color='primary'
						className={classes.submit}>
						{isSignUp ? 'Sign Up' : 'Sign In'}
					</Button>
					<Grid container justifyContent='flex-end'>
						<Grid item>
							<Button onClick={switchModeHandler}>
								{isSignUp
									? 'Already have an account? Sign In'
									: "Don't have an account? Sign Up"}
							</Button>
						</Grid>
					</Grid>
				</form>
			</Paper>
		</Container>
	);
};

export default Auth;

import React, { useState, useEffect } from 'react';
import {
	Avatar,
	Button,
	Paper,
	Grid,
	Typography,
	Container
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';

import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import AuthInput from './AuthInput';
import Icon from './Icon';
import useStyles from './Auth-styles';
import { AUTH } from '../../constants/actionTypes';
import { signUp, signIn } from '../../redux/actions/auth-action';

const initialFormState = {
	firstName: '',
	lastName: '',
	email: '',
	password: '',
	confirmPassword: ''
};

const Auth = () => {
	const GOOGLE_CLIENT_ID =
		'436240735931-ojsalitcfccqujidpog7q1asdli7hn9p.apps.googleusercontent.com';

	const [showPassword, setShowPassword] = useState(false);
	const [isSignUp, setIsSignUp] = useState(false);
	const [formData, setFormData] = useState(initialFormState);

	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		const start = () => {
			gapi.auth2.init({
				clientId: GOOGLE_CLIENT_ID,
				scope: ''
			});
		};
		gapi.load('client:auth2', start);
	});

	const classes = useStyles();

	const submitHandler = e => {
		e.preventDefault();
		if (isSignUp) {
			dispatch(signUp(formData, history));
		} else {
			dispatch(signIn(formData, history));
		}
	};

	const changeHandler = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const showPasswordHandler = () => {
		setShowPassword(prevShowPassword => !prevShowPassword);
	};

	const switchModeHandler = () => {
		setIsSignUp(prevIsSignUp => !prevIsSignUp);
		setShowPassword(false);
	};

	const googleSuccessHandler = async res => {
		try {
			const result = res?.profileObj;
			const token = res?.tokenId;
			const action = { type: AUTH, payload: { result, token } };
			dispatch(action);
			history.push('/');
		} catch (error) {
			console.error(error);
		}
	};

	const googleFailureHandler = error => {
		console.error(error);
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
					<Button
						type='submit'
						fullWidth
						variant='contained'
						color='primary'
						className={classes.submit}>
						{isSignUp ? 'Sign Up' : 'Sign In'}
					</Button>

					<div id='signInButton'>
						<GoogleLogin
							clientId={GOOGLE_CLIENT_ID}
							render={renderProps => (
								<Button
									className={classes.googleButton}
									color='primary'
									fullWidth
									onClick={renderProps.onClick}
									disabled={renderProps.disabled}
									startIcon={<Icon />}
									variant='contained'>
									Google Sign In
								</Button>
							)}
							onSuccess={googleSuccessHandler}
							onFailure={googleFailureHandler}
							cookiePolicy='single_host_origin'
						/>
					</div>

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

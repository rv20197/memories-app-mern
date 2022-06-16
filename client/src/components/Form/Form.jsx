import React from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';

import useStyles from './Form-styles';

const Form = () => {
	const classes = useStyles();

	const submitHandler = () => {};
	return (
		<Paper className={classes.paper}>
			<form
				autoComplete='off'
				noValidate
				className={classes.form}
				onSubmit={submitHandler}>
				<Typography variant='h6'>Creating Memory</Typography>
				<TextField
					name='creator'
					variant='outlined'
					label='Creator'
					fullWidth></TextField>
			</form>
		</Paper>
	);
};

export default Form;

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
	Grow,
	Grid,
	Container,
	Paper,
	AppBar,
	TextField,
	Button
} from '@material-ui/core';

import ChipInput from 'material-ui-chip-input';

import { useHistory, useLocation } from 'react-router-dom';

import { getPosts, getPostsBySearch } from '../../redux/actions/post-action';

import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Paginate from '../Paginate/Paginate';

import useStyles from './Home-styles';

const useQuery = () => {
	return new URLSearchParams(useLocation().search);
};

const Home = () => {
	const classes = useStyles();
	const [currentPostId, setCurrentPostId] = useState(null);
	const [search, setSearch] = useState('');
	const [tags, setTags] = useState([]);

	const dispatch = useDispatch();
	const query = useQuery();
	const history = useHistory();
	const page = query.get('page') || 1;
	const searchQuery = query.get('searchQuery');

	const searchHandler = e => setSearch(e.target.value);

	const keyPressHandler = e => {
		if (e.keyCode === 13) {
			searchPostHandler();
		}
	};

	const tagAddHandler = tagToAdd => setTags([...tags, tagToAdd]);

	const tagDeleteHandler = tagToDelete =>
		setTags(tags.filter(tag => tag !== tagToDelete));

	const searchPostHandler = () => {
		if (search.trim() || tags) {
			dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
			history.push(
				`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`
			);
		} else {
			history.push('/');
		}
	};

	return (
		<Grow in>
			<Container maxWidth='xl'>
				<Grid
					container
					className={classes.gridContainer}
					justifyContent='space-between'
					alignItems='stretch'
					spacing={4}>
					<Grid item xs={12} sm={6} md={9}>
						<Posts setCurrentPostId={setCurrentPostId} />
					</Grid>
					<Grid item xs={12} sm={6} md={3}>
						<AppBar
							className={classes.appBarSearch}
							position='static'
							color='inherit'>
							<TextField
								name='search'
								variant='outlined'
								label='Search Memories'
								fullWidth
								value={search}
								onChange={searchHandler}
								onKeyPress={keyPressHandler}
							/>

							<ChipInput
								style={{ margin: '10px 0' }}
								value={tags}
								label='Search Tags'
								variant='outlined'
								onAdd={chip => tagAddHandler(chip)}
								onDelete={chip => tagDeleteHandler(chip)}
							/>

							<Button
								onClick={searchPostHandler}
								className={classes.searchButton}
								color='primary'
								variant='contained'>
								Search
							</Button>
						</AppBar>

						<Form
							currentPostId={currentPostId}
							setCurrentPostId={setCurrentPostId}
						/>
						<Paper elevation={6} className={classes.pagination}>
							<Paginate page={page} />
						</Paper>
					</Grid>
				</Grid>
			</Container>
		</Grow>
	);
};

export default Home;

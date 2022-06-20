import React, { useEffect } from 'react';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { getPosts } from '../../redux/actions/post-action';

import useStyles from './Paginate-styles';

const Paginate = ({ page }) => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const { numberOfPages, currentPage } = useSelector(state => state.posts);

	useEffect(() => {
		if (page) {
			dispatch(getPosts(page));
		}
	}, [page]);

	return (
		<Pagination
			classes={{ ul: classes.ul }}
			count={numberOfPages}
			page={+page || 1}
			variant='outlined'
			color='primary'
			renderItem={item => (
				<PaginationItem
					{...item}
					component={Link}
					to={`/posts?page=${item.page}`}
				/>
			)}
		/>
	);
};

export default Paginate;

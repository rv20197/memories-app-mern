import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
	commentsOuterContainer: {
		display: 'flex',
		justifyContent: 'space-between',
		flexDirection: 'row'
	},
	commentsInnerContainer: {
		height: '200px',
		overflowY: 'auto',
		marginRight: '30px'
	}
}));

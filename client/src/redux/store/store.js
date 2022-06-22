import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import reducer from '../reducers/rootReducer';

const store = configureStore({ reducer: reducer, middleware: [thunk] });

export default store;

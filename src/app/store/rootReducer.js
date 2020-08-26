import { combineReducers } from 'redux';
import testReducer from '../../features/sandbox/testReducer';
import eventReducer from '../../features/events/eventReducer';
import modalReducer from '../common/modals/modalsReducer';
import authReducer from '../../features/auth/autReducer';
import asyncReducer from '../async/asyncReducer';

const rootReducer = combineReducers({
	test: testReducer,
	event: eventReducer,
	modals: modalReducer,
	auth: authReducer,
	async: asyncReducer,
});

export default rootReducer;

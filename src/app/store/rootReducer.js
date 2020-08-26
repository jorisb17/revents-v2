import { combineReducers } from 'redux';
import testReducer from '../../features/sandbox/testReducer';
import eventReducer from '../../features/events/eventReducer';
import modalReducer from '../common/modals/modalsReducer';
import authReducer from '../../features/auth/autReducer';

const rootReducer = combineReducers({
	test: testReducer,
	event: eventReducer,
	modals: modalReducer,
	auth: authReducer,
});

export default rootReducer;

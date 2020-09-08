import {
	LISTEN_TO_CURRENT_USRER_PROFILE,
	LISTEN_TO_SELECTED_USRER_PROFILE,
} from './profileConstants';

const initialState = {
	currentUserProfile: null,
	selectedUserProfile: null,
};

export default function profileReducer(
	state = initialState,
	{ type, payload }
) {
	switch (type) {
		case LISTEN_TO_CURRENT_USRER_PROFILE:
			return {
				...state,
				currentUserProfile: payload,
			};
		case LISTEN_TO_SELECTED_USRER_PROFILE:
			return {
				...state,
				selectedUserProfile: payload,
			};
		default:
			return state;
	}
}

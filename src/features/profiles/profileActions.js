import { LISTEN_TO_CURRENT_USRER_PROFILE, LISTEN_TO_SELECTED_USRER_PROFILE } from "./profileConstants";

export function listenToCurrentUserProfile(profile){
    return {
        type: LISTEN_TO_CURRENT_USRER_PROFILE,
        payload: profile
    }
}

export function listenToSelectedUserProfile(profile){
    return {
        type: LISTEN_TO_SELECTED_USRER_PROFILE,
        payload: profile
    }
}
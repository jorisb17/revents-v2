import { LISTEN_TO_CURRENT_USRER_PROFILE, LISTEN_TO_SELECTED_USRER_PROFILE, LISTEN_TO_USER_PHOTOS } from "./profileConstants";

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

export function listenToUserPhotos(photos){
    return {
        type: LISTEN_TO_USER_PHOTOS,
        payload: photos
    }
}
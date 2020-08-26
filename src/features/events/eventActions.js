import { CREATE_EVENT, UPDATE_EVENT, DELETE_EVENT, FETCH_EVENTS } from "./eventConstants";
import { asyncActionStart, asyncActionError, asyncActionFinish } from "../../app/async/asyncReducer";
import { toast } from "react-toastify";
import { fetchSampleData } from "../../app/api/mockApi";

export function loadEvents() {
    return async function(dispatch) {
        dispatch(asyncActionStart());
        try {
            const events = await fetchSampleData();
            dispatch({type: FETCH_EVENTS, payload: events});
            dispatch(asyncActionFinish());
        } catch (error) {
            dispatch(asyncActionError(error));
            toast.error(error)
        }
    }
}

export function createEvent(event) {
    return {
        type: CREATE_EVENT,
        payload: event
    }
}

export function updateEvent(event) {
    return {
        type: UPDATE_EVENT,
        payload: event
    }
}

export function deleteEvent(eventId) {
    return {
        type: DELETE_EVENT,
        payload: eventId
    }
}
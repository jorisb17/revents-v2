import firebase from '../config/firebase';
import cuid from 'cuid';

const db = firebase.firestore();

export function dataFromSnapshot(snapShot) {
	if (!snapShot.exists) return undefined;
	const data = snapShot.data();

	for (const prop in data) {
		if (data.hasOwnProperty(prop)) {
			if (data[prop] instanceof firebase.firestore.Timestamp) {
				data[prop] = data[prop].toDate();
			}
		}
	}

	return {
		...data,
		id: snapShot.id,
	};
}

export function listenToEventsFromFirestore() {
	return db.collection('events').orderBy('date');
}

export function listenToEventFromFirestore(eventId) {
	return db.collection('events').doc(eventId);
}

export function addEventToFirestore(event) {
    return db.collection('events').add({
        ...event,
        hostedBy: 'Diana',
        hostPhotoURL: 'https://randomuser.me/api/portraits/women/22.jpg',
        attendees: firebase.firestore.FieldValue.arrayUnion({
            id: cuid(),
            displayName: 'Diana',
            photoURL: 'https://randomuser.me/api/portraits/women/22.jpg'
        })
    })
}

export function updateEventFromFirestore(event) {
    return db.collection('events').doc(event.id).update(event);
}

export function deleteEventFromFirestore(eventId){
    return db.collection('events').doc(eventId).delete();
}

export function cancelEventToggle(event){
    return db.collection('events').doc(event.id).update({
        isCancelled: !event.isCancelled
    })
}

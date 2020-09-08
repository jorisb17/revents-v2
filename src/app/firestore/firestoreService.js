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
			photoURL: 'https://randomuser.me/api/portraits/women/22.jpg',
		}),
	});
}

export function updateEventFromFirestore(event) {
	return db.collection('events').doc(event.id).update(event);
}

export function deleteEventFromFirestore(eventId) {
	return db.collection('events').doc(eventId).delete();
}

export function cancelEventToggle(event) {
	return db.collection('events').doc(event.id).update({
		isCancelled: !event.isCancelled,
	});
}

export function setUserProfileData(user) {
	return db.collection('users').doc(user.uid).set({
		displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL || null,
		createdAt: firebase.firestore.FieldValue.serverTimestamp(),
	});
}

export function getUserProfile(userId){
	return db.collection('users').doc(userId);
}

export async function updateUserProfile(profile){
	const user = firebase.auth().currentUser;
	try {
		if (user.displayName !== profile.displayName) {
			await user.updateProfile({
				displayName: profile.displayName
			})
		}
		return await db.collection('users').doc(user.uid).update(profile);
	} catch (error) {
		throw error;
	}
}

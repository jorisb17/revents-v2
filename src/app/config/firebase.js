import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyDpZ9I5D7CrN3swao2798QtLCF0uAu7jWc',
	authDomain: 'revents-ceddc.firebaseapp.com',
	databaseURL: 'https://revents-ceddc.firebaseio.com',
	projectId: 'revents-ceddc',
	storageBucket: 'revents-ceddc.appspot.com',
	messagingSenderId: '893571546247',
	appId: '1:893571546247:web:dfad17786ae23bcf884c22',
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;

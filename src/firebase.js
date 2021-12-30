import firebase from 'firebase/app';
import 'firebase/auth';

// Your web app's Firebase configuration
const config = {
  apiKey: 'AIzaSyB0nw8zIuy2ipPl2i9KTa0vdUPDhKhMzUU',
  authDomain: 'mernstore.firebaseapp.com',
  projectId: 'mernstore',
  storageBucket: 'mernstore.appspot.com',
  messagingSenderId: '876599010111',
  appId: '1:876599010111:web:4b5b47861525e6fc14e98a',
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

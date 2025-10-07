// Import the required Firebase modules
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCdRkrhSNlh_O7WwR8DMB7ZzGFjDcxJLwo",
  authDomain: "flutterfire-6e119.firebaseapp.com",
  databaseURL: "https://flutterfire-6e119-default-rtdb.firebaseio.com",
  projectId: "flutterfire-6e119",
  storageBucket: "flutterfire-6e119.appspot.com",
  messagingSenderId: "137816430576",
  appId: "1:137816430576:android:593dd581606672cc3caf35"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Firebase Auth
const auth = getAuth(app);

export { app, db, auth };

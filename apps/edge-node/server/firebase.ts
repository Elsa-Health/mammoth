import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyCAYsdKuOZQIzNOXdfV5h9ke3bbpEeEFo0",
	authDomain: "elsa-providers.firebaseapp.com",
	projectId: "elsa-providers",
	storageBucket: "elsa-providers.appspot.com",
	messagingSenderId: "216946645875",
	appId: "1:216946645875:web:bb3cd1ff966fa2939f4306",
	measurementId: "G-37YC268TRB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);

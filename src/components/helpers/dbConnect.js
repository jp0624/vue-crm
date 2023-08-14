import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
	apiKey: import.meta.env.VITE_API_KEY,
	authDomain: "jp-vue-crm.firebaseapp.com",
	projectId: "jp-vue-crm",
	storageBucket: "jp-vue-crm.appspot.com",
	messagingSenderId: "24663279784",
	appId: "1:24663279784:web:6c714a4dda8d2ee1271a9d",
	measurementId: "G-F38XTB5F55",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app)

console.log("db: ", db)
export { db }

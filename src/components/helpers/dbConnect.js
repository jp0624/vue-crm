// Import necessary functions from Firebase SDK
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

// Firebase configuration object containing API keys and project details
const firebaseConfig = {
	apiKey: import.meta.env.VITE_API_KEY, // API key from environment variables
	authDomain: "jp-vue-crm.firebaseapp.com",
	projectId: "jp-vue-crm",
	storageBucket: "jp-vue-crm.appspot.com",
	messagingSenderId: "24663279784",
	appId: "1:24663279784:web:6c714a4dda8d2ee1271a9d",
	measurementId: "G-F38XTB5F55",
}

// Initialize Firebase app using the provided configuration
const app = initializeApp(firebaseConfig)

// Initialize Cloud Firestore and obtain a reference to the Firestore service
const db = getFirestore(app)

// Output a console log with the reference to the Firestore service
console.log("db: ", db)

// Export the Firestore reference for use in other parts of the application
export { db }

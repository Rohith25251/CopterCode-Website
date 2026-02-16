// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA54NrnwfseeRyEbhyqEQsCib94ELx9O04",
    authDomain: "coptercode-webs.firebaseapp.com",
    projectId: "coptercode-webs",
    storageBucket: "coptercode-webs.firebasestorage.app",
    messagingSenderId: "977572985549",
    appId: "1:977572985549:web:03dcc89bca16fbf9768784",
    measurementId: "G-12LDCFRCRH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

let analytics;
try {
    analytics = getAnalytics(app);
} catch (error) {
    console.warn("Firebase Analytics failed to initialize:", error);
}

let storage;
try {
    storage = getStorage(app);
} catch (error) {
    console.warn("Firebase Storage failed to initialize:", error);
}

export { storage, analytics };

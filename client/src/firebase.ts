import {initializeApp} from "firebase/app"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyAHg4KZ7U5pIrzBYkZ_Yjk1rLjwwvns0qs",
    authDomain: "connexs-a79ee.firebaseapp.com",
    projectId: "connexs-a79ee",
    storageBucket: "connexs-a79ee.appspot.com",
    messagingSenderId: "739384491662",
    appId: "1:739384491662:web:2520f3266ee7279d79d3df"
}

export const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
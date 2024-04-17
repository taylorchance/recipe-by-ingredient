import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
	apiKey: 'AIzaSyDfQ15XypxTf6dLegVYcjSVf9Xdvgiu8Lc',
  authDomain: 'recipe-scraper-98460.firebaseapp.com',
  projectId: 'recipe-scraper-98460',
  storageBucket: 'recipe-scraper-98460.appspot.com',
  messagingSenderId: '10449925781',
  appId: '1:10449925781:web:fec4f845e8b3e2a39f4d9c',
  measurementId: 'G-06J1V2CDXV'
}

export const app = initializeApp(firebaseConfig)
export const firestore = getFirestore(app)
export const auth = getAuth(app)
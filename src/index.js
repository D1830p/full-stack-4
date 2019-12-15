import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import firebase from 'firebase'
import 'firebase/firestore'
import App from './App'

const firebaseConfig = {
  apiKey: "AIzaSyBx3-4hQQXppdJI839HcT7jaepSMyRpHjk",
  authDomain: "voting-app-da.firebaseapp.com",
  databaseURL: "https://voting-app-da.firebaseio.com",
  projectId: "voting-app-da",
  storageBucket: "voting-app-da.appspot.com",
  messagingSenderId: "751418173468",
  appId: "1:751418173468:web:625a9e0c346f48adf997d9"
}

firebase.initializeApp(firebaseConfig)

ReactDOM.render(<App />, document.getElementById('root'))

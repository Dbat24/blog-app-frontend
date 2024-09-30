import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyDC_RqlagX0IIQqz8qX1PdI4f_FtcamfeM",
  authDomain: "dbat-blog.firebaseapp.com",
  projectId: "dbat-blog",
  storageBucket: "dbat-blog.appspot.com",
  messagingSenderId: "380069719403",
  appId: "1:380069719403:web:db4d8541a75c2d6e93702e"
};


const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

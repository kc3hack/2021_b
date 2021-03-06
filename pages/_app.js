import { React, useState, useEffect } from "react";

import "../styles/globals.css";
import "tailwindcss/tailwind.css";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faEdit, faCheck } from "@fortawesome/free-solid-svg-icons";

library.add(faEdit, faCheck);

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};
if (firebase.apps.length === 0) {
  firebase.initializeApp(config);
}

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

var storage_obj = firebase.storage();

export default MyApp;
export const storage = storage_obj;

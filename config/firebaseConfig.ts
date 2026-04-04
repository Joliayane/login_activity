import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyASJeqyhocf5tiEIKJPDpSvWg8-PAbwCI4",
  authDomain: "my-app-602c4.firebaseapp.com",
  projectId: "my-app-602c4",
  storageBucket: "my-app-602c4.firebasestorage.app",
  messagingSenderId: "365014435481",
  appId: "1:365014435481:web:d46fe58660f16b1c2e9a08",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
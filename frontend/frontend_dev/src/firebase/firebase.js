import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from "firebase/messaging";


const firebaseConfig = {
  apiKey: "AIzaSyAM2611U11HDXMOBTv7HL_WGfji71MPEGI",
  authDomain: "video-hosting-3564f.firebaseapp.com",
  projectId: "video-hosting-3564f",
  storageBucket: "video-hosting-3564f.appspot.com",
  messagingSenderId: "853915734812",
  appId: "1:853915734812:web:f6a10a898f60691274a0d9",
  measurementId: "G-DY3QKV2MLJ"
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);


export const fetchToken = (setTokenFound) => {
  return getToken(messaging, { vapidKey: 'BF1UfpCDbV3onNFVK4nVG6_diu5KdSAttn2ZMcOYS6e5d-Peah5_vOgRUnaiWC_zKRGQ5iK7qx2WZDInycyxClo' }).then((currentToken) => {
    if (currentToken) {
      console.log('current token for client: ', currentToken);
      setTokenFound(true);
    } else {
      console.log('No registration token available. Request permission to generate one.');
      setTokenFound(false);
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
  });
}

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
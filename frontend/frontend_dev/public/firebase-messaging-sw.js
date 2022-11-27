// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyAM2611U11HDXMOBTv7HL_WGfji71MPEGI",
  authDomain: "video-hosting-3564f.firebaseapp.com",
  projectId: "video-hosting-3564f",
  storageBucket: "video-hosting-3564f.appspot.com",
  messagingSenderId: "853915734812",
  appId: "1:853915734812:web:f6a10a898f60691274a0d9",
  measurementId: "G-DY3QKV2MLJ"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});
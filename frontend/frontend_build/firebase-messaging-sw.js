importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"),importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js");const firebaseConfig={apiKey:"AIzaSyAM2611U11HDXMOBTv7HL_WGfji71MPEGI",authDomain:"video-hosting-3564f.firebaseapp.com",projectId:"video-hosting-3564f",storageBucket:"video-hosting-3564f.appspot.com",messagingSenderId:"853915734812",appId:"1:853915734812:web:f6a10a898f60691274a0d9",measurementId:"G-DY3QKV2MLJ"};firebase.initializeApp(firebaseConfig);const messaging=firebase.messaging();messaging.onBackgroundMessage((function(i){console.log("Received background message ",i);const e=i.notification.title,s={body:i.notification.body};self.registration.showNotification(e,s)}));
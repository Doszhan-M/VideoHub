if(!self.define){let i,e={};const n=(n,c)=>(n=new URL(n+".js",c).href,e[n]||new Promise((e=>{if("document"in self){const i=document.createElement("script");i.src=n,i.onload=e,document.head.appendChild(i)}else i=n,importScripts(n),e()})).then((()=>{let i=e[n];if(!i)throw new Error(`Module ${n} didn’t register its module`);return i})));self.define=(c,o)=>{const s=i||("document"in self?document.currentScript.src:"")||location.href;if(e[s])return;let a={};const r=i=>n(i,s),d={module:{uri:s},exports:a,require:r};e[s]=Promise.all(c.map((i=>d[i]||r(i)))).then((i=>(o(...i),a)))}}define(["./workbox-460519b3"],(function(i){"use strict";self.skipWaiting(),i.clientsClaim(),i.precacheAndRoute([{url:"bundle.js",revision:"3655856a29ff55542dfc0b7a121b3c0f"},{url:"bundle.js.LICENSE.txt",revision:"bb08bc6f54b44dc3970c8b2be047245d"},{url:"favicon-96x96.png",revision:"50b49202b3b7816738415aac0911b3b1"},{url:"images/icons/android-icon-144x144.png",revision:"44171dffcf4e940e2c8b01150d0a8670"},{url:"images/icons/android-icon-192x192.png",revision:"ffd6c974e496b759926aaa0b2865fa7a"},{url:"images/icons/android-icon-36x36.png",revision:"99cb9b8ca043cd62dd209d210a10b3b4"},{url:"images/icons/android-icon-48x48.png",revision:"b536c71b81cc420ff4b9a5f7d2d8a7d1"},{url:"images/icons/android-icon-72x72.png",revision:"19781c0e0372d43abd37bdc05b1a0e8e"},{url:"images/icons/android-icon-96x96.png",revision:"50b49202b3b7816738415aac0911b3b1"},{url:"images/icons/apple-icon-180x180.png",revision:"61ebb70a7af51b4e4b80e2d5f7c58dad"},{url:"images/icons/apple-icon-precomposed.png",revision:"85c022e6d8a269971262aca03062ec92"},{url:"images/icons/apple-icon.png",revision:"85c022e6d8a269971262aca03062ec92"},{url:"images/icons/favicon-16x16.png",revision:"5b9ba427c98ce80cf8f371b1dcd38ecb"},{url:"images/icons/favicon-32x32.png",revision:"c71339a7c42c2dfce2cd1a39c7dae018"},{url:"images/icons/favicon-96x96.png",revision:"50b49202b3b7816738415aac0911b3b1"},{url:"images/icons/favicon.ico",revision:"f48e5be66e78ab22c9df0546d527be50"},{url:"images/icons/video512.png",revision:"945eb2c78eab7ef9dfd507d44d09da21"},{url:"index.html",revision:"389e60d0f75cc7a406c90b3d4a02412f"},{url:"manifest.json",revision:"ee1c2f46186680f16ab59c2930efc9f7"},{url:"robots.txt",revision:"f77c87f977e0fcce05a6df46c885a129"}],{})}));

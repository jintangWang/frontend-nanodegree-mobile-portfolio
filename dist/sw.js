/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "css/print.css",
    "revision": "5353af47734f45ae650d8fac36ec0007"
  },
  {
    "url": "img/2048.png",
    "revision": "91c5e509c0221c0e451b4005ca2db788"
  },
  {
    "url": "img/cam_be_like.jpg",
    "revision": "14c571df117507a0661d37d7b2c409d2"
  },
  {
    "url": "img/mobilewebdev.jpg",
    "revision": "337dba0f5f8fbd2e063046c67873fc16"
  },
  {
    "url": "img/profilepic.jpg",
    "revision": "11570b7821b94519f448e28a5ceb899f"
  },
  {
    "url": "index.html",
    "revision": "ad7cf01ba1838a412beadb2aed8592ee"
  },
  {
    "url": "project-2048.html",
    "revision": "942c81bac63049c1ce317162a95e7519"
  },
  {
    "url": "project-mobile.html",
    "revision": "adceb17e68dbcccc402ff138a0bb911d"
  },
  {
    "url": "project-webperf.html",
    "revision": "9d377e5529517e5b7990c41bc4d66c70"
  },
  {
    "url": "views/images/pizza.png",
    "revision": "2cd599b66e5f141cef05b9109e68d4da"
  },
  {
    "url": "views/images/pizzeria.jpg",
    "revision": "d1516c5a99a1f66c623d5247dc0624d3"
  },
  {
    "url": "views/pizza.html",
    "revision": "1a230ecbdee7ae1e9783413f4f4da063"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

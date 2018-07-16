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

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js");

importScripts(
  "/precache-manifest.0e3c46470dc477f9435df84e12f301e5.js"
);

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "fonts/BabelStoneOghamR.woff",
    "revision": "adb3e5d895fae0a9584bedcd68a9f24e"
  },
  {
    "url": "img/ogham-original.jpg",
    "revision": "3fc114f16381d8f052afce643b294b58"
  },
  {
    "url": "img/ogham.jpg",
    "revision": "99dcec4be3c3a72fdbad61240d6578c5"
  },
  {
    "url": "sw.js",
    "revision": "b00b8abdf8541dafbf6589820f5989d1"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

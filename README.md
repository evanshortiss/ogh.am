# ogh.am
This is the source for my online ogham transliterator progressive web
application (PWA) at https://ogh.am. Checkout the screenshots of it on iOS and
Android below!

![](https://github.com/evanshortiss/ogh.am/raw/master/screenshots/android-ios.png)


## About
I built this as a learning exercise for modern web tooling and PWAs and because
it was fun. I wanted to make it work entirely offline, including the generation
of an ogham image that could be downloaded on desktop and mobile - this was
accomplished using some neat (and rough around the edges) `<canvas/>` work.

Another neat part of this application is that it's tiny and loads quickly. This
could be pushed much further, but convenience and maintanability is always a
factor and given the size of the final bundle (30KB before gzip) I'm pretty
happy.

The code used to generate the ogham text is available via
[npm](https://www.npmjs.com/package/ogham) and
[GitHub](https://github.com/evanshortiss/ogham)

Enjoy, and feel free to give feedback or make PRs and Issues.

## Technologies
This web application was developed using the following:

* Preact
* TypeScript
* webpack
* Prettier
* Firebase
* BabelStone Fonts

See the `package.json` for a full list of dependencies.


## Running Locally
Node.js v6 and above is required to run this project. You can run this locally
by issuing the following commands:

```
$ npm install
$ npm start
```

<h1 align="center">
  Ogham
</h1>
<h3 align="center">ᚆᚓᚂᚂᚑ</h3>
<h3 align="center">
  <a href="https://ogh.am">ogh.am</a>
</h3>

## Usage
You can view the live website at [ogh.am](https://ogh.am) and easily
transliterate latin characters to Ogham.

## About
This is the source for my online ogham transliterator progressive web
application (PWA) at https://ogh.am. Checkout the screenshot of it on iOS below!

![](https://github.com/evanshortiss/ogh.am/raw/master/screenshots/android-ios.png)

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
This web application was developed with ❤️ using the following:

* [Preact](https://preactjs.com/)
* [TypeScript](https://www.typescriptlang.org/)
* [webpack](https://webpack.js.org/)
* [Prettier](https://prettier.io/)
* [Firebase](https://firebase.google.com/)
* [Workbox](https://developers.google.com/web/tools/workbox/)
* [BabelStone Fonts](http://www.babelstone.co.uk/Ogham/)
* [Skeleton](http://getskeleton.com/)

See the `package.json` for a full list of dependencies.


## Running Locally
Node.js v6 and above is required to run this project. You can run this locally
by issuing the following commands:

```
$ npm install
$ npm start
```

Changes to anything in the `src/` folder are watched and automatically compiled,
so just refresh or force refresh to view changes.


## Generating Font Face Subset

```
npm install -g glyphhanger
pip install fonttools
glyphhanger http://localhost:3030 --subset=*.woff > glyphs
pyftsubset ./public/fonts/BabelStoneOghamR.woff --unicodes-file=./glyphs --flavor=woff
```

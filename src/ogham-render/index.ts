import { isAppleMobileDevice } from '../util';

export default function createOghamImageCanvas(
  text: string
): HTMLCanvasElement {
  // See this stackoverflow answer for reasoning on pixel ratio:
  // stackoverflow.com/questions/15661339/
  const PIXEL_RATIO = (function() {
    const ctx = document.createElement('canvas').getContext('2d');

    // Need to cast since the various backing stores a not typed correctly
    const _ctx: any = ctx;

    const dpr = window.devicePixelRatio || 1;
    const bsr =
      _ctx.webkitBackingStorePixelRatio ||
      _ctx.mozBackingStorePixelRatio ||
      _ctx.msBackingStorePixelRatio ||
      _ctx.oBackingStorePixelRatio ||
      _ctx.backingStorePixelRatio ||
      1;

    return dpr / bsr;
  })();

  let BASE_WIDTH = 1200;
  let BASE_HEIGHT = 1900;

  if (isAppleMobileDevice()) {
    // iOS image gallery doesn't handle images that aren't sqaure or the same
    // aspect ratio as the screen well, so just match it for simplicity
    BASE_WIDTH = window.innerWidth;
    BASE_HEIGHT = window.innerWidth;
  }

  const canvasEl = createHighDpiCanvas(BASE_WIDTH, BASE_HEIGHT);
  const ctx = canvasEl.getContext('2d');
  const oghamFontSize = getFontSize();

  const MIDPOINT_W = canvasEl.width / PIXEL_RATIO / 2;
  const MIDPOINT_H = canvasEl.height / PIXEL_RATIO / 2;
  const TOP_LABEL = '↑ this way up for vertical orientation ↑';
  const SIDE_LABEL = '↑ this way up for horizontal orientation ↑';

  // Fill with a white background
  ctx.fillStyle = 'white';
  ctx.fillRect(
    0,
    0,
    canvasEl.width * PIXEL_RATIO,
    canvasEl.height * PIXEL_RATIO
  );

  ctx.fillStyle = 'black';
  ctx.font = getTextFont();

  const fontHeight = ctx.measureText('M').width;
  const topLabelWidth = ctx.measureText(TOP_LABEL).width;
  const sideabelWidth = ctx.measureText(SIDE_LABEL).width;

  // Draw the ogham centered (as centered as possible anyways...)
  ctx.save();
  ctx.font = `${oghamFontSize / PIXEL_RATIO}px 'BabelStone Ogham'`;
  ctx.translate(
    // The width of an "M" close to the height of a line so we use that.
    // The magic numbers here are used to center the text as best we can
    MIDPOINT_W + ctx.measureText('M').width / 2.5,
    MIDPOINT_H + ctx.measureText(text).width / 2
  );
  ctx.rotate(-90 * Math.PI / 180);
  ctx.fillText(text, 0, 0);
  ctx.restore();

  // Add top label for vertical orientation
  ctx.save();
  ctx.font = getTextFont();
  ctx.fillText(TOP_LABEL, MIDPOINT_W - topLabelWidth / 2, fontHeight);
  ctx.restore();

  // Add side label for horizontal orientation
  ctx.translate(MIDPOINT_W, MIDPOINT_H + sideabelWidth / 2);
  ctx.rotate(-90 * Math.PI / 180);
  ctx.font = getTextFont();
  ctx.fillText(SIDE_LABEL, 0, -MIDPOINT_W + fontHeight);

  /**
   * Creates a high DPI canvas so images/text render smoothly
   * @param w
   * @param h
   */
  function createHighDpiCanvas(w: number, h: number) {
    const canvasEl = document.createElement('canvas');

    canvasEl.width = w * PIXEL_RATIO;
    canvasEl.height = h * PIXEL_RATIO;
    canvasEl.style.width = `${w} + px`;
    canvasEl.style.height = `${h} + px`;
    canvasEl
      .getContext('2d')
      .setTransform(PIXEL_RATIO, 0, 0, PIXEL_RATIO, 0, 0);

    return canvasEl;
  }

  /**
   * Returns a new font size that's 1% smaller than the last.
   * Will be called recusively until an appropriate font size is found.
   * @param previous
   */
  function getFontSize(previous = 1000) {
    const fontSize = previous * 0.99;

    return isTextWithinCanvas(fontSize) ? fontSize : getFontSize(fontSize);
  }

  function getTextFont() {
    return `${canvasEl.height * 0.02 / PIXEL_RATIO}px Arial`;
  }

  /**
   * Determines if a given piece of text can fit inside
   * the canvas at the given font size
   * @param size
   */
  function isTextWithinCanvas(size: number) {
    ctx.font = `${Math.floor(size)}px BabelStone Ogham`;

    const textWidth = ctx.measureText(text).width;
    const canvasHeight = canvasEl.height;

    return textWidth < canvasHeight * 0.95;
  }

  return canvasEl;
}

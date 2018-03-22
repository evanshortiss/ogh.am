export function isAppleMobileDevice() {
  return navigator.userAgent.match(/iphone|ipad|ipad/gi) ? true : false;
}

export function isAndroidMobileDevice() {
  return navigator.userAgent.match(/android/gi) ? true : false;
}

export function isMobileDevice() {
  return isAndroidMobileDevice() || isAppleMobileDevice();
}

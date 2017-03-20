
let isFirefox;
let isInternetExplorer;
let isSafari;

export function detectFirefox() {
  if (isFirefox !== undefined) return isFirefox;
  if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
    isFirefox = true;
    return isFirefox;
  }
  isFirefox = false;
  return isFirefox;
}

export function detectIE() {
  if (isInternetExplorer !== undefined) return isInternetExplorer;
  if (navigator.userAgent.match(/MSIE|Trident|Edge/ig)) {
    isInternetExplorer = true;
    return isInternetExplorer;
  }
  isInternetExplorer = false;
  return isInternetExplorer;
}

export function detectSafari() {
  if (isSafari !== undefined) return isSafari;
  if (navigator.userAgent.toLowerCase().indexOf('safari') > -1) {
    isSafari = true;
    return isSafari;
  }
  isSafari = false;
  return isSafari;
}

export function throttle(callback, limit) {
  let wait = false;
  return function setWait() {
    if (!wait) {
      callback.apply(null, arguments); // eslint-disable-line prefer-rest-params
      wait = true;
      setTimeout(() => {
        wait = false;
      }, limit);
    }
  };
}

export function setDragScroll() {
  document.addEventListener('dragover', throttle((e) => {
    const dragEvent = e || window.event;
    const dragY = dragEvent.clientY;
    const wh = window.innerHeight;
    const currentTop = detectFirefox() ?
      document.documentElement.scrollTop :
      document.body.scrollTop;
    if (wh - 150 < dragY) {
      if (detectFirefox()) {
        document.documentElement.scrollTop = currentTop + 1;
      }
      document.body.scrollTop = currentTop + 1;
    } else if (dragY < 150) {
      if (detectFirefox()) {
        document.documentElement.scrollTop = currentTop - 1;
      }
      document.body.scrollTop = currentTop - 1;
    }
    return null;
  }, 25), false);
}

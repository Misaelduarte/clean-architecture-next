Object.defineProperty(document, 'doctype', {
  value: '<!DOCTYPE html>',
});

let cookies = {};

Object.defineProperty(
  window.document,
  'cookie',
  (function (_value) {
    return {
      get: function _get() {
        return cookies;
      },
      set: function _set(v) {
        cookies = v;
      },
      configurable: true,
    };
  })(window.navigator.cookieEnabled)
);

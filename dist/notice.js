var Notice = (function () {
'use strict';

var openElement = void 0;

function close() {
  openElement.parentNode.removeChild(openElement);
  openElement = null;
}

function closeTimeout(timeout) {
  return setTimeout(close, timeout);
}

function notify(message) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$anchor = _ref.anchor,
      anchor = _ref$anchor === undefined ? 'top' : _ref$anchor,
      _ref$container = _ref.container,
      container = _ref$container === undefined ? 'body' : _ref$container,
      _ref$level = _ref.level,
      level = _ref$level === undefined ? 'info' : _ref$level,
      _ref$closeText = _ref.closeText,
      closeText = _ref$closeText === undefined ? 'Close alert' : _ref$closeText,
      _ref$showClose = _ref.showClose,
      showClose = _ref$showClose === undefined ? false : _ref$showClose,
      _ref$timeout = _ref.timeout,
      timeout = _ref$timeout === undefined ? 5000 : _ref$timeout;

  // Close any open ones
  close();

  if (message === 'close' || !message) {
    return;
  }

  var role = 'status';
  var live = 'polite';
  var timeoutId = null;

  if (level === 'warning' || level === 'error') {
    role = 'alert';
    live = 'assertive';
  }

  openElement = document.createElement('div');
  openElement.setAttribute('role', role);
  openElement.setAttribute('aria-live', live);
  addClass(openElement, 'notice');
  addClass(openElement, 'notice-' + level);
  addClass(openElement, 'notice-anchor-' + anchor);

  var html = '<span class="notice-text">' + message + '</span>';

  if (showClose) {
    html += '<button class="notice-close" aria-label="' + closeText + '"></button>';
  }

  findOne(container).appendChild(openElement);

  if (typeof timeout === 'number') {
    timeoutId = closeTimeout(timeout);

    hover(openElement, function () {
      clearTimeout(timeoutId);
    }, function () {
      timeoutId = closeTimeout(timeout);
    });
  }
}

return notify;

}());

//# sourceMappingURL=notice.js.map
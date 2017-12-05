var Notice = (function () {
'use strict';

function findOne(selector, el) {
  var found = find(selector, el);

  if (found.length) {
    return found[0];
  }

  return null;
}

function isWindow(obj) {
  return obj != null && obj === obj.window;
}

function find(selector) {
  var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  if (selector instanceof HTMLElement || selector instanceof Node || isWindow(selector)) {
    return [selector];
  } else if (selector instanceof NodeList) {
    return [].slice.call(selector);
  } else if (typeof selector === 'string') {
    var startElement = context ? findOne(context) : document;
    return [].slice.call(startElement.querySelectorAll(selector));
  }
  return [];
}

function on(selector, event, cb) {
  var capture = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  if (Array.isArray(selector)) {
    selector.forEach(function (item) {
      return on(item, event, cb, capture);
    });
    return;
  }

  var data = {
    cb: cb,
    capture: capture
  };

  if (!window._domassistevents) {
    window._domassistevents = {};
  }

  window._domassistevents['_' + event] = data;
  var el = find(selector);
  if (el.length) {
    el.forEach(function (item) {
      item.addEventListener(event, cb, capture);
    });
  }
}

var NativeCustomEvent = window.CustomEvent;

//
// Check for the usage of native support for CustomEvents which is lacking
// completely on IE.
//
function canIuseNativeCustom() {
  try {
    var p = new NativeCustomEvent('t', {
      detail: {
        a: 'b'
      }
    });
    return p.type === 't' && p.detail.a === 'b';
  } catch (e) {
    return false;
  }
}

// Lousy polyfill for the Custom Event constructor for IE.
var IECustomEvent = function CustomEvent(type, params) {
  var e = document.createEvent('CustomEvent');

  if (params) {
    e.initCustomEvent(type, params.bubbles, params.cancelable, params.detail);
  } else {
    e.initCustomEvent(type, false, false, undefined);
  }

  return e;
};

var DomassistCustomEvent = canIuseNativeCustom() ? NativeCustomEvent : IECustomEvent;

function hover(el, enter, exit) {
  on(el, 'mouseenter', enter);
  on(el, 'mouseleave', exit);
}

var SCROLLABLE_CONTAINER = void 0;

function getScrollableContainer() {
  if (SCROLLABLE_CONTAINER) {
    return SCROLLABLE_CONTAINER;
  }

  var documentElement = window.document.documentElement;
  var scrollableContainer = void 0;

  documentElement.scrollTop = 1;

  if (documentElement.scrollTop === 1) {
    documentElement.scrollTop = 0;
    scrollableContainer = documentElement;
  } else {
    scrollableContainer = document.body;
  }

  SCROLLABLE_CONTAINER = scrollableContainer;

  return scrollableContainer;
}

SCROLLABLE_CONTAINER = getScrollableContainer();

/* global DocumentTouch */

function append(selector, value) {
  if (Array.isArray(selector)) {
    return selector.forEach(function (item) {
      return append(item, value);
    });
  }
  var els = find(selector);
  if (els.length) {
    els.forEach(function (el) {
      if (typeof value === 'string') {
        el.insertAdjacentHTML('beforeend', value);
      } else {
        el.appendChild(value);
      }
    });
  }
}

function Notice(message) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var config = {
    container: options.container || 'body',
    timeout: options.timeout || 5000,
    level: options.level || 'default', // level: default, info, success, error, warning
    showClose: options.showClose || true
  };

  var timeout = void 0;

  // Throws errors on test, need polyfill
  // Object.assign(config, options);

  var noticeWrapper = document.querySelector('.notice-wrapper');

  if (!noticeWrapper) {
    noticeWrapper = document.createElement('div');
    noticeWrapper.classList.add('notice-wrapper');
    append(config.container, noticeWrapper);
  }

  var noticeElem = document.createElement('div');
  noticeElem.classList.add('notice', 'notice-' + config.level);
  noticeWrapper.appendChild(noticeElem);

  var textElem = document.createElement('span');
  textElem.classList.add('notice-text');

  var textElemContent = document.createTextNode(message);
  textElem.appendChild(textElemContent);
  noticeElem.appendChild(textElem);

  function close() {
    if (timeout) {
      clearTimeout(timeout);
    }

    noticeElem.remove();
  }

  if (config.showClose) {
    var closeElem = document.createElement('div');
    closeElem.classList.add('notice-close');
    noticeElem.appendChild(closeElem);
    on(closeElem, 'click', function () {
      return close();
    });
  }

  function closeTimeout() {
    timeout = setTimeout(function () {
      return close();
    }, config.timeout);
  }

  hover(noticeElem, function () {
    return clearTimeout(timeout);
  }, function () {
    return closeTimeout();
  });

  closeTimeout();
}

return Notice;

}());

//# sourceMappingURL=notice.js.map
import { addClass, findOne, hover } from 'domassist';

let openElement;

function close() {
  openElement.parentNode.removeChild(openElement);
  openElement = null;
}

function closeTimeout(timeout) {
  return setTimeout(close, timeout);
}

export default function notify(message, {
  anchor = 'top',
  container = 'body',
  level = 'info',
  closeText = 'Close alert',
  showClose = false,
  timeout = 5000
} = {}) {
  // Close any open ones
  close();

  if (message === 'close' || !message) {
    return;
  }

  let role = 'status';
  let live = 'polite';
  let timeoutId = null;

  if (level === 'warning' || level === 'error') {
    role = 'alert';
    live = 'assertive';
  }

  openElement = document.createElement('div');
  openElement.setAttribute('role', role);
  openElement.setAttribute('aria-live', live);
  addClass(openElement, 'notice');
  addClass(openElement, `notice-${level}`);
  addClass(openElement, `notice-anchor-${anchor}`);

  let html = `<span class="notice-text">${message}</span>`;

  if (showClose) {
    html += `<button class="notice-close" aria-label="${closeText}"></button>`;
  }

  openElement.innerHTML = html;

  findOne(container).appendChild(openElement);

  if (typeof timeout === 'number') {
    timeoutId = closeTimeout(timeout);

    hover(openElement, () => {
      clearTimeout(timeoutId);
    }, () => {
      timeoutId = closeTimeout(timeout);
    });
  }
}

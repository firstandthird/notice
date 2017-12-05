import { append, on, hover } from 'domassist';

export default function Notice(message, options = {}) {
  const config = {
    container: options.container || 'body',
    timeout: options.timeout || 5000,
    level: options.level || 'default', // level: default, info, success, error, warning
    showClose: options.showClose || true
  };

  let timeout;

  // Throws errors on test, need polyfill
  // Object.assign(config, options);

  let noticeWrapper = document.querySelector('.notice-wrapper');

  if (!noticeWrapper) {
    noticeWrapper = document.createElement('div');
    noticeWrapper.classList.add('notice-wrapper');
    append(config.container, noticeWrapper);
  }

  const noticeElem = document.createElement('div');
  noticeElem.classList.add('notice', `notice-${config.level}`);
  noticeWrapper.appendChild(noticeElem);

  const textElem = document.createElement('span');
  textElem.classList.add('notice-text');

  const textElemContent = document.createTextNode(message);
  textElem.appendChild(textElemContent);
  noticeElem.appendChild(textElem);

  function close() {
    if (timeout) {
      clearTimeout(timeout);
    }

    noticeElem.remove();
  }

  if (config.showClose) {
    const closeElem = document.createElement('div');
    closeElem.classList.add('notice-close');
    noticeElem.appendChild(closeElem);
    on(closeElem, 'click', () => close());
  }

  function closeTimeout() {
    timeout = setTimeout(() => close(), config.timeout);
  }

  hover(noticeElem, () => clearTimeout(timeout), () => closeTimeout());

  closeTimeout();
}

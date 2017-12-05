/*eslint new-cap: ["error", { "capIsNewExceptions": ["Notice"] }]*/

import Notice from '../index';
import test from 'tape-rollup';
import { find, findOne } from 'domassist';

const init = () => {
  const container = document.createElement('div');
  container.id = 'fixture';
  document.body.appendChild(container);
};

const setup = () => {
  const container = document.getElementById('fixture');
  return container;
};

const teardown = () => {
  const container = setup();
  find('.notice', container).forEach(notice => notice.remove());
};

init();

test('Notices container is added to document', assert => {
  const c = setup();

  Notice('test', {
    container: c,
    level: 'info'
  });

  assert.ok(findOne('.notice-wrapper', c), 'notices wrapper is created correctly');

  teardown();
  assert.end();
});

test('Notices are added to notices container', assert => {
  const c = setup();

  Notice('test', {
    container: c,
    level: 'info'
  });

  Notice('test', {
    container: c,
    level: 'info'
  });

  assert.equals(find('.notice', c).length, 2, 'notices are created correctly');

  teardown();
  assert.end();
});

test('Notices text is addded', assert => {
  const c = setup();

  Notice('Test message', {
    container: c,
    level: 'info'
  });

  assert.equals(findOne('.notice', c).textContent, 'Test message', 'notices text is correct');

  teardown();
  assert.end();
});

test('Notices are automatically closed', assert => {
  const c = setup();

  Notice('Test message', {
    container: c,
    level: 'info',
    timeout: 200
  });

  setTimeout(() => {
    assert.notOk(find('.notice', c).length, 'notice is correctly removed');

    teardown();
    assert.end();
  }, 500);
});

test('Notices are closed by button click', assert => {
  const c = setup();

  Notice('Test message', {
    container: c,
    level: 'info',
    timeout: 200
  });

  findOne('.notice-close', c).click();

  assert.notOk(find('.notice', c).length, 'notice is correctly removed on close click');

  teardown();
  assert.end();
});

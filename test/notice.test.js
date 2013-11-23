suite('notice', function() {
  teardown(function() {
    $('.notice').remove();
  });

  suite('init', function() {
    test('should have notice method', function() {
      assert.ok(typeof $.notice === 'function');
    });
  });

  suite('display', function() {
    setup(function() {
      $.notice('test notice');
    });
    test('notice container should exist', function() {
      assert.equal($('.notice').length, 1);
    });

    test('notice should contain passed text', function() {
      assert.equal($('.notice .notice-text').text(), 'test notice');
    });
  });

  suite('levels', function() {
    var levels = $.notice.defaults.levels;

    function testLevel(level) {
      test('level: ' + level, function() {
        $.notice('test notice', {
          level: level
        });

        assert.ok($('.notice').hasClass('notice-'+level));
      });
    }

    for(var level in levels) {
      testLevel(level);
    }
  });
});
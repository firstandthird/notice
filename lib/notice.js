!function($) {
  $.notice = function(message, options) {

    var opts = $.extend({}, $.notice.defaults, options);
    var el, timeout;

    var close = function() {
      if (timeout)
        clearTimeout(timeout);
      el.animate({ top: '-'+(opts.height) }, {
          complete: function() {
            $(this).remove();
          }
        });
    };

    el = $(opts.template)
      .css({
        position: 'fixed',
        top: '-'+(opts.height),
        height: opts.height,
        width: '100%',
        'line-height': opts.height,
        'text-align': 'center'
      })
      .addClass((opts.level)?'notice-'+opts.level:false)
      .find('.notice-text')
        .html(message)
        .end()
      .find('.notice-close')
        .on('click', function() {
          close();
        })
        .end()
      .appendTo('body')
      .animate({ top: 0 });

    if (typeof opts.timeout === 'number') {
      timeout = setTimeout(function() {
        close();
      }, opts.timeout);
    }

  };

  $.notice.defaults = {
    template: '<div class="notice"><span class="notice-text"></span><div class="notice-close"></div></div>',
    height: '30px',
    timeout: 5000,
    level: 'error'
  };
}(window.jQuery || window.Zepto);

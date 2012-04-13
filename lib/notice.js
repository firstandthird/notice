!function($) {
  $.notice = function(message, options) {

    var opts = $.extend({}, $.notice.defaults, options);
    var el, timeout;

    var close = function() {
      if (timeout)
        clearTimeout(timeout);
      
      $('.notice').animate({ top: '-'+(opts.height)+'px' }, {
          complete: function() {
            $(this).remove();
          }
        });
    };
    //close any open messages
    close();

    if (message == 'close') {
      return;
    }


    var top = opts.height + opts.offsetTop;
    el = $(opts.template)
      .css({
        position: 'fixed',
        top: '-'+(top)+'px',
        height: opts.height+'px',
        width: '100%',
        'line-height': opts.height+'px',
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
      .appendTo(opts.container)
      .animate({ top: opts.offsetTop });

    if (typeof opts.timeout === 'number') {
      timeout = setTimeout(function() {
        close();
      }, opts.timeout);
    }

    return el;
  };

  $.notice.defaults = {
    container: 'body',
    template: '<div class="notice"><span class="notice-text"></span><div class="notice-close"></div></div>',
    height: 30,
    timeout: 5000,
    level: 'error',
    offsetTop: 0,
  };
}(window.jQuery || window.Zepto);

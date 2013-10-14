(function($) {
  var timeout;
  $.notice = function(message, options) {

    var animationOffset = '10px';
    var opts = $.extend({}, $.notice.defaults, options);
    var el;

    var close = function() {
      if (timeout) {
        clearTimeout(timeout);
      }

      $('.notice').animate({ opacity: 0, top: '-='+animationOffset }, {
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

    var container = $(opts.container);
    var containerOffset = container.offset();

    el = $(opts.template)
      .css({
        zIndex: opts.zIndex,
        overflow: 'hidden',
        position: 'fixed',
        top: opts.offsetTop || containerOffset.top,
        padding: opts.padding,
        display: 'block',
        margin: '0 auto',
        opacity: 0,
        'border-radius': opts.borderRadius,
        'line-height': opts.height+'px',
        'text-align': 'center',
        background: opts.levels[opts.level].background,
        color: opts.levels[opts.level].foreground
      })
      .addClass((opts.level)?'notice-'+opts.level:false)
      .find('.notice-text')
        .html(message)
        .end()
      .find('.notice-close')
        .css({
          display: (opts.showClose) ? 'block' : 'none'
        })
        .on('click', function() {
          close();
        })
        .end()
      .appendTo(container);
    el.css({
        left: ((container.width() - el.width()) / 2) + containerOffset.left,
        top: '-='+animationOffset
      })
      .animate({ opacity: 0.9, top: '+='+animationOffset });

    if (typeof opts.timeout === 'number') {
      timeout = setTimeout(function() {
        close();
      }, opts.timeout);
    }

    return el;
  };

  $.notice.defaults = {
    //container to append notice to
    container: 'body',
    //template (shouldn't be changed)
    template: '<div class="notice"><span class="notice-text"></span><div class="notice-close"></div></div>',
    //height of notice
    height: 30,
    //timeout before auto closing, set to false to disable auto close
    timeout: 5000,
    //level (info, success, error)
    level: 'info',
    //top offset for notice
    offsetTop: 0,
    zIndex: 1000,
    showClose: false,
    borderRadius: '10px',
    padding: '10px 20px 10px 20px',
    levels: {
      info: {
        background: '#333',
        foreground: '#fff'
      },
      success: {
        background: '#dff0d8',
        foreground: '#3d6c2a'
      },
      warning: {
        background: '#f9fad2',
        foreground: '#888b0f'
      },
      error: {
        background: '#f2dede',
        foreground: '#712d2d'
      }
    }

  };
})(window.jQuery || window.Zepto);

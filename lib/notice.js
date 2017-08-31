(function($) {
  var timeout;
  $.notice = function(message, options) {

    var animationOffset = 10;
    var opts = $.extend({}, $.notice.defaults, options);
    var el;

    // offsetTop is deprecated.
    // This should be removed in a few versions.
    if(opts.offsetTop !== 0) {
      opts.offset = opts.offsetTop;
    }

    var close = function() {
      if (timeout) {
        clearTimeout(timeout);
      }

      var animateProps = {
        opacity: 0
      };

      if(opts.anchor === 'top') {
        animateProps.top = '-=' + animationOffset;
      } else {
        animateProps.bottom = '-=' + animationOffset;
      }

      $('.notice').animate(animateProps, {
        complete: function() {
          $(this).remove();
        }
      });
    };

    var closeTimeout = function() {
      if (typeof opts.timeout === 'number') {
        timeout = setTimeout(function() {
          close();
        }, opts.timeout);
      }
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

    var alignment = {
      left: ((container.width() - el.width()) / 2) + containerOffset.left
    };

    var animateProps = {
      opacity: 0.9
    };

    if(opts.anchor === 'top') {
      alignment.top = (opts.offset || containerOffset.top) - animationOffset;
      animateProps.top = '+=' + animationOffset;
    } else {
      alignment.bottom = opts.offsetBottom - animationOffset;
      animateProps.bottom = '+=' + (opts.offset + ~~animationOffset);
    }

    el.css(alignment)
      .animate(animateProps);

    closeTimeout();

    // Stop timeout on hover, restart on mouse leave
    $(el).hover(
      function() {
        clearTimeout(timeout);
      }, function() {
        closeTimeout();
      }
    );

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
    offsetTop: 0,
    offset: 0,
    anchor: 'top',
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

/*!
  * notice - a jQuery notification plugin 
  * v0.1.0
  * https://github.com/jgallen23/notice
  * copyright JGA 2012
  * MIT License
  */

(function($) {
  var timeout;
  $.notice = function(message, options) {

    var opts = $.extend({}, $.notice.defaults, options);
    var el;

    var close = function() {
      if (timeout) {
        clearTimeout(timeout);
      }
      
      $('.notice').animate({ height: 0 }, {
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


    el = $(opts.template)
      .css({
        overflow: 'hidden',
        position: 'fixed',
        top: opts.offsetTop,
        left: opts.offsetLeft,
        height: 0,
        width: opts.width,
        margin: '0 auto',
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
      .animate({ height: opts.height+'px'});

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
    level: 'info',
    offsetTop: 0,
    offsetLeft: 0,
    width: '100%'
  };
})(window.jQuery || window.Zepto);

/*!
 * notice - a jQuery notification plugin
 * v0.3.1
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

    var container = $(opts.container);
    var containerOffset = container.offset();
    el = $(opts.template)
      .css({
        zIndex: '1000',
        overflow: 'hidden',
        position: 'fixed',
        top: opts.offsetTop || containerOffset.top,
        left: containerOffset.left,
        height: 0,
        width: container.width(),
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
      .appendTo(container)
      .animate({ height: opts.height+'px'});

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
    offsetTop: 0
  };
})(window.jQuery || window.Zepto);

var mustache = require('mustache');


/**
 * must be possible for multiple instances
 */
var Spin = function (container) {
  $(container).html(mustache.render('<div class="{{class}}"></div>', {'class': 'ajax-loading-indicator'}));
};


module.exports = Spin;

var $ = require('jquery');
var mustache = require('mustache');


/**
 * must be possible for multiple instances
 * each can be controlled independently
 */
var Spin = function (container) {
  $(container).html(mustache.render('<div class="{{class}}"></div>', {'class': 'ajax-loading-indicator'}));
};


module.exports = Spin;




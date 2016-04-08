(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
var $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);
var mustache = (typeof window !== "undefined" ? window['Mustache'] : typeof global !== "undefined" ? global['Mustache'] : null);
var getMotionEventName = require('./utility/getMotionEventName');

var Carousel = function() {};

Carousel.prototype.create = function(options) {
  var defaults = {
    current: 1, // will it auto scroll forwards?
    container: $(this), // jquery selection of container
    items: $(this), // jquery selection of items
    auto: true, // will it auto scroll forwards?
    autoInterval: 5000, // will it auto scroll forwards?
    loop: true, // will it go back to 1 when passing the end?
    templateContainer: '', // mustache
    templateSingle: '' // mustache
  };
  this.options = $.extend(defaults, options);
  this.autoTimeoutId;

  // auto
  if (this.options.auto) {
    this.autoTimeoutId = setInterval(this.next, this.autoInterval);
  };
};

Carousel.prototype.next = function(something) {
  console.log(something, this);
};

module.exports = Carousel;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./utility/getMotionEventName":7}],2:[function(require,module,exports){
(function (global){
var $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);
require('./test/utility/testUrl');
var feedbackQueueFactory = require('./feedbackQueue');
var scrollSmoothFactory = require('./scrollSmooth');
var feedbackQueue = new feedbackQueueFactory({});
var carouselFactory = require('./carousel');
var spinnerFactory = require('./spinner');
var url = require('./utility/url');
var spinner1 = new spinnerFactory();
var scrollSmooth = new scrollSmoothFactory();

$('.rainbow-pre').on('click', function() {
  $(this).select();
});

// feedback queue
$('.js-feedback-queue-1').on('click', function() {
  feedbackQueue.createMessage({message: 'test 1'});
});
$('.js-feedback-queue-2').on('click', function() {
  feedbackQueue.createMessage({type: 'success', message: 'test 2'});
});
$('.js-feedback-queue-3').on('click', function() {
  feedbackQueue.createMessage({type: 'fail', message: 'test 3'});
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./carousel":1,"./feedbackQueue":3,"./scrollSmooth":4,"./spinner":5,"./test/utility/testUrl":6,"./utility/url":8}],3:[function(require,module,exports){
(function (global){
var $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);
var mustache = (typeof window !== "undefined" ? window['Mustache'] : typeof global !== "undefined" ? global['Mustache'] : null);
var getMotionEventName = require('./utility/getMotionEventName');

/**
 * accepts a message and displays appropriatly, stacks
 * them on top of one another, then fades away after a period of time
 * @param {object} options
 */
var FeedbackQueue = function(options) {
  var defaults = {
    singleLife: 5000, // how long will it last?
    templateContainer: '<div class="feedback-queue js-feedback-queue"><div class="feedback-queue-position js-feedback-queue-position"></div></div>', // mustache
    templateSingle: '<div class="feedback-queue-single js-feedback-queue-single is-{{type}}"><span class="feedback-queue-single-cross">&times;</span>{{message}}</div>', // mustache
    message: '', // anything goes string
    type: '' // success, fail, neutral or anything?
  };
  this.options = $.extend(defaults, options);

  // render container if not already
  if (!$('.js-feedback-queue').length) {
    $('body').prepend(mustache.render(this.options.templateContainer));
  };

  // fast message
  this.createMessage(this.options);
};

/**
 * builds html required for standard message
 * only message needed
 * @param  {object} config type, message
 * @return {object}        jquery
 */
FeedbackQueue.prototype.createMessage = function(config) {

  // validate
  if (typeof config === 'undefined') {
    return console.warn('FeedbackQueue.createMessage', 'config must be passed');
  };
  if (!config.hasOwnProperty('message')) {
    return console.warn('FeedbackQueue.createMessage', 'config must have \'message\' property');
  };

  // default type
  if (!config.hasOwnProperty('type')) {
    config.type = 'neutral';
  };
  if (!config.message) {
    return;
  };

  // resources
  var newElement;
  var data = this;

  // render
  newElement = $(mustache.render(data.options.templateSingle, config));
  $('.js-feedback-queue-position').prepend(newElement);

  // timeout for removal
  setTimeout(function() {
    newElement.addClass('is-removed');
    data.removeAfterAnimation(data, newElement);
  }, data.options.singleLife);

  // click message to remove
  newElement.on('click.feedback-stream', function() {
    newElement.addClass('is-removed');
    data.removeAfterAnimation(data, newElement);
  });
};

/**
 * remove the queue item when its time up!
 */
FeedbackQueue.prototype.removeAfterAnimation = function(data, trigger) {
  trigger.on(getMotionEventName('animation'), function() {
    trigger.remove();
  });
};

module.exports = FeedbackQueue;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./utility/getMotionEventName":7}],4:[function(require,module,exports){
(function (global){
var $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);

/**
 * scrolls the page smoothly when a target is clicked
 * @param {object} options
 */
var ScrollSmooth = function(options) {
  this.init(options);
};

ScrollSmooth.prototype.init = function(options) {
  var defaults = {
    target: '.js-smooth-scroll',

    // offsets the scroll down if there is a
    // fixed header for example
    topOffset: 50,
    scrollSpeed: 500,
    activeClass: 'has-smooth-scroll',
    direct: ''
  };
  this.options = $.extend(defaults, options);
  this.cache = {
    target: $(this.options.target)
  };
  var firstEvent = {};
  firstEvent.data = this;

  // clicking a targeted item
  firstEvent.data.cache.target.off('click.smoothScroll').on('click.smoothScroll', firstEvent.data, function(event) {
    event.preventDefault();
    firstEvent.data.scrollTo(firstEvent, this.hash);
  });

  // immediatly scroll to
  if (firstEvent.data.options.direct) {
    firstEvent.data.scrollTo(firstEvent, firstEvent.data.options.direct);
  };
};

/**
 * takes a clicked button and smooth scrolls to its hash
 * target is the jquery selector string
 * @param  {object} event
 * @param  {string} target
 */
ScrollSmooth.prototype.scrollTo = function(event, target) {
  var timer = 0;
  var destination = 0;
  if ($(target).offset().top > $(document).height() - $(window).height()) {
    destination = $(document).height() - $(window).height();
  } else {
    destination = $(target).offset().top;
    destination = destination - event.data.options.topOffset;
  }
  $('html, body').animate({scrollTop: destination}, event.data.options.scrollSpeed, 'swing');

  // add class to target, remove it after timeout
  $('.' + event.data.options.activeClass).removeClass(event.data.options.activeClass);
  clearTimeout(timer);
  target = $(target);
  target.addClass(event.data.options.activeClass);
  timer = setTimeout(function() {
    target.removeClass(event.data.options.activeClass);
  }, 1000);
};

module.exports = ScrollSmooth;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],5:[function(require,module,exports){
(function (global){
var $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);
var mustache = (typeof window !== "undefined" ? window['Mustache'] : typeof global !== "undefined" ? global['Mustache'] : null);

/**
 * must be possible for multiple instances
 * each can be controlled independently
 */
var Spin = function(container) {
  $(container).html(mustache.render('<div class="{{class}}"></div>', {'class': 'ajax-loading-indicator'}));
};

module.exports = Spin;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],6:[function(require,module,exports){
// url = require('url');
// console.log(url.getBase('append/'), url.generate());
// console.assert(url.getBase('append/') == 'http://192.168.1.121/codex/append/', 'testGetBase');
// console.assert(url.generate() == 'http://192.168.1.121/codex/', 'testGenerate');

},{}],7:[function(require,module,exports){

var getEventName = function(type) {
  var t;
  var el = document.createElement('fakeelement');
  var map = {};
  if (type == 'transition') {
    map = {
        'transition': 'transitionend',
        'OTransition': 'oTransitionEnd',
        'MozTransition': 'transitionend',
        'WebkitTransition': 'webkitTransitionEnd'
      };
  } else if (type == 'animation') {
    map = {
        'animation': 'animationend',
        'OAnimation': 'oAnimationEnd',
        'MozAnimation': 'animationend',
        'WebkitAnimation': 'webkitAnimationEnd'
      };
  };

  for (t in map) {
    if (el.style[t] !== undefined) {
      return map[t];
    }
  }
};

module.exports = getEventName;

},{}],8:[function(require,module,exports){
(function (global){
var $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);

/**
 * handles all url operations
 * phpUrl must be defined to proceed
 */
var Url = function() {
  if (typeof phpUrl === 'undefined') {
    return console.warn('variable phpUrl must be defined');
  };
  this.protocol = phpUrl.protocol;
  this.base = phpUrl.base;
  this.path = phpUrl.path;
  this.routes = phpUrl.routes;
};

/**
 * get the base url plus any appended path
 * @param  {string} append path/query
 * @return {string}
 */
Url.prototype.getBase = function(append) {
  var append = typeof append === 'undefined' ? '' : append;
  return this.protocol + this.base + append;
};

/**
 * generate a url using the routes stored
 * @param  {string} key
 * @param  {object} config
 * @return {string}
 */
Url.prototype.generate = function(key, config) {
  var key = typeof key === 'undefined' ? '' : key;
  var config = typeof config === 'undefined' ? {} : config;

  // no key means home
  if (!key) {
    return this.getBase();
  };

  // generate route and replace any config
  var route = this.routes[key];
  if (config) {
    for (var property in config) {
      if (config.hasOwnProperty(property)) {
        route = route.replace(':' + property, config[property]);
      };
    };
  };

  // pass base plus route
  return this.getBase(route).replace('//', '/');
};

/**
 * redirect to generated url
 * @param  {string} key
 * @param  {object} config
 * @return {string}
 */
Url.prototype.redirect = function(key, config) {
  var key = typeof key === 'undefined' ? '' : key;
  var config = typeof config === 'undefined' ? {} : config;
  var destination = this.generate(key, config);
  window.location.href = destination;
  return 'redirecting to \'' + destination + '\'';
};

/**
 * jump to exact specified url
 * @param  {string} path combine base and relative
 * @return {null}
 */
Url.prototype.redirectAbsolute = function(path) {
  window.location.href = path;
};

module.exports = new Url;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9jYXJvdXNlbC5qcyIsImpzL2NvbW1vbi5idW5kbGUuanMiLCJqcy9mZWVkYmFja1F1ZXVlLmpzIiwianMvc2Nyb2xsU21vb3RoLmpzIiwianMvc3Bpbm5lci5qcyIsImpzL3Rlc3QvdXRpbGl0eS90ZXN0VXJsLmpzIiwianMvdXRpbGl0eS9nZXRNb3Rpb25FdmVudE5hbWUuanMiLCJqcy91dGlsaXR5L3VybC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDbkZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNwRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgJCA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WyckJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWyckJ10gOiBudWxsKTtcclxudmFyIG11c3RhY2hlID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ011c3RhY2hlJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWydNdXN0YWNoZSddIDogbnVsbCk7XHJcbnZhciBnZXRNb3Rpb25FdmVudE5hbWUgPSByZXF1aXJlKCcuL3V0aWxpdHkvZ2V0TW90aW9uRXZlbnROYW1lJyk7XHJcblxyXG52YXIgQ2Fyb3VzZWwgPSBmdW5jdGlvbigpIHt9O1xyXG5cclxuQ2Fyb3VzZWwucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcclxuICB2YXIgZGVmYXVsdHMgPSB7XHJcbiAgICBjdXJyZW50OiAxLCAvLyB3aWxsIGl0IGF1dG8gc2Nyb2xsIGZvcndhcmRzP1xyXG4gICAgY29udGFpbmVyOiAkKHRoaXMpLCAvLyBqcXVlcnkgc2VsZWN0aW9uIG9mIGNvbnRhaW5lclxyXG4gICAgaXRlbXM6ICQodGhpcyksIC8vIGpxdWVyeSBzZWxlY3Rpb24gb2YgaXRlbXNcclxuICAgIGF1dG86IHRydWUsIC8vIHdpbGwgaXQgYXV0byBzY3JvbGwgZm9yd2FyZHM/XHJcbiAgICBhdXRvSW50ZXJ2YWw6IDUwMDAsIC8vIHdpbGwgaXQgYXV0byBzY3JvbGwgZm9yd2FyZHM/XHJcbiAgICBsb29wOiB0cnVlLCAvLyB3aWxsIGl0IGdvIGJhY2sgdG8gMSB3aGVuIHBhc3NpbmcgdGhlIGVuZD9cclxuICAgIHRlbXBsYXRlQ29udGFpbmVyOiAnJywgLy8gbXVzdGFjaGVcclxuICAgIHRlbXBsYXRlU2luZ2xlOiAnJyAvLyBtdXN0YWNoZVxyXG4gIH07XHJcbiAgdGhpcy5vcHRpb25zID0gJC5leHRlbmQoZGVmYXVsdHMsIG9wdGlvbnMpO1xyXG4gIHRoaXMuYXV0b1RpbWVvdXRJZDtcclxuXHJcbiAgLy8gYXV0b1xyXG4gIGlmICh0aGlzLm9wdGlvbnMuYXV0bykge1xyXG4gICAgdGhpcy5hdXRvVGltZW91dElkID0gc2V0SW50ZXJ2YWwodGhpcy5uZXh0LCB0aGlzLmF1dG9JbnRlcnZhbCk7XHJcbiAgfTtcclxufTtcclxuXHJcbkNhcm91c2VsLnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24oc29tZXRoaW5nKSB7XHJcbiAgY29uc29sZS5sb2coc29tZXRoaW5nLCB0aGlzKTtcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQ2Fyb3VzZWw7XHJcbiIsInZhciAkID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJyQnXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJyQnXSA6IG51bGwpO1xucmVxdWlyZSgnLi90ZXN0L3V0aWxpdHkvdGVzdFVybCcpO1xudmFyIGZlZWRiYWNrUXVldWVGYWN0b3J5ID0gcmVxdWlyZSgnLi9mZWVkYmFja1F1ZXVlJyk7XG52YXIgc2Nyb2xsU21vb3RoRmFjdG9yeSA9IHJlcXVpcmUoJy4vc2Nyb2xsU21vb3RoJyk7XG52YXIgZmVlZGJhY2tRdWV1ZSA9IG5ldyBmZWVkYmFja1F1ZXVlRmFjdG9yeSh7fSk7XG52YXIgY2Fyb3VzZWxGYWN0b3J5ID0gcmVxdWlyZSgnLi9jYXJvdXNlbCcpO1xudmFyIHNwaW5uZXJGYWN0b3J5ID0gcmVxdWlyZSgnLi9zcGlubmVyJyk7XG52YXIgdXJsID0gcmVxdWlyZSgnLi91dGlsaXR5L3VybCcpO1xudmFyIHNwaW5uZXIxID0gbmV3IHNwaW5uZXJGYWN0b3J5KCk7XG52YXIgc2Nyb2xsU21vb3RoID0gbmV3IHNjcm9sbFNtb290aEZhY3RvcnkoKTtcblxuJCgnLnJhaW5ib3ctcHJlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICQodGhpcykuc2VsZWN0KCk7XG59KTtcblxuLy8gZmVlZGJhY2sgcXVldWVcbiQoJy5qcy1mZWVkYmFjay1xdWV1ZS0xJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gIGZlZWRiYWNrUXVldWUuY3JlYXRlTWVzc2FnZSh7bWVzc2FnZTogJ3Rlc3QgMSd9KTtcbn0pO1xuJCgnLmpzLWZlZWRiYWNrLXF1ZXVlLTInKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgZmVlZGJhY2tRdWV1ZS5jcmVhdGVNZXNzYWdlKHt0eXBlOiAnc3VjY2VzcycsIG1lc3NhZ2U6ICd0ZXN0IDInfSk7XG59KTtcbiQoJy5qcy1mZWVkYmFjay1xdWV1ZS0zJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gIGZlZWRiYWNrUXVldWUuY3JlYXRlTWVzc2FnZSh7dHlwZTogJ2ZhaWwnLCBtZXNzYWdlOiAndGVzdCAzJ30pO1xufSk7XG4iLCJ2YXIgJCA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WyckJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWyckJ10gOiBudWxsKTtcbnZhciBtdXN0YWNoZSA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WydNdXN0YWNoZSddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnTXVzdGFjaGUnXSA6IG51bGwpO1xudmFyIGdldE1vdGlvbkV2ZW50TmFtZSA9IHJlcXVpcmUoJy4vdXRpbGl0eS9nZXRNb3Rpb25FdmVudE5hbWUnKTtcblxuLyoqXG4gKiBhY2NlcHRzIGEgbWVzc2FnZSBhbmQgZGlzcGxheXMgYXBwcm9wcmlhdGx5LCBzdGFja3NcbiAqIHRoZW0gb24gdG9wIG9mIG9uZSBhbm90aGVyLCB0aGVuIGZhZGVzIGF3YXkgYWZ0ZXIgYSBwZXJpb2Qgb2YgdGltZVxuICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnNcbiAqL1xudmFyIEZlZWRiYWNrUXVldWUgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gIHZhciBkZWZhdWx0cyA9IHtcbiAgICBzaW5nbGVMaWZlOiA1MDAwLCAvLyBob3cgbG9uZyB3aWxsIGl0IGxhc3Q/XG4gICAgdGVtcGxhdGVDb250YWluZXI6ICc8ZGl2IGNsYXNzPVwiZmVlZGJhY2stcXVldWUganMtZmVlZGJhY2stcXVldWVcIj48ZGl2IGNsYXNzPVwiZmVlZGJhY2stcXVldWUtcG9zaXRpb24ganMtZmVlZGJhY2stcXVldWUtcG9zaXRpb25cIj48L2Rpdj48L2Rpdj4nLCAvLyBtdXN0YWNoZVxuICAgIHRlbXBsYXRlU2luZ2xlOiAnPGRpdiBjbGFzcz1cImZlZWRiYWNrLXF1ZXVlLXNpbmdsZSBqcy1mZWVkYmFjay1xdWV1ZS1zaW5nbGUgaXMte3t0eXBlfX1cIj48c3BhbiBjbGFzcz1cImZlZWRiYWNrLXF1ZXVlLXNpbmdsZS1jcm9zc1wiPiZ0aW1lczs8L3NwYW4+e3ttZXNzYWdlfX08L2Rpdj4nLCAvLyBtdXN0YWNoZVxuICAgIG1lc3NhZ2U6ICcnLCAvLyBhbnl0aGluZyBnb2VzIHN0cmluZ1xuICAgIHR5cGU6ICcnIC8vIHN1Y2Nlc3MsIGZhaWwsIG5ldXRyYWwgb3IgYW55dGhpbmc/XG4gIH07XG4gIHRoaXMub3B0aW9ucyA9ICQuZXh0ZW5kKGRlZmF1bHRzLCBvcHRpb25zKTtcblxuICAvLyByZW5kZXIgY29udGFpbmVyIGlmIG5vdCBhbHJlYWR5XG4gIGlmICghJCgnLmpzLWZlZWRiYWNrLXF1ZXVlJykubGVuZ3RoKSB7XG4gICAgJCgnYm9keScpLnByZXBlbmQobXVzdGFjaGUucmVuZGVyKHRoaXMub3B0aW9ucy50ZW1wbGF0ZUNvbnRhaW5lcikpO1xuICB9O1xuXG4gIC8vIGZhc3QgbWVzc2FnZVxuICB0aGlzLmNyZWF0ZU1lc3NhZ2UodGhpcy5vcHRpb25zKTtcbn07XG5cbi8qKlxuICogYnVpbGRzIGh0bWwgcmVxdWlyZWQgZm9yIHN0YW5kYXJkIG1lc3NhZ2VcbiAqIG9ubHkgbWVzc2FnZSBuZWVkZWRcbiAqIEBwYXJhbSAge29iamVjdH0gY29uZmlnIHR5cGUsIG1lc3NhZ2VcbiAqIEByZXR1cm4ge29iamVjdH0gICAgICAgIGpxdWVyeVxuICovXG5GZWVkYmFja1F1ZXVlLnByb3RvdHlwZS5jcmVhdGVNZXNzYWdlID0gZnVuY3Rpb24oY29uZmlnKSB7XG5cbiAgLy8gdmFsaWRhdGVcbiAgaWYgKHR5cGVvZiBjb25maWcgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIGNvbnNvbGUud2FybignRmVlZGJhY2tRdWV1ZS5jcmVhdGVNZXNzYWdlJywgJ2NvbmZpZyBtdXN0IGJlIHBhc3NlZCcpO1xuICB9O1xuICBpZiAoIWNvbmZpZy5oYXNPd25Qcm9wZXJ0eSgnbWVzc2FnZScpKSB7XG4gICAgcmV0dXJuIGNvbnNvbGUud2FybignRmVlZGJhY2tRdWV1ZS5jcmVhdGVNZXNzYWdlJywgJ2NvbmZpZyBtdXN0IGhhdmUgXFwnbWVzc2FnZVxcJyBwcm9wZXJ0eScpO1xuICB9O1xuXG4gIC8vIGRlZmF1bHQgdHlwZVxuICBpZiAoIWNvbmZpZy5oYXNPd25Qcm9wZXJ0eSgndHlwZScpKSB7XG4gICAgY29uZmlnLnR5cGUgPSAnbmV1dHJhbCc7XG4gIH07XG4gIGlmICghY29uZmlnLm1lc3NhZ2UpIHtcbiAgICByZXR1cm47XG4gIH07XG5cbiAgLy8gcmVzb3VyY2VzXG4gIHZhciBuZXdFbGVtZW50O1xuICB2YXIgZGF0YSA9IHRoaXM7XG5cbiAgLy8gcmVuZGVyXG4gIG5ld0VsZW1lbnQgPSAkKG11c3RhY2hlLnJlbmRlcihkYXRhLm9wdGlvbnMudGVtcGxhdGVTaW5nbGUsIGNvbmZpZykpO1xuICAkKCcuanMtZmVlZGJhY2stcXVldWUtcG9zaXRpb24nKS5wcmVwZW5kKG5ld0VsZW1lbnQpO1xuXG4gIC8vIHRpbWVvdXQgZm9yIHJlbW92YWxcbiAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICBuZXdFbGVtZW50LmFkZENsYXNzKCdpcy1yZW1vdmVkJyk7XG4gICAgZGF0YS5yZW1vdmVBZnRlckFuaW1hdGlvbihkYXRhLCBuZXdFbGVtZW50KTtcbiAgfSwgZGF0YS5vcHRpb25zLnNpbmdsZUxpZmUpO1xuXG4gIC8vIGNsaWNrIG1lc3NhZ2UgdG8gcmVtb3ZlXG4gIG5ld0VsZW1lbnQub24oJ2NsaWNrLmZlZWRiYWNrLXN0cmVhbScsIGZ1bmN0aW9uKCkge1xuICAgIG5ld0VsZW1lbnQuYWRkQ2xhc3MoJ2lzLXJlbW92ZWQnKTtcbiAgICBkYXRhLnJlbW92ZUFmdGVyQW5pbWF0aW9uKGRhdGEsIG5ld0VsZW1lbnQpO1xuICB9KTtcbn07XG5cbi8qKlxuICogcmVtb3ZlIHRoZSBxdWV1ZSBpdGVtIHdoZW4gaXRzIHRpbWUgdXAhXG4gKi9cbkZlZWRiYWNrUXVldWUucHJvdG90eXBlLnJlbW92ZUFmdGVyQW5pbWF0aW9uID0gZnVuY3Rpb24oZGF0YSwgdHJpZ2dlcikge1xuICB0cmlnZ2VyLm9uKGdldE1vdGlvbkV2ZW50TmFtZSgnYW5pbWF0aW9uJyksIGZ1bmN0aW9uKCkge1xuICAgIHRyaWdnZXIucmVtb3ZlKCk7XG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBGZWVkYmFja1F1ZXVlO1xuIiwidmFyICQgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snJCddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnJCddIDogbnVsbCk7XG5cbi8qKlxuICogc2Nyb2xscyB0aGUgcGFnZSBzbW9vdGhseSB3aGVuIGEgdGFyZ2V0IGlzIGNsaWNrZWRcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zXG4gKi9cbnZhciBTY3JvbGxTbW9vdGggPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gIHRoaXMuaW5pdChvcHRpb25zKTtcbn07XG5cblNjcm9sbFNtb290aC5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgdmFyIGRlZmF1bHRzID0ge1xuICAgIHRhcmdldDogJy5qcy1zbW9vdGgtc2Nyb2xsJyxcblxuICAgIC8vIG9mZnNldHMgdGhlIHNjcm9sbCBkb3duIGlmIHRoZXJlIGlzIGFcbiAgICAvLyBmaXhlZCBoZWFkZXIgZm9yIGV4YW1wbGVcbiAgICB0b3BPZmZzZXQ6IDUwLFxuICAgIHNjcm9sbFNwZWVkOiA1MDAsXG4gICAgYWN0aXZlQ2xhc3M6ICdoYXMtc21vb3RoLXNjcm9sbCcsXG4gICAgZGlyZWN0OiAnJ1xuICB9O1xuICB0aGlzLm9wdGlvbnMgPSAkLmV4dGVuZChkZWZhdWx0cywgb3B0aW9ucyk7XG4gIHRoaXMuY2FjaGUgPSB7XG4gICAgdGFyZ2V0OiAkKHRoaXMub3B0aW9ucy50YXJnZXQpXG4gIH07XG4gIHZhciBmaXJzdEV2ZW50ID0ge307XG4gIGZpcnN0RXZlbnQuZGF0YSA9IHRoaXM7XG5cbiAgLy8gY2xpY2tpbmcgYSB0YXJnZXRlZCBpdGVtXG4gIGZpcnN0RXZlbnQuZGF0YS5jYWNoZS50YXJnZXQub2ZmKCdjbGljay5zbW9vdGhTY3JvbGwnKS5vbignY2xpY2suc21vb3RoU2Nyb2xsJywgZmlyc3RFdmVudC5kYXRhLCBmdW5jdGlvbihldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZmlyc3RFdmVudC5kYXRhLnNjcm9sbFRvKGZpcnN0RXZlbnQsIHRoaXMuaGFzaCk7XG4gIH0pO1xuXG4gIC8vIGltbWVkaWF0bHkgc2Nyb2xsIHRvXG4gIGlmIChmaXJzdEV2ZW50LmRhdGEub3B0aW9ucy5kaXJlY3QpIHtcbiAgICBmaXJzdEV2ZW50LmRhdGEuc2Nyb2xsVG8oZmlyc3RFdmVudCwgZmlyc3RFdmVudC5kYXRhLm9wdGlvbnMuZGlyZWN0KTtcbiAgfTtcbn07XG5cbi8qKlxuICogdGFrZXMgYSBjbGlja2VkIGJ1dHRvbiBhbmQgc21vb3RoIHNjcm9sbHMgdG8gaXRzIGhhc2hcbiAqIHRhcmdldCBpcyB0aGUganF1ZXJ5IHNlbGVjdG9yIHN0cmluZ1xuICogQHBhcmFtICB7b2JqZWN0fSBldmVudFxuICogQHBhcmFtICB7c3RyaW5nfSB0YXJnZXRcbiAqL1xuU2Nyb2xsU21vb3RoLnByb3RvdHlwZS5zY3JvbGxUbyA9IGZ1bmN0aW9uKGV2ZW50LCB0YXJnZXQpIHtcbiAgdmFyIHRpbWVyID0gMDtcbiAgdmFyIGRlc3RpbmF0aW9uID0gMDtcbiAgaWYgKCQodGFyZ2V0KS5vZmZzZXQoKS50b3AgPiAkKGRvY3VtZW50KS5oZWlnaHQoKSAtICQod2luZG93KS5oZWlnaHQoKSkge1xuICAgIGRlc3RpbmF0aW9uID0gJChkb2N1bWVudCkuaGVpZ2h0KCkgLSAkKHdpbmRvdykuaGVpZ2h0KCk7XG4gIH0gZWxzZSB7XG4gICAgZGVzdGluYXRpb24gPSAkKHRhcmdldCkub2Zmc2V0KCkudG9wO1xuICAgIGRlc3RpbmF0aW9uID0gZGVzdGluYXRpb24gLSBldmVudC5kYXRhLm9wdGlvbnMudG9wT2Zmc2V0O1xuICB9XG4gICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtzY3JvbGxUb3A6IGRlc3RpbmF0aW9ufSwgZXZlbnQuZGF0YS5vcHRpb25zLnNjcm9sbFNwZWVkLCAnc3dpbmcnKTtcblxuICAvLyBhZGQgY2xhc3MgdG8gdGFyZ2V0LCByZW1vdmUgaXQgYWZ0ZXIgdGltZW91dFxuICAkKCcuJyArIGV2ZW50LmRhdGEub3B0aW9ucy5hY3RpdmVDbGFzcykucmVtb3ZlQ2xhc3MoZXZlbnQuZGF0YS5vcHRpb25zLmFjdGl2ZUNsYXNzKTtcbiAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgdGFyZ2V0ID0gJCh0YXJnZXQpO1xuICB0YXJnZXQuYWRkQ2xhc3MoZXZlbnQuZGF0YS5vcHRpb25zLmFjdGl2ZUNsYXNzKTtcbiAgdGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgIHRhcmdldC5yZW1vdmVDbGFzcyhldmVudC5kYXRhLm9wdGlvbnMuYWN0aXZlQ2xhc3MpO1xuICB9LCAxMDAwKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU2Nyb2xsU21vb3RoO1xuIiwidmFyICQgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snJCddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnJCddIDogbnVsbCk7XHJcbnZhciBtdXN0YWNoZSA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WydNdXN0YWNoZSddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnTXVzdGFjaGUnXSA6IG51bGwpO1xyXG5cclxuLyoqXHJcbiAqIG11c3QgYmUgcG9zc2libGUgZm9yIG11bHRpcGxlIGluc3RhbmNlc1xyXG4gKiBlYWNoIGNhbiBiZSBjb250cm9sbGVkIGluZGVwZW5kZW50bHlcclxuICovXHJcbnZhciBTcGluID0gZnVuY3Rpb24oY29udGFpbmVyKSB7XHJcbiAgJChjb250YWluZXIpLmh0bWwobXVzdGFjaGUucmVuZGVyKCc8ZGl2IGNsYXNzPVwie3tjbGFzc319XCI+PC9kaXY+JywgeydjbGFzcyc6ICdhamF4LWxvYWRpbmctaW5kaWNhdG9yJ30pKTtcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gU3BpbjtcclxuXHJcbiIsIi8vIHVybCA9IHJlcXVpcmUoJ3VybCcpO1xyXG4vLyBjb25zb2xlLmxvZyh1cmwuZ2V0QmFzZSgnYXBwZW5kLycpLCB1cmwuZ2VuZXJhdGUoKSk7XHJcbi8vIGNvbnNvbGUuYXNzZXJ0KHVybC5nZXRCYXNlKCdhcHBlbmQvJykgPT0gJ2h0dHA6Ly8xOTIuMTY4LjEuMTIxL2NvZGV4L2FwcGVuZC8nLCAndGVzdEdldEJhc2UnKTtcclxuLy8gY29uc29sZS5hc3NlcnQodXJsLmdlbmVyYXRlKCkgPT0gJ2h0dHA6Ly8xOTIuMTY4LjEuMTIxL2NvZGV4LycsICd0ZXN0R2VuZXJhdGUnKTtcclxuIiwiXHJcbnZhciBnZXRFdmVudE5hbWUgPSBmdW5jdGlvbih0eXBlKSB7XHJcbiAgdmFyIHQ7XHJcbiAgdmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZmFrZWVsZW1lbnQnKTtcclxuICB2YXIgbWFwID0ge307XHJcbiAgaWYgKHR5cGUgPT0gJ3RyYW5zaXRpb24nKSB7XHJcbiAgICBtYXAgPSB7XHJcbiAgICAgICAgJ3RyYW5zaXRpb24nOiAndHJhbnNpdGlvbmVuZCcsXHJcbiAgICAgICAgJ09UcmFuc2l0aW9uJzogJ29UcmFuc2l0aW9uRW5kJyxcclxuICAgICAgICAnTW96VHJhbnNpdGlvbic6ICd0cmFuc2l0aW9uZW5kJyxcclxuICAgICAgICAnV2Via2l0VHJhbnNpdGlvbic6ICd3ZWJraXRUcmFuc2l0aW9uRW5kJ1xyXG4gICAgICB9O1xyXG4gIH0gZWxzZSBpZiAodHlwZSA9PSAnYW5pbWF0aW9uJykge1xyXG4gICAgbWFwID0ge1xyXG4gICAgICAgICdhbmltYXRpb24nOiAnYW5pbWF0aW9uZW5kJyxcclxuICAgICAgICAnT0FuaW1hdGlvbic6ICdvQW5pbWF0aW9uRW5kJyxcclxuICAgICAgICAnTW96QW5pbWF0aW9uJzogJ2FuaW1hdGlvbmVuZCcsXHJcbiAgICAgICAgJ1dlYmtpdEFuaW1hdGlvbic6ICd3ZWJraXRBbmltYXRpb25FbmQnXHJcbiAgICAgIH07XHJcbiAgfTtcclxuXHJcbiAgZm9yICh0IGluIG1hcCkge1xyXG4gICAgaWYgKGVsLnN0eWxlW3RdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgcmV0dXJuIG1hcFt0XTtcclxuICAgIH1cclxuICB9XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGdldEV2ZW50TmFtZTtcclxuIiwidmFyICQgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snJCddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnJCddIDogbnVsbCk7XG5cbi8qKlxuICogaGFuZGxlcyBhbGwgdXJsIG9wZXJhdGlvbnNcbiAqIHBocFVybCBtdXN0IGJlIGRlZmluZWQgdG8gcHJvY2VlZFxuICovXG52YXIgVXJsID0gZnVuY3Rpb24oKSB7XG4gIGlmICh0eXBlb2YgcGhwVXJsID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybiBjb25zb2xlLndhcm4oJ3ZhcmlhYmxlIHBocFVybCBtdXN0IGJlIGRlZmluZWQnKTtcbiAgfTtcbiAgdGhpcy5wcm90b2NvbCA9IHBocFVybC5wcm90b2NvbDtcbiAgdGhpcy5iYXNlID0gcGhwVXJsLmJhc2U7XG4gIHRoaXMucGF0aCA9IHBocFVybC5wYXRoO1xuICB0aGlzLnJvdXRlcyA9IHBocFVybC5yb3V0ZXM7XG59O1xuXG4vKipcbiAqIGdldCB0aGUgYmFzZSB1cmwgcGx1cyBhbnkgYXBwZW5kZWQgcGF0aFxuICogQHBhcmFtICB7c3RyaW5nfSBhcHBlbmQgcGF0aC9xdWVyeVxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5VcmwucHJvdG90eXBlLmdldEJhc2UgPSBmdW5jdGlvbihhcHBlbmQpIHtcbiAgdmFyIGFwcGVuZCA9IHR5cGVvZiBhcHBlbmQgPT09ICd1bmRlZmluZWQnID8gJycgOiBhcHBlbmQ7XG4gIHJldHVybiB0aGlzLnByb3RvY29sICsgdGhpcy5iYXNlICsgYXBwZW5kO1xufTtcblxuLyoqXG4gKiBnZW5lcmF0ZSBhIHVybCB1c2luZyB0aGUgcm91dGVzIHN0b3JlZFxuICogQHBhcmFtICB7c3RyaW5nfSBrZXlcbiAqIEBwYXJhbSAge29iamVjdH0gY29uZmlnXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cblVybC5wcm90b3R5cGUuZ2VuZXJhdGUgPSBmdW5jdGlvbihrZXksIGNvbmZpZykge1xuICB2YXIga2V5ID0gdHlwZW9mIGtleSA9PT0gJ3VuZGVmaW5lZCcgPyAnJyA6IGtleTtcbiAgdmFyIGNvbmZpZyA9IHR5cGVvZiBjb25maWcgPT09ICd1bmRlZmluZWQnID8ge30gOiBjb25maWc7XG5cbiAgLy8gbm8ga2V5IG1lYW5zIGhvbWVcbiAgaWYgKCFrZXkpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRCYXNlKCk7XG4gIH07XG5cbiAgLy8gZ2VuZXJhdGUgcm91dGUgYW5kIHJlcGxhY2UgYW55IGNvbmZpZ1xuICB2YXIgcm91dGUgPSB0aGlzLnJvdXRlc1trZXldO1xuICBpZiAoY29uZmlnKSB7XG4gICAgZm9yICh2YXIgcHJvcGVydHkgaW4gY29uZmlnKSB7XG4gICAgICBpZiAoY29uZmlnLmhhc093blByb3BlcnR5KHByb3BlcnR5KSkge1xuICAgICAgICByb3V0ZSA9IHJvdXRlLnJlcGxhY2UoJzonICsgcHJvcGVydHksIGNvbmZpZ1twcm9wZXJ0eV0pO1xuICAgICAgfTtcbiAgICB9O1xuICB9O1xuXG4gIC8vIHBhc3MgYmFzZSBwbHVzIHJvdXRlXG4gIHJldHVybiB0aGlzLmdldEJhc2Uocm91dGUpLnJlcGxhY2UoJy8vJywgJy8nKTtcbn07XG5cbi8qKlxuICogcmVkaXJlY3QgdG8gZ2VuZXJhdGVkIHVybFxuICogQHBhcmFtICB7c3RyaW5nfSBrZXlcbiAqIEBwYXJhbSAge29iamVjdH0gY29uZmlnXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cblVybC5wcm90b3R5cGUucmVkaXJlY3QgPSBmdW5jdGlvbihrZXksIGNvbmZpZykge1xuICB2YXIga2V5ID0gdHlwZW9mIGtleSA9PT0gJ3VuZGVmaW5lZCcgPyAnJyA6IGtleTtcbiAgdmFyIGNvbmZpZyA9IHR5cGVvZiBjb25maWcgPT09ICd1bmRlZmluZWQnID8ge30gOiBjb25maWc7XG4gIHZhciBkZXN0aW5hdGlvbiA9IHRoaXMuZ2VuZXJhdGUoa2V5LCBjb25maWcpO1xuICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGRlc3RpbmF0aW9uO1xuICByZXR1cm4gJ3JlZGlyZWN0aW5nIHRvIFxcJycgKyBkZXN0aW5hdGlvbiArICdcXCcnO1xufTtcblxuLyoqXG4gKiBqdW1wIHRvIGV4YWN0IHNwZWNpZmllZCB1cmxcbiAqIEBwYXJhbSAge3N0cmluZ30gcGF0aCBjb21iaW5lIGJhc2UgYW5kIHJlbGF0aXZlXG4gKiBAcmV0dXJuIHtudWxsfVxuICovXG5VcmwucHJvdG90eXBlLnJlZGlyZWN0QWJzb2x1dGUgPSBmdW5jdGlvbihwYXRoKSB7XG4gIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gcGF0aDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFVybDtcbiJdfQ==

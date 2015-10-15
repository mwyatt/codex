var mustache = require('mustache');
var getMotionEventName = require('./utility/getMotionEventName');


var Carousel = function () {};


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

var bean = require('bean')
var extend = require('extend')
var eventSet
var scrollBarPosition

var ScrollThreshold = function(options) {
  var defaults = {
    threshold: 100,
    containerClass: 'html',
    reachedClass: 'is-past-threshold',
    delay: 200
  }
  options = extend(defaults, options)
  options.timer
  options.container = document.querySelector(options.containerClass)
  if (!eventSet) {
    setEvent(options)
  }
}

function setEvent(options) {
  bean.on(window, 'scroll', function(event) {
    clearTimeout(options.timer)
    options.timer = setTimeout(function(event) {
      scrollBarPosition = window.pageYOffset | document.body.scrollTop
      if (scrollBarPosition > options.threshold) {
        options.container.classList.add(options.reachedClass)
      } else {
        options.container.classList.remove(options.reachedClass)
      }
    }, options.delay)
  })
  eventSet = true
}

module.exports = ScrollThreshold

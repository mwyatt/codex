var bean = require('bean')
var extend = require('extend')
var keycode = require('keycode')
var globalEventsSet
var openToggles = []

var ToggleContainerClass = function (options) {
  var defaults = {
    openClass: '',
    togglerClass: '',
    containerClass: 'html',
    parentCloseStop: '',
  }
  options = extend(defaults, options)
  options.container = document.querySelector(options.containerClass)
  options.toggler = document.querySelector(options.togglerClass)
  if (!options.container || !options.toggler) {
    return console.warn('Unable to run ToggleContainerClass as container or toggler cannot be selected.')
  } else if (!options.openClass) {
    return console.warn('Must set an openClass.')
  }
  this.setEvents(options)
  if (!globalEventsSet) {
    setGlobalEvents()
  }
}

ToggleContainerClass.prototype.setEvents = function(options) {
  bean.on(options.toggler, 'click', function(event) {
    togglerClick(event, options)
  })
}

function setGlobalEvents(options) {
  bean.on(window, 'click', function(event) {
    var exceptions = []
    if (!openToggles) {
      return
    }
    for (var index = openToggles.length - 1; index >= 0; index--) {
      if (isDescendant(openToggles[index].parentCloseStop, event.target)) {
        exceptions.push(openToggles[index].togglerClass)
      }
    }
    closeAllExcept(exceptions)
  })
  bean.on(window, 'keyup', function(event) {
    if (event.which == keycode('escape') {
      closeAllExcept([])
    }
  })
  globalEventsSet = true
}

function togglerClick(event, options) {
  closeAllExcept([options.togglerClass])
  options.container.classList.toggle(options.openClass)
  if (options.container.classList.contains(options.openClass)) {
    openToggles.push(options)
  } else {
    closeByTogglerClass(options.togglerClass)
  }
  console.log(openToggles)
}

function closeByTogglerClass(togglerClass) {
  var togglesKeep = []
  for (var index = openToggles.length - 1; index >= 0; index--) {
    if (openToggles[index].togglerClass !== togglerClass) {
      togglesKeep.push(openToggles[index])
    }
  }
  openToggles = togglesKeep
}

function closeAllExcept(togglerClasses) {
  if (!openToggles) {
    return
  }
  var openToggle;
  for (var index = openToggles.length - 1; index >= 0; index--) {
    if (arrayHasValue(togglerClasses, openToggles[index].togglerClass)) {
      openToggle = openToggles[index]
    } else {
      openToggles[index].container.classList.remove(openToggles[index].openClass)
    }
  }
  if (openToggle) {
    openToggles = [openToggle]
  } else {
    openToggles = []
  }
}

function arrayHasValue(array, value) {
  for (var i = array.length - 1; i >= 0; i--) {
    if (array[i] == value) {
      return true
    }
  }
}

function isDescendant(parent, child) {
  var node = child.parentNode;
  while (node != null) {
   if (node == parent) {
     return true;
   }
   node = node.parentNode;
 }
 return false;
}

module.exports = ToggleContainerClass

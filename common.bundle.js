var toggleFactory = require('./toggleContainerClass')
var scrollFactory = require('./scrollThreshold')
// var dialogueFactory = require('mwyatt-dialogue')
// var dialogue = new dialogueFactory()
var bean = require('bean')
// var buttonDialogue = document.querySelector('.js-dialogue-example-1')

new toggleFactory({
  openClass: 'example-1-toggle-open',
  parentCloseStop: document.querySelector('.js-toggle-example-1-container'),
  togglerClass: '.js-toggle-example-1',
})

new toggleFactory({
  openClass: 'example-2-toggle-open',
  parentCloseStop: document.querySelector('.js-toggle-example-2-container'),
  togglerClass: '.js-toggle-example-2',
})

new scrollFactory()

// bean.on(buttonDialogue, 'click', function() {
//   dialogue.create({
//     title: 'Title',
//     description: 'Description',
//   })
// })

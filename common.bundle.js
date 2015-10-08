$ = require('jquery/dist/jquery');
require('test/utility/testUrl');
var dialogueFactory = require('dialogue');

$('.rainbow-pre').on('click', function() {
  $(this).select();
  console.log('value');
});

var dialogue1 = new dialogueFactory();
$('.js-dialogue-1').on('click', function() {
  dialogue1.create({
    mask: true,
    className: 'js-dialogue-1',
    positionTo: 'body',
    width: 200,
    title: 'Title',
    description: 'Description',
    actions: [
      {name: 'Cancel', action: function() {
        console.log('Cancel');
      }},
      {name: 'Ok', action: function() {
        console.log('Ok');
      }}
    ],
    onComplete: function() {
      console.log('dialogue.onComplete');
    },
    onClose: function() {
      console.log('dialogue.onClose');
    }
  });
});

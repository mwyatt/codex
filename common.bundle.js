$ = require('jquery/dist/jquery');
require('test/utility/testUrl');
var dialogue = require('dialogue');
var feedbackQueueFactory = require('feedbackQueue');
var dialogue1 = new dialogue();
var dialogue2 = new dialogue();
var dialogue3 = new dialogue();
var dialogue4 = new dialogue();


$('.rainbow-pre').on('click', function() {
  $(this).select();
  console.log('value');
});

// masked
$('.js-dialogue-1').on('click', function() {
  dialogue1.create({
    mask: true,
    className: 'dialogue-1',
    width: 200,
    title: 'Masked',
    description: 'Positioned to the window and fixed, this masks the current window.',
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

// positioned
$('.js-dialogue-2').on('click', function() {
  dialogue2.create({
    className: 'dialogue-2',
    positionTo: '.js-dialogue-2',
    width: 200,
    title: 'Positioned',
    description: 'This dialogue is positioned to the selector \'.js-dialogue-2\'.',
    actions: [
      {name: 'Ok', action: function() {
        dialogue2.close(dialogue2);
      }}
    ]
  });
});

// well-hard only closable via action or cross
$('.js-dialogue-3').on('click', function() {
  dialogue3.create({
    hardClose: true,
    className: 'dialogue-3',
    width: 250,
    title: 'Well Hard To Close',
    description: 'Harder than usual to close.',
    actions: [
      {name: 'Close', action: function() {
        dialogue3.close(dialogue3);
      }}
    ]
  });
});

// edge case testing
$('.js-dialogue-4').on('click', function() {
  dialogue4.create({
    hardClose: true,
    mask: true,
    width: 550,
    title: 'Create Shipment',
    html: '<p></p>'
  });
});

// feedback queue
$('.js-feedback-queue-1').on('click', function() {
  console.log('value');
  var feedbackQueue = new feedbackQueueFactory({message: 'message', type: 'positive'});
});

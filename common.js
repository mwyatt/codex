$ = require('jquery');
require('test/utility/testUrl');
var feedbackQueueFactory = require('feedbackQueue');
var carouselFactory = require('carousel');
var spinnerFactory = require('spinner');
var url = require('utility/url');
var spinner1 = new spinnerFactory();

$('.rainbow-pre').on('click', function() {
  $(this).select();
  console.log('value');
});

// feedback queue
var feedbackQueue = new feedbackQueueFactory({
  templateContainer: $('#mst-feedback').html(),
  templateSingle: $('#mst-feedback-single').html()
});
$('.js-feedback-queue-1').on('click', function() {
  feedbackQueue.createMessage({message: 'test 1'});
});
$('.js-feedback-queue-2').on('click', function() {
  feedbackQueue.createMessage({type: 'success', message: 'test 2'});
});
$('.js-feedback-queue-3').on('click', function() {
  feedbackQueue.createMessage({type: 'fail', message: 'test 3'});
});

window.carousel = new carouselFactory();

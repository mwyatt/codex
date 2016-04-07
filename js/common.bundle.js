var $ = require('jquery');
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

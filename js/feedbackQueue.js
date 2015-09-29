var mustache = require('vendor/mustache');
var helper = require('helper');


/**
 * accepts a message and displays appropriatly, stacks
 * them on top of one another, then fades away after a period of time
 * @param {object} options 
 */
var FeedbackQueue = function () {};


/**
 * builds html required for standard message
 * @param  {object} config type, message
 * @return {object}        jquery
 */
FeedbackQueue.prototype.createMessage = function(config) {

	// validate
	if (typeof config === 'undefined') {
		return console.warn('FeedbackQueue.createMessage', 'config must be passed');
	};
	if (! config.hasOwnProperty('message')) {
		return console.warn('FeedbackQueue.createMessage', 'config must have \'message\' property');
	};
	if (! config.message) {
		return;
	};

	// default type
	if (! config.hasOwnProperty('type')) {
		config.type = 'neutral';
	};

	// resources
	var newElement;
	var $this;
	var data = this;

	// get template
	helper.getMustacheTemplate({
		template: 'admin/feedback',
		success: function (template) {
			newElement = $(mustache.render(template, config));
			$('.js-feedback-stream-position').prepend(newElement);

			// timeout for removal
			setTimeout(function() {
				newElement.addClass('is-removed');
				data.removeAfterAnimation(data, newElement);
			}, 5000);

			// click message to remove
			newElement.on('click.feedback-stream', function() {
				newElement.addClass('is-removed');
				data.removeAfterAnimation(data, newElement);
			});
		}
	});
};


FeedbackQueue.prototype.removeAfterAnimation = function(data, trigger) {

	// remove after animation
	trigger.on('animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd', function(event) {
	    trigger.remove();
	});
};


module.exports = FeedbackQueue;

var getMotionEventName = require('utility/getMotionEventName');
var mustache = require('mustache');
var keyCode = require('keyCode');
var data;
var $dialogue;
var $mask;
var calculatedLeft;
var intPopWidth;
var intWindowWidth;
var css = {};


/**
 * requirements
 * draggable with custom actions
 * built each time mustache
 * can be simple message 'ok'
 * can be ok / cancel with callback
 */
var Dialogue = function () {};


/**
 * render, bind events, and position new dialogue
 * @param  {object} options 
 * @return {null}         
 */
Dialogue.prototype.create = function(options) {
	var defaults = {
		hardClose: false,
		mask: false, // foo-bar
		className: '', // foo-bar
		positionTo: '', // .selector
		width: 150,
		title: '',
		description: '',
		actions: [
		  {name: 'Cancel', action: function() {
		    console.log('Cancel');
		  }},
		  {name: 'Ok', action: function() {
		    console.log('Ok');
		  }}
		],
		onComplete: function() {},
		onClose: function() {}
	};
	this.options = $.extend(defaults, options);

	// store globally
	data = this;
	css.width = data.options.width;

	// render
	$('body').append(mustache.render($('#mst-dialogue').html(), data.options));

	// store dom objects
	$dialogue = $('.js-dialogue');
	if (data.options.mask) {
		$mask = $('.js-dialogue-mask');
	};

	// set width
	$dialogue.css(css);

	// position dialogue
	var $positionalElement = $(data.options.positionTo);
	var frame = {
		position: $(document.body).scrollTop(),
		height: $(window).height(),
		width: $(window).width()
	};

	// position to element or centrally window
	if ($positionalElement.length) {
		var target = {
			position: 'absolute',
			top: $positionalElement.offset().top,
			left: $positionalElement.offset().left
		};

		// left out of viewport to the right adjust
		if ((target.left + $dialogue.width()) > frame.width) {
			target.left = frame.width - 50;
			target.left = target.left - $dialogue.width();
		};

		// position
		css = target;

	// no positional element so center to window
	} else {
		css.position = 'fixed';
		css.top = (frame.height / 2) - ($dialogue.height() / 2);
		css.left = (frame.width / 2) - ($dialogue.width() / 2);
	};

	// position it
	$dialogue.css(css);

	// set events
	// closing x
	$('.js-dialogue-close').on('click.dialogue', function() {
		data.close(data);
	});

	// easy close events
	if (!data.options.hardClose) {

		// clicking dialogue
		$dialogue.on('click.dialogue', function(event) {
			event.stopPropagation();
		});

		// hit esc
		$(document).off('keyup.dialogue').on('keyup.dialogue', function(event) {
			if (event.which == keyCode.esc) {
				data.close(data);
			} 
		});

		// click outside of dialogue
		$(document).off('mouseup.dialogue').on('mouseup.dialogue', function(event) {
			if (!$(event.target).closest('.js-dialogue').length) {
				data.close(data);
			}
		});
	};

	// actions in options
	for (var index = data.options.actions.length - 1; index >= 0; index--) {
		setDialogueActionEvent(data.options.actions[index]);
	};

	// completed build
	data.options.onComplete.call();
};


function setDialogueActionEvent (action) {
	$dialogue
		.find('.js-dialogue-action-' + action.name).on('click.dialogue', function() {
			console.log(action);
			action.action.call();
		});
}


/**
 * call onclose and remove
 * @param  {object} data 
 * @return {null}      
 */
Dialogue.prototype.close = function(data) {
	var removeClassName = 'dialogue-remove';
	$dialogue.addClass(removeClassName);
	$dialogue.on(getMotionEventName('animation'), function() {
		$(this).remove();
		data.options.onClose.call();
	});
	if (data.options.mask) {
		$mask.addClass(removeClassName);
		$mask.on(getMotionEventName('animation'), function() {
			$(this).remove();
		});
	};
};


module.exports = Dialogue;

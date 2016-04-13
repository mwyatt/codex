var $ = require('jquery');
var $document = $(document);
var anchorScroll = require("anchor-scroll");
var spinnerFactory = require('./spinner');
var spinner1 = new spinnerFactory();

$document.on('ready', function() {

  anchorScroll.init({
    updateUrl: true,
    offset: -30,
    ease: 'out-quad',
    duration: 500
  });
});

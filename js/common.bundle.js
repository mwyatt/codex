$ = require('jquery/dist/jquery');
require('test/utility/testUrl');

$('.rainbow-pre').on('click', function() {
  $(this).select();
  console.log('value');
});
